import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { time, mine } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {
  VampireStakeV2Helper__factory,
  VampireStake__factory,
  TestToken,
  TestToken__factory,
} from "../typechain-types";

context("Staking Contract", async () => {
  let deployer: SignerWithAddress;
  let hunter1: SignerWithAddress;
  let hunter2: SignerWithAddress;
  let VampireStake: VampireStake__factory;
  let VampireStakeV2Helper: VampireStakeV2Helper__factory;
  let TestToken: TestToken__factory;
  let vampStake: Contract;
  let STAKE: TestToken;
  let BLOOD: TestToken;
  let vampHelper: Contract;
  const AC_REVERT = /AccessControl: account .* is missing role .*/;
  const TRANSFER_AMOUNT = ethers.utils.parseEther("100");
  const BLOOD_AMOUNT = ethers.utils.parseEther("50");
  const HUNT_DURATION = 1000;
  const STAKE_AMOUNT = ethers.utils.parseEther("2");

  beforeEach(async () => {
    [deployer, hunter1, hunter2] = await ethers.getSigners();
    TestToken = await ethers.getContractFactory("TestToken");
    STAKE = await TestToken.deploy("STAKE", "STK");
    BLOOD = await TestToken.deploy("BLOOD", "BLD");

    VampireStake = await ethers.getContractFactory("VampireStake");
    vampStake = await upgrades.deployProxy(VampireStake, [
      STAKE.address,
      BLOOD.address,
    ]);

    VampireStakeV2Helper = await ethers.getContractFactory(
      "VampireStakeV2Helper"
    );
    vampHelper = await upgrades.deployProxy(VampireStakeV2Helper, [
      STAKE.address,
      BLOOD.address,
    ]);

    // transfer 100 STK tokens to hunter1
    await STAKE.approve(deployer.address, TRANSFER_AMOUNT);
    await STAKE.transferFrom(
      deployer.address,
      hunter1.address,
      TRANSFER_AMOUNT
    );

    // sanity check
    expect(await STAKE.balanceOf(hunter1.address)).eq(TRANSFER_AMOUNT);

    // approval for hunter1 => VampireStake
    await STAKE.connect(hunter1).approve(vampStake.address, TRANSFER_AMOUNT);
  });

  describe("Upgradeability", async () => {
    it("works before and after upgrading", async () => {
      const bloodV2: TestToken = await TestToken.deploy("BLOODV2", "BLDv2");

      const StakingContractV2: VampireStakeV2Helper__factory =
        await ethers.getContractFactory("VampireStakeV2Helper");

      const instance = await upgrades.deployProxy(VampireStake, [
        STAKE.address,
        BLOOD.address,
      ]);

      let stakeTkn = await instance.stakeToken();
      let bloodTkn = await instance.bloodToken();
      expect(stakeTkn).eq(STAKE.address);
      expect(bloodTkn).eq(BLOOD.address);

      const upgraded = await upgrades.upgradeProxy(
        instance.address,
        StakingContractV2,
        {
          call: {
            fn: "updateBloodToken",
            args: [bloodV2.address],
          },
        }
      );

      stakeTkn = await upgraded.stakeToken();
      bloodTkn = await upgraded.bloodToken();
      expect(stakeTkn).eq(STAKE.address);
      expect(bloodTkn).eq(bloodV2.address);
      expect(await upgraded.unluckyNumber()).eq(13);
    });
  });

  describe("Assigning roles", async () => {
    it("should assign the contract deployer `ADMIN_ROLE`", async () => {
      const ADMIN_ROLE = await vampStake.ADMIN_ROLE();
      expect(await vampStake.hasRole(ADMIN_ROLE, deployer.address)).to.be.true;
    });

    it("should be able to grant and revoke `ADMIN_ROLE` to hunter2", async () => {
      const ADMIN_ROLE = await vampStake.ADMIN_ROLE();
      expect(await vampStake.hasRole(ADMIN_ROLE, hunter2.address)).to.be.false;
      // Grant role
      await vampStake.grantRole(await vampStake.ADMIN_ROLE(), hunter2.address);
      expect(await vampStake.hasRole(ADMIN_ROLE, hunter2.address)).to.be.true;
      // Revoke role
      await vampStake.revokeRole(await vampStake.ADMIN_ROLE(), hunter2.address);
      expect(await vampStake.hasRole(ADMIN_ROLE, hunter2.address)).to.be.false;
    });
  });

  describe("Pausability", async () => {
    it("should not allow an entity without `ADMIN_ROLE` to pause", async () => {
      await expect(vampStake.connect(hunter1).pause()).to.be.revertedWith(
        AC_REVERT
      );
    });

    it("should pause the contract and not allow any staking", async () => {
      const stakeAmount = ethers.utils.parseEther("1");
      await vampStake.pause();
      await expect(
        vampStake.connect(hunter1).embedStake(stakeAmount)
      ).to.be.revertedWith("Pausable: paused");
    });

    it("should unpause the contract and allow staking", async () => {
      await vampStake.pause();
      await expect(
        vampStake.connect(hunter1).embedStake(STAKE_AMOUNT)
      ).to.be.revertedWith("Pausable: paused");
      await vampStake.unpause();
      await expect(await vampStake.connect(hunter1).embedStake(STAKE_AMOUNT))
        .to.emit(vampStake, "StakeEmbedded")
        .withArgs(
          "VampireStake:: STAKE embedded",
          hunter1.address,
          STAKE_AMOUNT
        );
      expect(await STAKE.balanceOf(hunter1.address)).eq(
        ethers.utils.parseEther("98")
      );
      expect(await vampStake.hunterStakesEmbedded(hunter1.address)).eq(
        STAKE_AMOUNT
      );
    });
  });

  describe("setHuntDuration", async () => {
    it("should only allow `ADMIN_ROLE` to set hunt duration", async () => {
      await expect(
        vampStake.connect(hunter1).setHuntDuration(1000)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert if current time < finishedAt", async () => {
      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const timestamp = block.timestamp;
      await vampHelper.setHuntOver(timestamp + (await time.duration.days(7)));
      await expect(vampHelper.setHuntDuration(1000)).to.be.revertedWith(
        "VampireStake:: Current hunt is not over"
      );
    });

    it("should set reward duration", async () => {
      await vampStake.setHuntDuration(1000);
      expect(await vampStake.huntDuration()).eq(1000);
    });
  });

  describe("notifyBloodAmount", async () => {
    it("should only allow `ADMIN_ROLE` to notify reward amount", async () => {
      await expect(
        vampStake.connect(hunter1).notifyBloodAmount(BLOOD_AMOUNT)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should trigger error if BLOOD rewards are greater than balance", async () => {
      await BLOOD.transfer(vampHelper.address, BLOOD_AMOUNT);
      await vampHelper.setHuntDuration(1000);
      await vampHelper.transferFromContract(
        BLOOD.address,
        deployer.address,
        BLOOD_AMOUNT
      );

      await expect(
        vampHelper.notifyBloodAmount(BLOOD_AMOUNT)
      ).to.be.revertedWith(
        "VampireStake:: BLOOD amount should be less than BLOOD balance"
      );
    });

    it("should be successful", async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      expect(await BLOOD.balanceOf(vampStake.address)).eq(BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await vampStake.notifyBloodAmount(BLOOD_AMOUNT);
      expect(await vampStake.huntOver()).eq(
        (await time.latest()) + HUNT_DURATION
      );
      expect(await vampStake.checkOverShoulder()).eq(await time.latest());
      // 50000000000000000n = BLOOD_AMOUNT / HUNT_DURATION
      expect(await vampStake.bleedRate()).eq(50000000000000000n);
    });

    it("should emit event on successful reward deposit", async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await expect(vampStake.notifyBloodAmount(BLOOD_AMOUNT))
        .to.emit(vampStake, "BloodAdded")
        .withArgs("VampireStake:: BLOOD added", BLOOD_AMOUNT);
    });
  });

  describe("embedStake", async () => {
    beforeEach(async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await vampStake.notifyBloodAmount(BLOOD_AMOUNT);
    });

    it("should revert with AmountCannotBeZero if stake amount is zero", async () => {
      await expect(vampStake.connect(hunter1).embedStake(0)).to.be.revertedWith(
        "VampireStake:: STAKE amount must be greater than zero"
      );
    });

    it("should update hunter1 balance and state vars on successful stake", async () => {
      // record balances before stake
      const hunter1PreBal = await STAKE.balanceOf(hunter1.address);
      const vampStakePreBal = await STAKE.balanceOf(vampStake.address);
      // stake
      await vampStake.connect(hunter1).embedStake(STAKE_AMOUNT);
      // record balances after stake
      const hunter1PostBal = await STAKE.balanceOf(hunter1.address);
      const vampStakePostBal = await STAKE.balanceOf(vampStake.address);
      expect(parseInt(hunter1PostBal.toString())).eq(
        parseInt(hunter1PreBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(parseInt(vampStakePostBal.toString())).eq(
        parseInt(vampStakePreBal.toString()) + parseInt(STAKE_AMOUNT.toString())
      );
      expect(await vampStake.totalStakesEmbedded()).eq(STAKE_AMOUNT);
      expect(await vampStake.hunterStakesEmbedded(hunter1.address)).eq(
        STAKE_AMOUNT
      );
      const checkOverShoulder = await vampStake.checkOverShoulder();
      expect(parseInt(checkOverShoulder.toString())).eq(await time.latest());
      expect(await vampStake.hunterBloodPerStake(hunter1.address)).eq(
        await vampStake.bloodPerStakeEmbedded()
      );
      expect(await vampStake.hunterBloodCollected(hunter1.address)).eq(
        await vampStake.bloodCollected(hunter1.address)
      );
    });

    it("should emit event on successful stake", async () => {
      await expect(vampStake.connect(hunter1).embedStake(STAKE_AMOUNT))
        .to.emit(vampStake, "StakeEmbedded")
        .withArgs(
          "VampireStake:: STAKE embedded",
          hunter1.address,
          STAKE_AMOUNT
        );
    });
  });

  describe("withdrawStake", async () => {
    beforeEach(async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await vampStake.notifyBloodAmount(BLOOD_AMOUNT);
      await vampStake.connect(hunter1).embedStake(STAKE_AMOUNT);
    });

    it("should revert with AmountCannotBeZero if withdraw amount is zero", async () => {
      await expect(
        vampStake.connect(hunter1).withdrawStake(0)
      ).to.be.revertedWith(
        "VampireStake:: Withdraw amount must be greater than zero"
      );
    });

    it("should update hunter1 balance and state vars on successful withdrawal", async () => {
      // record balances before stake withdrawal
      const hunter1PreBal = await STAKE.balanceOf(hunter1.address);
      const vampStakePreBal = await STAKE.balanceOf(vampStake.address);
      // withdraw stake
      await vampStake.connect(hunter1).withdrawStake(STAKE_AMOUNT);
      // record balances after stake withdrawal
      const hunter1PostBal = await STAKE.balanceOf(hunter1.address);
      const vampStakePostBal = await STAKE.balanceOf(vampStake.address);
      expect(parseInt(hunter1PreBal.toString())).eq(
        parseInt(hunter1PostBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(parseInt(vampStakePostBal.toString())).eq(
        parseInt(vampStakePreBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(await vampStake.totalStakesEmbedded()).eq(0);
      expect(await vampStake.hunterStakesEmbedded(hunter1.address)).eq(0);
      expect(await vampStake.bloodPerStake()).gt(0);
      const checkOverShoulder = await vampStake.checkOverShoulder();
      expect(parseInt(checkOverShoulder.toString())).eq(await time.latest());
      expect(await vampStake.hunterBloodPerStake(hunter1.address)).eq(
        await vampStake.bloodPerStake()
      );
      expect(await vampStake.hunterBloodCollected(hunter1.address)).eq(
        await vampStake.bloodCollected(hunter1.address)
      );
    });

    it("should emit event on successful withdrawal of stake", async () => {
      await expect(vampStake.connect(hunter1).withdrawStake(STAKE_AMOUNT))
        .to.emit(vampStake, "StakeWithdrawn")
        .withArgs(
          "VampireStake:: Stake withdrawn",
          hunter1.address,
          STAKE_AMOUNT
        );
    });
  });

  describe("collectBlood", async () => {
    beforeEach(async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await vampStake.notifyBloodAmount(BLOOD_AMOUNT);
      await vampStake.connect(hunter1).embedStake(STAKE_AMOUNT);
    });

    it("should revert with NoRewardsToClaim if user rewards earned is zero", async () => {
      await expect(
        vampStake.connect(hunter2).collectBlood()
      ).to.be.revertedWith(
        "VampireStake:: BLOOD amount must be greater than zero"
      );
    });

    it("should allow a user to withdraw their accrued rewards", async () => {
      // increase time to accrue rewards
      await time.increase(60);
      // record balances before withdrawal
      const hunter1PreBal = await BLOOD.balanceOf(hunter1.address);
      const vampStakePreBal = await BLOOD.balanceOf(vampStake.address);
      // withdraw rewards
      await vampStake.connect(hunter1).collectBlood();
      // record balances after withdrawal
      const hunter1PostBal = await BLOOD.balanceOf(hunter1.address);
      const vampStakePostBal = await BLOOD.balanceOf(vampStake.address);
      expect(hunter1PostBal).gt(hunter1PreBal);
      expect(vampStakePostBal).lt(vampStakePreBal);
      expect(await vampStake.hunterBloodCollected(hunter1.address)).eq(0);
    });

    it("should emit RewardsWithdrawn event on successful withdrawal of rewards", async () => {
      // increase time to accrue rewards
      await time.increase(60);
      // calculate rewards for user + 1 sec BLOOD accrued for time movement
      const secRwds = await vampStake.bleedRate();
      const rwds = secRwds * 61;
      await expect(vampStake.connect(hunter1).collectBlood())
        .to.emit(vampStake, "BloodCollected")
        .withArgs(
          "VampireStake:: Rewards withdrawn",
          hunter1.address,
          rwds.toString()
        );
    });
  });

  describe("runAway", async () => {
    beforeEach(async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await vampStake.notifyBloodAmount(BLOOD_AMOUNT);
      await vampStake.connect(hunter1).embedStake(STAKE_AMOUNT);
    });

    it("should withdraw stake and rewards", async () => {
      // increase time to accrue rewards
      await time.increase(60);
      // record balances before withdrawal
      const hunter1StkPreBal = await STAKE.balanceOf(hunter1.address);
      const hunter1RwdPreBal = await BLOOD.balanceOf(hunter1.address);
      const vampStakeStkPreBal = await STAKE.balanceOf(vampStake.address);
      const vampStakeRwdPreBal = await BLOOD.balanceOf(vampStake.address);
      // exit
      await vampStake.connect(hunter1).runAway();
      // record balances after withdrawal
      const hunter1StkPostBal = await STAKE.balanceOf(hunter1.address);
      const hunter1RwdPostBal = await BLOOD.balanceOf(hunter1.address);
      const vampStakeStkPostBal = await STAKE.balanceOf(vampStake.address);
      const vampStakeRwdPostBal = await BLOOD.balanceOf(vampStake.address);
      expect(hunter1StkPostBal).gt(hunter1StkPreBal);
      expect(hunter1RwdPostBal).gt(hunter1RwdPreBal);
      expect(vampStakeStkPostBal).lt(vampStakeStkPreBal);
      expect(vampStakeRwdPostBal).lt(vampStakeRwdPreBal);
      expect(await vampStake.hunterBloodCollected(hunter1.address)).eq(0);
    });
  });

  describe("bloodPerStakeEmbedded", async () => {
    it("should return zero when totalStaked is zero", async () => {
      expect(await vampStake.bloodPerStakeEmbedded()).eq(0);
    });

    it("should return number gt zero if totalStaked is gt zero", async () => {
      await BLOOD.transfer(vampStake.address, BLOOD_AMOUNT);
      await vampStake.setHuntDuration(HUNT_DURATION);
      await vampStake.notifyBloodAmount(BLOOD_AMOUNT);
      await vampStake.connect(hunter1).embedStake(STAKE_AMOUNT);
      // mine block for stake tx to be processed
      await mine(1);
      expect(await vampStake.bloodPerStakeEmbedded()).gt(0);
    });
  });

  describe("updateStakeToken", async () => {
    it("should revert if caller is not `ADMIN_ROLE`", async () => {
      await expect(
        vampStake
          .connect(hunter1)
          .updateStakeToken(ethers.constants.AddressZero)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert with error if new address is address(0)", async () => {
      await expect(
        vampStake.updateStakeToken(ethers.constants.AddressZero)
      ).to.be.revertedWith("VampireStake:: STAKE token cannot be address(0)");
    });

    it("should update STAKE token address", async () => {
      const newStkTkn = ethers.utils.getAddress(
        ethers.utils.hexlify(ethers.utils.randomBytes(20))
      );
      const preStkTkn = await vampStake.stakeToken();
      await vampStake.updateStakeToken(newStkTkn);
      const postStkTkn = await vampStake.stakeToken();
      expect(preStkTkn).not.eq(postStkTkn);
      expect(postStkTkn).eq(newStkTkn);
    });
  });

  describe("updateBloodToken", async () => {
    it("should revert if caller is not `ADMIN_ROLE`", async () => {
      await expect(
        vampStake
          .connect(hunter1)
          .updateBloodToken(ethers.constants.AddressZero)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert with error RewardTokenCannotBeZeroAddress if address(0)", async () => {
      await expect(
        vampStake.updateBloodToken(ethers.constants.AddressZero)
      ).to.be.revertedWith("VampireStake:: BLOOD token cannot be address(0)");
    });

    it("should update BLOOD token address", async () => {
      const newRwdTkn = ethers.utils.getAddress(
        ethers.utils.hexlify(ethers.utils.randomBytes(20))
      );
      const preRwdTkn = await vampStake.bloodToken();
      await vampStake.updateBloodToken(newRwdTkn);
      const postRwdTkn = await vampStake.bloodToken();
      expect(preRwdTkn).not.eq(postRwdTkn);
      expect(postRwdTkn).eq(newRwdTkn);
    });
  });
});
