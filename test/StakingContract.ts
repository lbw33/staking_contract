import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {
  StakingContractV2Test__factory,
  StakingContract__factory,
  TestToken,
  TestToken__factory,
} from "../typechain-types";
import { beforeEach } from "mocha";

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

    // Transfer 100 STK tokens to user1
    await stakeToken.approve(deployer.address, TRANSFER_AMOUNT);
    await stakeToken.transferFrom(
      deployer.address,
      user1.address,
      TRANSFER_AMOUNT
    );

    // Sanity check
    expect(await stakeToken.balanceOf(user1.address)).to.equal(TRANSFER_AMOUNT);

    // Approval for user1 => StakingContract
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
      expect(stakingToken).to.equal(stakeToken.address);
      expect(rewardsToken).to.equal(rewardToken.address);

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
      expect(stakingToken).to.equal(stakeToken.address);
      expect(rewardsToken).to.equal(rewardTokenV2.address);
      expect(await upgraded.testFN()).to.equal(13);
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
      expect(await stakeToken.balanceOf(user1.address)).to.equal(
        ethers.utils.parseEther("99")
      );
      expect(await stakingContract.balanceOf(user1.address)).to.equal(
        stakeAmount
      );
    });
  });

  describe("setRewardsDuration", async () => {
    it("should only allow `ADMIN_ROLE` to set reward duration", async () => {
      await expect(
        stakingContract.connect(user1).setRewardsDuration(1000)
      ).to.be.revertedWith(AC_REVERT);
    });

    it("should revert if current time < finishedAt", async () => {
      const sevenDays = 7 * 24 * 60 * 60;
      const blockNum = await ethers.provider.getBlockNumber();
      const block = await ethers.provider.getBlock(blockNum);
      const timestamp = block.timestamp;
      await stakingContractTester.setFinishAt(timestamp + sevenDays);
      await expect(
        stakingContractTester.setRewardsDuration(1000)
      ).to.be.revertedWithCustomError(
        stakingContractTester,
        "RewardDurationNotFinished"
      );
    });

    it("should set reward duration", async () => {
      await stakingContract.setRewardsDuration(1000);
      expect(await stakingContract.duration()).to.equal(1000);
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
      expect(await rewardToken.balanceOf(stakingContract.address)).to.equal(
        REWARD_AMOUNT
      );
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
      expect(await stakingContract.finishAt()).to.equal(
        (await time.latest()) + REWARD_DURATION
      );
      expect(await stakingContract.updatedAt()).to.equal(await time.latest());
      // 50000000000000000n = REWARD_AMOUNT / REWARD_DURATION
      expect(await stakingContract.rewardRate()).to.equal(50000000000000000n);
    });
  });

  describe("stake", async () => {
    it("should revert with AmountCannotBeZero if stake amount is zero", async () => {
      await expect(
        stakingContract.connect(user1).stake(0)
      ).to.be.revertedWithCustomError(stakingContract, "AmountCannotBeZero");
    });

    it("should update user1 balance and state vars on successful stake", async () => {
      const user1PreBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPreBal = await stakeToken.balanceOf(
        stakingContract.address
      );

      await stakingContract.connect(user1).stake(STAKE_AMOUNT);

      const user1PostBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPostBal = await stakeToken.balanceOf(
        stakingContract.address
      );

      expect(parseInt(user1PostBal.toString())).to.equal(
        parseInt(user1PreBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(parseInt(stakingContractPostBal.toString())).to.equal(
        parseInt(stakingContractPreBal.toString()) +
          parseInt(STAKE_AMOUNT.toString())
      );
      expect(await stakingContract.totalStaked()).to.equal(STAKE_AMOUNT);
      expect(await stakingContract.balanceOf(user1.address)).to.equal(
        STAKE_AMOUNT
      );
      // TODO: test for updateReward modifier
      expect(await stakingContract.rewardPerTokenStored()).gt(
        BigNumber.from(0)
      );
      const updatedAt = await stakingContract.updatedAt();
      expect(parseInt(updatedAt.toString())).to.equal(await time.latest());
      expect(
        await stakingContract.userRewardPerTokenPaid(user1.address)
      ).to.equal(await stakingContract.rewardPerTokenStored());
      expect(await stakingContract.rewards(user1.address)).to.equal(
        await stakingContract.earned(user1.address)
      );
    });

    it("should emit event on successful stake", async () => {
      await expect(stakingContract.connect(user1).stake(STAKE_AMOUNT))
        .to.emit(stakingContract, "Staked")
        .withArgs(user1.address, STAKE_AMOUNT);
    });
  });

  describe("withdraw", async () => {
    beforeEach(async () => {
      await rewardToken.transfer(stakingContract.address, REWARD_AMOUNT);
      await stakingContract.setRewardsDuration(REWARD_DURATION);
      await stakingContract.notifyRewardAmount(REWARD_AMOUNT);
      await stakingContract.connect(user1).stake(STAKE_AMOUNT);
    });

    it("should revert with AmountCannotBeZero if withdraw amount is zero", async () => {
      await expect(
        stakingContract.connect(user1).withdraw(0)
      ).to.be.revertedWithCustomError(stakingContract, "AmountCannotBeZero");
    });

    it("should update user1 balance and state vars on successful withdrawal", async () => {
      const user1PreBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPreBal = await stakeToken.balanceOf(
        stakingContract.address
      );

      await stakingContract.connect(user1).withdraw(STAKE_AMOUNT);

      const user1PostBal = await stakeToken.balanceOf(user1.address);
      const stakingContractPostBal = await stakeToken.balanceOf(
        stakingContract.address
      );

      expect(parseInt(user1PreBal.toString())).to.equal(
        parseInt(user1PostBal.toString()) - parseInt(STAKE_AMOUNT.toString())
      );
      expect(parseInt(stakingContractPostBal.toString())).to.equal(
        parseInt(stakingContractPreBal.toString()) -
          parseInt(STAKE_AMOUNT.toString())
      );
      expect(await stakingContract.totalStaked()).to.equal(0);
      expect(await stakingContract.balanceOf(user1.address)).to.equal(0);
      // TODO: test for updateReward modifier
      expect(await stakingContract.rewardPerTokenStored()).gt(0);
      const updatedAt = await stakingContract.updatedAt();
      expect(parseInt(updatedAt.toString())).to.equal(await time.latest());
      expect(
        await stakingContract.userRewardPerTokenPaid(user1.address)
      ).to.equal(await stakingContract.rewardPerTokenStored());
      expect(await stakingContract.rewards(user1.address)).to.equal(
        await stakingContract.earned(user1.address)
      );
    });

    it("should emit event on successful withdraw", async () => {
      await expect(stakingContract.connect(user1).withdraw(STAKE_AMOUNT))
        .to.emit(stakingContract, "Withdrawn")
        .withArgs(user1.address, STAKE_AMOUNT);
    });
  });
});
