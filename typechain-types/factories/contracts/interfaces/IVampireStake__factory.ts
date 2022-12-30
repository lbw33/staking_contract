/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IVampireStake,
  IVampireStakeInterface,
} from "../../../contracts/interfaces/IVampireStake";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_hunter",
        type: "address",
      },
    ],
    name: "bloodCollected",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "bloodPerStakeEmbedded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "checkOverShoulder",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collectBlood",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
    ],
    name: "embedStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hunterStakesEmbedded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_bloodAmount",
        type: "uint256",
      },
    ],
    name: "notifyBloodAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "runAway",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_huntDuration",
        type: "uint256",
      },
    ],
    name: "setHuntDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStakesEmbedded",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_bloodToken",
        type: "address",
      },
    ],
    name: "updateBloodToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakeToken",
        type: "address",
      },
    ],
    name: "updateStakeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
    ],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IVampireStake__factory {
  static readonly abi = _abi;
  static createInterface(): IVampireStakeInterface {
    return new utils.Interface(_abi) as IVampireStakeInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IVampireStake {
    return new Contract(address, _abi, signerOrProvider) as IVampireStake;
  }
}
