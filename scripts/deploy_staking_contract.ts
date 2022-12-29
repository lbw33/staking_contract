const { ethers, upgrades } = require("hardhat");
import hre from "hardhat";
import fs from "fs";
import { Contract } from "ethers";
import { artifacts, network } from "hardhat";
const { getImplementationAddress } = require("@openzeppelin/upgrades-core");
const colors = require("colors/safe");
let stakeToken: Contract;
let rewardToken: Contract;

async function main(): Promise<string> {
  const [deployer] = await ethers.getSigners();
  if (deployer === undefined) throw new Error("Undefined deployer");
  console.log(colors.cyan(`Deploying from ` + colors.yellow(deployer.address)));
  console.log();

  /***** For Testing ONLY *****/
  const stkName = "STAKEToken";
  const stkSym = "STK";
  const rwdName = "REWARDToken";
  const rwdSym = "RWD";

  const StakeTkn = await ethers.getContractFactory("TestToken");
  stakeToken = await StakeTkn.deploy(stkName, stkSym);
  await stakeToken.deployed();
  console.log(colors.green(`StakeToken Address: ${stakeToken.address}`));

  const RewardTkn = await ethers.getContractFactory("TestToken");
  rewardToken = await RewardTkn.deploy(rwdName, rwdSym);
  await rewardToken.deployed();
  console.log(colors.green(`StakeToken Address: ${rewardToken.address}`));
  /***************************/

  /***** For Production *****/
  // const stakeToken = "0x";
  // const rewardToken = "0x";
  /**************************/

  const contractName = "StakingContract";
  const contract = await ethers.getContractFactory(contractName);
  const stakingContract = await upgrades.deployProxy(contract, [
    stakeToken.address, // change to stakeToken once deployed
    rewardToken.address, // change to rewardToken once deployed
  ]);
  await stakingContract.deployed();
  const implAddress = await getImplementationAddress(
    ethers.provider,
    stakingContract.address
  );
  await updateABI(contractName);
  await verify(implAddress, [stakeToken.address, rewardToken.address]);
  console.log("");
  console.log(
    `${contractName} deployed with params:` +
      "\n" +
      `stakeToken ${stakeToken.address}` +
      "\n" +
      `rewardToken ${rewardToken.address}`
  );

  await stakingContract.deployed();

  console.log(
    colors.green(`StakingContract Proxy Address: ${stakingContract.address}`)
  );
  console.log(`Implementation Address: ${implAddress}`);

  return stakingContract.address;
}

export const updateABI = async (contractName: string) => {
  const abiDir = `${__dirname}/../abi`;
  if (!fs.existsSync(abiDir)) {
    fs.mkdirSync(abiDir);
  }
  const Artifact = artifacts.readArtifactSync(contractName);
  fs.writeFileSync(
    `${abiDir}/${contractName}.json`,
    JSON.stringify(Artifact.abi, null, 2)
  );
};

export const verify = async (contractAddress: string, args: string[] = []) => {
  // @ts-ignore
  if (network == "localhost" || network == "hardhat") return;
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (ex) {}
};

main()
  .then(async (r: string) => {
    console.log("");
    console.log(colors.green("Deployment Successful!!!"));
    console.log(colors.cyan("Deployed contract address: ") + colors.yellow(r));
    console.log("");
    const command = "npx hardhat verify " + r;
    console.log(
      colors.cyan("Run: ") +
        colors.yellow(
          `${command} --constructor-args ${stakeToken.address} ${rewardToken.address}`
        ) +
        colors.cyan(" to verify the contract")
    );
    console.log("");
    return r;
  })
  .catch((error) => {
    console.error(error);
    return undefined;
  });
