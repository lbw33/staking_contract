import { expect } from "chai";
import { BigNumber, Contract } from "ethers";
import { ethers, upgrades } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import {
  StakingContractV2Test__factory,
  StakingContract__factory,
  TestToken,
  TestToken__factory,
} from "../typechain-types";

describe("Staking Contract", async () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let StakingContract: StakingContract__factory;
  let TestToken: TestToken__factory;
  let stakingContract: Contract;
  let stakeToken: TestToken;
  let rewardToken: TestToken;
  const transferAmount = ethers.utils.parseEther("100");

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

    // Transfer 100 STK tokens to user1
    await stakeToken.approve(deployer.address, transferAmount);
    await stakeToken.transferFrom(
      deployer.address,
      user1.address,
      transferAmount
    );

    // Sanity check
    expect(await stakeToken.balanceOf(user1.address)).to.equal(transferAmount);

    // Approval for user1 => StakingContract
    await stakeToken
      .connect(user1)
      .approve(stakingContract.address, transferAmount);
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
        /AccessControl: account .* is missing role .*/
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
    // should set
    // should trigger custom error
  });
});
