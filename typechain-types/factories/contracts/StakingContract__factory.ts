/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  StakingContract,
  StakingContractInterface,
} from "../../contracts/StakingContract";

const _abi = [
  {
    inputs: [],
    name: "AmountCannotBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "NoRewardsToClaim",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardAmountGreaterThanBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardDurationNotFinished",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardRateCannotBeZero",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardTokenCannotBeZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "StakingTokenCannotBeZeroAddress",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "StakeWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Staked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "_rewardToken",
        type: "address",
      },
    ],
    name: "changeRewardToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingToken",
        type: "address",
      },
    ],
    name: "changeStakingToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "duration",
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
        name: "_account",
        type: "address",
      },
    ],
    name: "earned",
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
    name: "finishAt",
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
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakingToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "lastTimeRewardApplicable",
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
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "notifyRewardAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerToken",
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
    name: "rewardPerTokenStaked",
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
    name: "rewardRate",
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
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "rewards",
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
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "setRewardsDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingToken",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalStaked",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updatedAt",
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
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userRewardPerTokenStaked",
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
    name: "withdrawRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5060805161242061004c600039600081816109d901528181610a1901528181610e5301528181610e930152610f2201526124206000f3fe60806040526004361061020e5760003560e01c80635c975abb116101185780638456cb59116100a0578063c7b8981c1161006f578063c7b8981c146105eb578063cc1a378f14610600578063cd3daf9d14610620578063d547741f14610635578063f7c618c11461065557600080fd5b80638456cb591461058157806391d1485414610596578063a217fddf146105b6578063a694fc3a146105cb57600080fd5b80637519ab50116100e75780637519ab501461050557806375b238fc1461051c5780637b0a47ee1461053e57806380faa57d14610555578063817b1cd21461056a57600080fd5b80635c975abb1461046f57806367d3b4881461048757806370a082311461049e57806372f702f3146104cc57600080fd5b80632f2ff15d1161019b5780633c6b16ab1161016a5780633c6b16ab146103f25780633f4ba83a14610412578063485cc955146104275780634f1ef2861461044757806352d1902d1461045a57600080fd5b80632f2ff15d14610364578063309ad2481461038457806336568abe146103b25780633659cfe6146103d257600080fd5b80630fb5a6b4116101e25780630fb5a6b4146102c6578063248a9ca3146102dd5780632576dcad1461030d57806325d5971f14610324578063285d333b1461034457600080fd5b80628cc2621461021357806301ffc9a7146102465780630700037d14610276578063088ab8ce146102a4575b600080fd5b34801561021f57600080fd5b5061023361022e366004611f36565b610676565b6040519081526020015b60405180910390f35b34801561025257600080fd5b50610266610261366004611f51565b6106f6565b604051901515815260200161023d565b34801561028257600080fd5b50610233610291366004611f36565b6101696020526000908152604090205481565b3480156102b057600080fd5b506102c46102bf366004611f36565b61072b565b005b3480156102d257600080fd5b506102336101625481565b3480156102e957600080fd5b506102336102f8366004611f7b565b600090815260fb602052604090206001015490565b34801561031957600080fd5b506102336101665481565b34801561033057600080fd5b506102c461033f366004611f7b565b61078e565b34801561035057600080fd5b506102c461035f366004611f36565b6108bf565b34801561037057600080fd5b506102c461037f366004611f94565b610922565b34801561039057600080fd5b5061023361039f366004611f36565b6101686020526000908152604090205481565b3480156103be57600080fd5b506102c46103cd366004611f94565b61094c565b3480156103de57600080fd5b506102c46103ed366004611f36565b6109cf565b3480156103fe57600080fd5b506102c461040d366004611f7b565b610aab565b34801561041e57600080fd5b506102c4610c64565b34801561043357600080fd5b506102c4610442366004611fc0565b610c84565b6102c4610455366004612000565b610e49565b34801561046657600080fd5b50610233610f15565b34801561047b57600080fd5b5060975460ff16610266565b34801561049357600080fd5b506102336101635481565b3480156104aa57600080fd5b506102336104b9366004611f36565b6101676020526000908152604090205481565b3480156104d857600080fd5b5061015f546104ed906001600160a01b031681565b6040516001600160a01b03909116815260200161023d565b34801561051157600080fd5b506102336101645481565b34801561052857600080fd5b506102336000805160206123cb83398151915281565b34801561054a57600080fd5b506102336101655481565b34801561056157600080fd5b50610233610fc8565b34801561057657600080fd5b506102336101615481565b34801561058d57600080fd5b506102c4610fdc565b3480156105a257600080fd5b506102666105b1366004611f94565b610ffc565b3480156105c257600080fd5b50610233600081565b3480156105d757600080fd5b506102c46105e6366004611f7b565b611027565b3480156105f757600080fd5b506102c4611146565b34801561060c57600080fd5b506102c461061b366004611f7b565b61123d565b34801561062c57600080fd5b50610233611280565b34801561064157600080fd5b506102c4610650366004611f94565b6112e7565b34801561066157600080fd5b50610160546104ed906001600160a01b031681565b6001600160a01b03811660009081526101696020908152604080832054610168909252822054670de0b6b3a7640000906106ae611280565b6106b891906120d8565b6001600160a01b038516600090815261016760205260409020546106dc91906120ef565b6106e6919061210e565b6106f09190612130565b92915050565b60006001600160e01b03198216637965db0b60e01b14806106f057506301ffc9a760e01b6001600160e01b03198316146106f0565b6000805160206123cb8339815191526107438161130c565b6001600160a01b03821661076a5760405163560b6c5d60e11b815260040160405180910390fd5b5061016080546001600160a01b0319166001600160a01b0392909216919091179055565b610796611316565b61079e61135e565b336107a7611280565b610166556107b3610fc8565b610164556001600160a01b038116156107fe576107cf81610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b6000821161081f5760405163d11b25af60e01b815260040160405180910390fd5b33600090815261016760205260408120805484929061083f9084906120d8565b9250508190555081610161600082825461085991906120d8565b909155505061015f54610876906001600160a01b031633846113b9565b60408051338152602081018490527f8108595eb6bad3acefa9da467d90cc2217686d5c5ac85460f8b7849c840645fc91015b60405180910390a1506108bc600161012d55565b50565b6000805160206123cb8339815191526108d78161130c565b6001600160a01b0382166108fe576040516353ab834d60e11b815260040160405180910390fd5b5061015f80546001600160a01b0319166001600160a01b0392909216919091179055565b600082815260fb602052604090206001015461093d8161130c565b6109478383611424565b505050565b6001600160a01b03811633146109c15760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6109cb82826114aa565b5050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610a175760405162461bcd60e51b81526004016109b890612148565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610a60600080516020612384833981519152546001600160a01b031690565b6001600160a01b031614610a865760405162461bcd60e51b81526004016109b890612194565b610a8f81611511565b604080516000808252602082019092526108bc91839190611529565b6000805160206123cb833981519152610ac38161130c565b6000610acd611280565b61016655610ad9610fc8565b610164556001600160a01b03811615610b2457610af581610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b61016354421115610b465761016254610b3d908461210e565b61016555610b86565b60004261016354610b5791906120d8565b61016554610b6591906120ef565b61016254909150610b768583612130565b610b80919061210e565b61016555505b60006101655411610baa57604051637a69ed5160e11b815260040160405180910390fd5b610160546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa158015610bf3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c1791906121e0565b6101625461016554610c2991906120ef565b1115610c48576040516388b88e1160e01b815260040160405180910390fd5b61016254610c569042612130565b610163555050426101645550565b6000805160206123cb833981519152610c7c8161130c565b6108bc611694565b600054610100900460ff1615808015610ca45750600054600160ff909116105b80610cbe5750303b158015610cbe575060005460ff166001145b610d215760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084016109b8565b6000805460ff191660011790558015610d44576000805461ff0019166101001790555b6001600160a01b038316610d6b576040516353ab834d60e11b815260040160405180910390fd5b6001600160a01b038216610d925760405163560b6c5d60e11b815260040160405180910390fd5b610d9a6116e6565b610da261170d565b610daa61173c565b610db5600033611424565b610dcd6000805160206123cb83398151915233611424565b61015f80546001600160a01b038086166001600160a01b0319928316179092556101608054928516929091169190911790558015610947576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610e915760405162461bcd60e51b81526004016109b890612148565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610eda600080516020612384833981519152546001600160a01b031690565b6001600160a01b031614610f005760405162461bcd60e51b81526004016109b890612194565b610f0982611511565b6109cb82826001611529565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610fb55760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c000000000000000060648201526084016109b8565b5060008051602061238483398151915290565b6000610fd7426101635461176b565b905090565b6000805160206123cb833981519152610ff48161130c565b6108bc611784565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b61102f611316565b61103761135e565b33611040611280565b6101665561104c610fc8565b610164556001600160a01b038116156110975761106881610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b600082116110b85760405163d11b25af60e01b815260040160405180910390fd5b61015f546110d1906001600160a01b03163330856117c1565b3360009081526101676020526040812080548492906110f1908490612130565b9250508190555081610161600082825461110b9190612130565b909155505060408051338152602081018490527f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d91016108a8565b3361114f611280565b6101665561115b610fc8565b610164556001600160a01b038116156111a65761117781610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b3360009081526101696020526040902054806111d5576040516373380d9960e01b815260040160405180910390fd5b336000818152610169602052604081205561016054611200916001600160a01b0390911690836113b9565b60408051338152602081018390527f8a43c4352486ec339f487f64af78ca5cbf06cd47833f073d3baf3a193e503161910160405180910390a15050565b6000805160206123cb8339815191526112558161130c565b426101635411156112795760405163715f384360e11b815260040160405180910390fd5b5061016255565b60006101615460000361129557506101665490565b61016154610164546112a5610fc8565b6112af91906120d8565b610165546112bd91906120ef565b6112cf90670de0b6b3a76400006120ef565b6112d9919061210e565b61016654610fd79190612130565b600082815260fb60205260409020600101546113028161130c565b61094783836114aa565b6108bc81336117ff565b60975460ff161561135c5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016109b8565b565b600261012d54036113b15760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c0060448201526064016109b8565b600261012d55565b6040516001600160a01b03831660248201526044810182905261094790849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b031990931692909217909152611858565b600161012d55565b61142e8282610ffc565b6109cb57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff191660011790556114663390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6114b48282610ffc565b156109cb57600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000805160206123cb8339815191526109cb8161130c565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff161561155c576109478361192a565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa9250505080156115b6575060408051601f3d908101601f191682019092526115b3918101906121e0565b60015b6116195760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b60648201526084016109b8565b60008051602061238483398151915281146116885760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b60648201526084016109b8565b506109478383836119c6565b61169c6119eb565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff1661135c5760405162461bcd60e51b81526004016109b8906121f9565b600054610100900460ff166117345760405162461bcd60e51b81526004016109b8906121f9565b61135c611a34565b600054610100900460ff166117635760405162461bcd60e51b81526004016109b8906121f9565b61135c611a5b565b60008183111561177b578161177d565b825b9392505050565b61178c611316565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586116c93390565b6040516001600160a01b03808516602483015283166044820152606481018290526117f99085906323b872dd60e01b906084016113e5565b50505050565b6118098282610ffc565b6109cb5761181681611a8e565b611821836020611aa0565b604051602001611832929190612270565b60408051601f198184030181529082905262461bcd60e51b82526109b8916004016122e5565b60006118ad826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611c3c9092919063ffffffff16565b80519091501561094757808060200190518101906118cb9190612318565b6109475760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016109b8565b6001600160a01b0381163b6119975760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b60648201526084016109b8565b60008051602061238483398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b6119cf83611c53565b6000825111806119dc5750805b15610947576117f98383611c93565b60975460ff1661135c5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016109b8565b600054610100900460ff1661141c5760405162461bcd60e51b81526004016109b8906121f9565b600054610100900460ff16611a825760405162461bcd60e51b81526004016109b8906121f9565b6097805460ff19169055565b60606106f06001600160a01b03831660145b60606000611aaf8360026120ef565b611aba906002612130565b67ffffffffffffffff811115611ad257611ad2611fea565b6040519080825280601f01601f191660200182016040528015611afc576020820181803683370190505b509050600360fc1b81600081518110611b1757611b1761233a565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611b4657611b4661233a565b60200101906001600160f81b031916908160001a9053506000611b6a8460026120ef565b611b75906001612130565b90505b6001811115611bed576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611ba957611ba961233a565b1a60f81b828281518110611bbf57611bbf61233a565b60200101906001600160f81b031916908160001a90535060049490941c93611be681612350565b9050611b78565b50831561177d5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016109b8565b6060611c4b8484600085611d87565b949350505050565b611c5c8161192a565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b611cfb5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b60648201526084016109b8565b600080846001600160a01b031684604051611d169190612367565b600060405180830381855af49150503d8060008114611d51576040519150601f19603f3d011682016040523d82523d6000602084013e611d56565b606091505b5091509150611d7e82826040518060600160405280602781526020016123a460279139611e62565b95945050505050565b606082471015611de85760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b60648201526084016109b8565b600080866001600160a01b03168587604051611e049190612367565b60006040518083038185875af1925050503d8060008114611e41576040519150601f19603f3d011682016040523d82523d6000602084013e611e46565b606091505b5091509150611e5787838387611e7b565b979650505050505050565b60608315611e7157508161177d565b61177d8383611ef0565b60608315611eea578251600003611ee3576001600160a01b0385163b611ee35760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016109b8565b5081611c4b565b611c4b83835b815115611f005781518083602001fd5b8060405162461bcd60e51b81526004016109b891906122e5565b80356001600160a01b0381168114611f3157600080fd5b919050565b600060208284031215611f4857600080fd5b61177d82611f1a565b600060208284031215611f6357600080fd5b81356001600160e01b03198116811461177d57600080fd5b600060208284031215611f8d57600080fd5b5035919050565b60008060408385031215611fa757600080fd5b82359150611fb760208401611f1a565b90509250929050565b60008060408385031215611fd357600080fd5b611fdc83611f1a565b9150611fb760208401611f1a565b634e487b7160e01b600052604160045260246000fd5b6000806040838503121561201357600080fd5b61201c83611f1a565b9150602083013567ffffffffffffffff8082111561203957600080fd5b818501915085601f83011261204d57600080fd5b81358181111561205f5761205f611fea565b604051601f8201601f19908116603f0116810190838211818310171561208757612087611fea565b816040528281528860208487010111156120a057600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b634e487b7160e01b600052601160045260246000fd5b6000828210156120ea576120ea6120c2565b500390565b6000816000190483118215151615612109576121096120c2565b500290565b60008261212b57634e487b7160e01b600052601260045260246000fd5b500490565b60008219821115612143576121436120c2565b500190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000602082840312156121f257600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60005b8381101561225f578181015183820152602001612247565b838111156117f95750506000910152565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516122a8816017850160208801612244565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516122d9816028840160208801612244565b01602801949350505050565b6020815260008251806020840152612304816040850160208701612244565b601f01601f19169190910160400192915050565b60006020828403121561232a57600080fd5b8151801515811461177d57600080fd5b634e487b7160e01b600052603260045260246000fd5b60008161235f5761235f6120c2565b506000190190565b60008251612379818460208701612244565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775a264697066735822122093f66806fc0bb5188c147c3b0e4ece101745bc685c40be468de9c76ac9bf28b664736f6c634300080f0033";

type StakingContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingContractConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakingContract__factory extends ContractFactory {
  constructor(...args: StakingContractConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakingContract> {
    return super.deploy(overrides || {}) as Promise<StakingContract>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StakingContract {
    return super.attach(address) as StakingContract;
  }
  override connect(signer: Signer): StakingContract__factory {
    return super.connect(signer) as StakingContract__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingContractInterface {
    return new utils.Interface(_abi) as StakingContractInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingContract {
    return new Contract(address, _abi, signerOrProvider) as StakingContract;
  }
}
