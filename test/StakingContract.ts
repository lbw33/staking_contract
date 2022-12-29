import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { time, mine } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {
  StakingContractV2Test__factory,
  StakingContract__factory,
  TestToken,
  TestToken__factory,
} from "../typechain-types";

context("Staking Contract", async () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let StakingContract: StakingContract__factory;
  let StakingContractV2Test: StakingContractV2Test__factory;
  let TestToken: TestToken__factory;
  let stakingContract: Contract;
  let stakeToken: TestToken;
  let rewardToken: TestToken;
  let stakingContractTester: Contract;
  const AC_REVERT = /AccessControl: account .* is missing role .*/;
  const TRANSFER_AMOUNT = ethers.utils.parseEther("100");
  const REWARD_AMOUNT = ethers.utils.parseEther("50");
  const REWARD_DURATION = 1000;
  const STAKE_AMOUNT = ethers.utils.parseEther("2");

  beforeEach(async () => {
    [deployer, user1, user2] = await ethers.getSigners();
    TestToken = await ethers.getContractFactory("TestToken");
    stakeToken = await TestToken.deploy("StakeToken", "STK");
    rewardToken = await TestToken.deploy("RewardToken", "RWD");

    StakingContract = await ethers.getContractFactory("StakingContract");
    stakingContract = await upgrades.deployProxy(StakingContract, [
      stakeToken.address,
      rewardToken.address,
    ]);

    StakingContractV2Test = await ethers.getContractFactory(
      "StakingContractV2Test"
    );
    stakingContractTester = await upgrades.deployProxy(StakingContractV2Test, [
      stakeToken.address,
      rewardToken.address,
    ]);

    // transfer 100 STK tokens to user1
    await stakeToken.approve(deployer.address, TRANSFER_AMOUNT);
    await stakeToken.transferFrom(
      deployer.address,
      user1.address,
      TRANSFER_AMOUNT
    );

    // sanity check
    expect(await stakeToken.balanceOf(user1.address)).eq(TRANSFER_AMOUNT);

    // approval for user1 => StakingContract
    await stakeToken
      .connect(user1)
      .approve(stakingContract.address, TRANSFER_AMOUNT);
  });

  describe("Upgradeability", async () => {
    it("works before and after upgrading", async () => {
      const rewardTokenV2: TestToken = await TestToken.deploy(
        "RewardTokenV2",
        "RWDv2"
      );

      const StakingContractV2: StakingContractV2Test__factory =
        await ethers.getContractFactory("StakingContractV2Test");

      const instance = await upgrades.deployProxy(StakingContract, [
        stakeToken.address,
        rewardToken.address,
      ]);

      let stakingToken = await instance.stakingToken();
      let rewardsToken = await instance.rewardToken();
      expect(stakingToken).eq(stakeToken.address);
      expect(rewardsToken).eq(rewardToken.address);

      const upgraded = await upgrades.upgradeProxy(
        instance.address,
        StakingContractV2,
        {
          call: {
            fn: "changeRewardToken",
            args: [rewardTokenV2.address],
          },
        }
      );

      stakingToken = await upgraded.stakingToken();
      rewardsToken = await upgraded.rewardToken();
      expect(stakingToken).eq(stakeToken.address);
      expect(rewardsToken).eq(rewardTokenV2.address);
      expect(await upgraded.testFN()).eq(13);
    });
  });

  describe("Assigning roles", async () => {
    it("should assign the contract deployer `ADMIN_ROLE`", async () => {
      const ADMIN_ROLE = await stakingContract.ADMIN_ROLE();
      expect(await stakingContract.hasRole(ADMIN_ROLE, deployer.address)).to.be
        .true;
    });

    it("should be able to grant and revoke `ADMIN_ROLE` to user2", async () => {
      const ADMIN_ROLE = await stakingContract.ADMIN_ROLE();
      expect(await stakingContract.hasRole(ADMIN_ROLE, user2.address)).to.be
        .false;
      // Grant role
      await stakingContract.grantRole(
        await stakingContract.ADMIN_ROLE(),
        user2.address
      );
      expect(await stakingContract.hasRole(ADMIN_ROLE, user2.address)).to.be
        .true;
      // Revoke role
      await stakingContract.revokeRole(
        await stakingContract.ADMIN_ROLE(),
        user2.address
      );
      expect(await stakingContract.hasRole(ADMIN_ROLE, user2.address)).to.be
        .false;
    });
  });

  describe("Pausability", async () => {
    it("should not allow an entity without `ADMIN_ROLE` to pause", async () => {
      await expect(stakingContract.connect(user1).pause()).to.be.revertedWith(
        AC_REVERT
      );
    });

    it("should pause the contract and not allow any staking", async () => {
      const stakeAmount = ethers.utils.parseEther("1");
      await stakingContract.pause();
      await expect(
        stakingContract.connect(user1).stake(stakeAmount)
      ).to.be.revertedWith("Pausable: paused");
    });

    it("should unpause the contract and allow staking", async () => {
      const stakeAmount = ethers.utils.parseEther("1");
      await stakingContract.pause();
      await expect(
        stakingContract.connect(user1).stake(stakeAmount)
      ).to.be.revertedWith("Pausable: paused");
      await stakingContract.unpause();
      await expect(await stakingContract.connect(user1).stake(stakeAmount))
        .to.emit(stakingContract, "Staked")
        .withArgs(user1.address, stakeAmount);
      expect(await stakeToken.balanceOf(user1.address)).eq(
        ethers.utils.parseEther("99")
      );
      expect(await stakingContract.balanceOf(user1.address)).eq(stakeAmount);
    });
  });

  describe("setRewardsDuration", async () => {
    it("should only allow `ADMIN_ROLE` to set reward duration", async () => {
      await expect(
        stakingContract.connect(user1).setRewardsDuration(1000)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert if current time < finishedAt", async () => {
      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const timestamp = block.timestamp;
      await stakingContractTester.setFinishAt(
        timestamp + (await time.duration.days(7))
      );
      await expect(
        stakingContractTester.setRewardsDuration(1000)
      ).to.be.revertedWithCustomError(
        stakingContractTester,
        "RewardDurationNotFinished"
      );
    });

    it("should set reward duration", async () => {
      await stakingContract.setRewardsDuration(1000);
      expect(await stakingContract.duration()).eq(1000);
    });
  });

  describe("notifyRewardAmount", async () => {
    it("should only allow `ADMIN_ROLE` to notify reward amount", async () => {
      await expect(
        stakingContract.connect(user1).notifyRewardAmount(REWARD_AMOUNT)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should trigger RewardAmountGreaterThanBalance error", async () => {
      await rewardToken.transfer(stakingContractTester.address, REWARD_AMOUNT);
      await stakingContractTester.setRewardsDuration(1000);
      await stakingContractTester.transferFromContract(
        rewardToken.address,
        deployer.address,
        REWARD_AMOUNT
      );

      await expect(
        stakingContractTester.notifyRewardAmount(REWARD_AMOUNT)
      ).to.be.revertedWithCustomError(
        stakingContractTester,
        "RewardAmountGreaterThanBalance"
      );
    });

    it("should be successful", async () => {
      await rewardToken.transfer(stakingContract.address, REWARD_AMOUNT);
      expect(await rewardToken.balanceOf(stakingContract.address)).eq(
        REWARD_AMOUNT
      );
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
      expect(await stakingContract.finishAt()).eq(
        (await time.latest()) + REWARD_DURATION
      );
      expect(await stakingContract.updatedAt()).eq(await time.latest());
      // 50000000000000000n = REWARD_AMOUNT / REWARD_DURATION
      expect(await stakingContract.rewardRate()).eq(50000000000000000n);
    });
  });

  describe("stake", async () => {
    beforeEach(async () => {
      await rewardToken.transfer(stakingContract.address, REWARD_AMOUNT);
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
    });

    it("should revert with AmountCannotBeZero if stake amount is zero", async () => {
      await expect(
        stakingContract.connect(user1).stake(0)
      ).to.be.revertedWithCustomError(stakingContract, "AmountCannotBeZero");
    });

    it("should update user1 balance and state vars on successful stake", async () => {
      // record balances before stake
      const user1PreBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPreBal = await stakeToken.balanceOf(
        stakingContract.address
      );
      // stake
      await stakingContract.connect(user1).stake(STAKE_AMOUNT);
      // record balances after stake
      const user1PostBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPostBal = await stakeToken.balanceOf(
        stakingContract.address
      );
      expect(parseInt(user1PostBal.toString())).eq(
        parseInt(user1PreBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(parseInt(stakingContractPostBal.toString())).eq(
        parseInt(stakingContractPreBal.toString()) +
          parseInt(STAKE_AMOUNT.toString())
      );
      expect(await stakingContract.totalStaked()).eq(STAKE_AMOUNT);
      expect(await stakingContract.balanceOf(user1.address)).eq(STAKE_AMOUNT);
      const updatedAt = await stakingContract.updatedAt();
      expect(parseInt(updatedAt.toString())).eq(await time.latest());
      expect(await stakingContract.userRewardPerTokenStaked(user1.address)).eq(
        await stakingContract.rewardPerTokenStaked()
      );
      expect(await stakingContract.rewards(user1.address)).eq(
        await stakingContract.earned(user1.address)
      );
    });

    it("should emit event on successful stake", async () => {
      await expect(stakingContract.connect(user1).stake(STAKE_AMOUNT))
        .to.emit(stakingContract, "Staked")
        .withArgs(user1.address, STAKE_AMOUNT);
    });
  });

  describe("withdrawStake", async () => {
    beforeEach(async () => {
      await rewardToken.transfer(stakingContract.address, REWARD_AMOUNT);
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
      await stakingContract.connect(user1).stake(STAKE_AMOUNT);
    });

    it("should revert with AmountCannotBeZero if withdraw amount is zero", async () => {
      await expect(
        stakingContract.connect(user1).withdrawStake(0)
      ).to.be.revertedWithCustomError(stakingContract, "AmountCannotBeZero");
    });

    it("should update user1 balance and state vars on successful withdrawal", async () => {
      // record balances before stake withdrawal
      const user1PreBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPreBal = await stakeToken.balanceOf(
        stakingContract.address
      );
      // withdraw stake
      await stakingContract.connect(user1).withdrawStake(STAKE_AMOUNT);
      // record balances after stake withdrawal
      const user1PostBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPostBal = await stakeToken.balanceOf(
        stakingContract.address
      );
      expect(parseInt(user1PreBal.toString())).eq(
        parseInt(user1PostBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(parseInt(stakingContractPostBal.toString())).eq(
        parseInt(stakingContractPreBal.toString()) -
          parseInt(STAKE_AMOUNT.toString())
      );
      expect(await stakingContract.totalStaked()).eq(0);
      expect(await stakingContract.balanceOf(user1.address)).eq(0);
      // TODO: test for updateReward modifier
      expect(await stakingContract.rewardPerTokenStaked()).gt(0);
      const updatedAt = await stakingContract.updatedAt();
      expect(parseInt(updatedAt.toString())).eq(await time.latest());
      expect(await stakingContract.userRewardPerTokenStaked(user1.address)).eq(
        await stakingContract.rewardPerTokenStaked()
      );
      expect(await stakingContract.rewards(user1.address)).eq(
        await stakingContract.earned(user1.address)
      );
    });

    it("should emit event on successful withdrawal of stake", async () => {
      await expect(stakingContract.connect(user1).withdrawStake(STAKE_AMOUNT))
        .to.emit(stakingContract, "StakeWithdrawn")
        .withArgs(user1.address, STAKE_AMOUNT);
    });
  });

  describe("withdrawRewards", async () => {
    beforeEach(async () => {
      await rewardToken.transfer(stakingContract.address, REWARD_AMOUNT);
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
      await stakingContract.connect(user1).stake(STAKE_AMOUNT);
    });

    it("should revert with NoRewardsToClaim if user rewards earned is zero", async () => {
      await expect(
        stakingContract.connect(user2).withdrawRewards()
      ).to.be.revertedWithCustomError(stakingContract, "NoRewardsToClaim");
    });

    it("should allow a user to withdraw their accrued rewards", async () => {
      // increase time to accrue rewards
      await time.increase(60);
      // record balances before withdrawal
      const user1PreBal = await rewardToken.balanceOf(user1.address);
      const stakingContractPreBal = await rewardToken.balanceOf(
        stakingContract.address
      );
      // withdraw rewards
      await stakingContract.connect(user1).withdrawRewards();
      // record balances after withdrawal
      const user1PostBal = await rewardToken.balanceOf(user1.address);
      const stakingContractPostBal = await rewardToken.balanceOf(
        stakingContract.address
      );
      expect(user1PostBal).gt(user1PreBal);
      expect(stakingContractPostBal).lt(stakingContractPreBal);
      expect(await stakingContract.rewards(user1.address)).eq(0);
    });

    it("should emit RewardsWithdrawn event on successful withdrawal of rewards", async () => {
      // increase time to accrue rewards
      await time.increase(60);
      // calculate rewards for user + 1 sec reward accrued for time movement
      const secRwds = await stakingContract.rewardRate();
      const rwds = secRwds * 61;
      await expect(stakingContract.connect(user1).withdrawRewards())
        .to.emit(stakingContract, "RewardsWithdrawn")
        .withArgs(user1.address, rwds.toString());
    });
  });

  describe("rewardPerToken", async () => {
    it("should return zero when totalStaked is zero", async () => {
      expect(await stakingContract.rewardPerToken()).eq(0);
    });

    it("should return number gt zero if totalStaked is gt zero", async () => {
      await rewardToken.transfer(stakingContract.address, REWARD_AMOUNT);
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
      await stakingContract.connect(user1).stake(STAKE_AMOUNT);
      // mine block for stake tx to be processed
      await mine(1);
      expect(await stakingContract.rewardPerToken()).gt(0);
    });
  });

  describe("changeStakingToken", async () => {
    it("should revert if caller is not `ADMIN_ROLE`", async () => {
      await expect(
        stakingContract
          .connect(user1)
          .changeStakingToken(ethers.constants.AddressZero)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert with error StakingTokenCannotBeZeroAddress if address(0)", async () => {
      await expect(
        stakingContract.changeStakingToken(ethers.constants.AddressZero)
      ).to.be.revertedWithCustomError(
        stakingContract,
        "StakingTokenCannotBeZeroAddress"
      );
    });

    it("should update staking token address", async () => {
      const newStkTkn = ethers.utils.getAddress(
        ethers.utils.hexlify(ethers.utils.randomBytes(20))
      );
      const preStkTkn = await stakingContract.stakingToken();
      await stakingContract.changeStakingToken(newStkTkn);
      const postStkTkn = await stakingContract.stakingToken();
      expect(preStkTkn).not.eq(postStkTkn);
      expect(postStkTkn).eq(newStkTkn);
    });
  });

  describe("changeRewardToken", async () => {
    it("should revert if caller is not `ADMIN_ROLE`", async () => {
      await expect(
        stakingContract
          .connect(user1)
          .changeRewardToken(ethers.constants.AddressZero)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert with error RewardTokenCannotBeZeroAddress if address(0)", async () => {
      await expect(
        stakingContract.changeRewardToken(ethers.constants.AddressZero)
      ).to.be.revertedWithCustomError(
        stakingContract,
        "RewardTokenCannotBeZeroAddress"
      );
    });

    it("should update staking token address", async () => {
      const newRwdTkn = ethers.utils.getAddress(
        ethers.utils.hexlify(ethers.utils.randomBytes(20))
      );
      const preRwdTkn = await stakingContract.stakingToken();
      await stakingContract.changeStakingToken(newRwdTkn);
      const postRwdTkn = await stakingContract.stakingToken();
      expect(preRwdTkn).not.eq(postRwdTkn);
      expect(postRwdTkn).eq(newRwdTkn);
    });
  });
});
