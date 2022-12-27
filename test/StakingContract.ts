import { expect } from "chai";
import { BigNumber } from "ethers";
import { ethers, upgrades } from "hardhat";
import { StakingContractV2Test, TestToken } from "../typechain-types";
const { expectEvent, expectRevert } = require("@openzeppelin/test-helpers");

context("Staking Contract", async () => {
  const [deployer, user1, user2] = await ethers.getSigners();
  const StakingContract = await ethers.getContractFactory("StakingContract");
  const TestToken = await ethers.getContractFactory("TestToken");

  describe("Upgradeability", async () => {
    it("works before and after upgrading", async () => {
      const testToken1 = await TestToken.deploy("Token1", "TT1");
      const testToken2 = await TestToken.deploy("Token2", "TT2");
      const testToken3 = await TestToken.deploy("Token3", "TT3");

      const StakingContractV2 = await ethers.getContractFactory(
        "StakingContractV2Test"
      );

      const instance = await upgrades.deployProxy(StakingContract, [
        testToken1.address,
        testToken2.address,
      ]);

      const stakingToken = await instance.stakingToken();
      const rewardToken = await instance.rewardToken();
      expect(stakingToken).to.equal(testToken1.address);
      expect(rewardToken).to.equal(testToken2.address);

      const upgraded = await upgrades.upgradeProxy(
        instance.address,
        StakingContractV2,
        {
          call: {
            fn: "changeRewardToken",
            args: [testToken3.address],
          },
        }
      );

      const stakingTokenV2 = await upgraded.stakingToken();
      const rewardTokenV2 = await upgraded.rewardToken();
      expect(stakingTokenV2).to.equal(testToken1.address);
      expect(rewardTokenV2).to.equal(testToken3.address);
      expect(await upgraded.testFN()).to.equal(13);
    });
  });

  beforeEach(async () => {
    const testTokenA = await TestToken.deploy("TokenA", "TTA");
    const testTokenB = await TestToken.deploy("TokenB", "TTB");

    const stakingContract = await upgrades.deployProxy(StakingContract, [
      testTokenA.address,
      testTokenB.address,
    ]);
  });
});
