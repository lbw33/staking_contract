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
    name: "Withdrawn",
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
    inputs: [],
    name: "getReward",
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
    name: "rewardPerTokenStored",
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
    name: "userRewardPerTokenPaid",
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
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a06040523060805234801561001457600080fd5b5060805161236c61004c6000396000818161098b015281816109cb01528181610e9601528181610ed60152610f65015261236c6000f3fe60806040526004361061020e5760003560e01c806367d3b488116101185780638b876347116100a0578063cc1a378f1161006f578063cc1a378f146105e9578063cd3daf9d14610609578063d547741f1461061e578063df136d651461063e578063f7c618c11461065557600080fd5b80638b8763471461056657806391d1485414610594578063a217fddf146105b4578063a694fc3a146105c957600080fd5b806375b238fc116100e757806375b238fc146104ec5780637b0a47ee1461050e57806380faa57d14610525578063817b1cd21461053a5780638456cb591461055157600080fd5b806367d3b4881461045757806370a082311461046e57806372f702f31461049c5780637519ab50146104d557600080fd5b806336568abe1161019b5780633f4ba83a1161016a5780633f4ba83a146103e2578063485cc955146103f75780634f1ef2861461041757806352d1902d1461042a5780635c975abb1461043f57600080fd5b806336568abe1461036d5780633659cfe61461038d5780633c6b16ab146103ad5780633d18b912146103cd57600080fd5b80630fb5a6b4116101e25780630fb5a6b4146102c6578063248a9ca3146102dd578063285d333b1461030d5780632e1a7d4d1461032d5780632f2ff15d1461034d57600080fd5b80628cc2621461021357806301ffc9a7146102465780630700037d14610276578063088ab8ce146102a4575b600080fd5b34801561021f57600080fd5b5061023361022e366004611e82565b610676565b6040519081526020015b60405180910390f35b34801561025257600080fd5b50610266610261366004611e9d565b6106f6565b604051901515815260200161023d565b34801561028257600080fd5b50610233610291366004611e82565b6101696020526000908152604090205481565b3480156102b057600080fd5b506102c46102bf366004611e82565b61072b565b005b3480156102d257600080fd5b506102336101625481565b3480156102e957600080fd5b506102336102f8366004611ec7565b600090815260fb602052604090206001015490565b34801561031957600080fd5b506102c4610328366004611e82565b610767565b34801561033957600080fd5b506102c4610348366004611ec7565b6107a3565b34801561035957600080fd5b506102c4610368366004611ee0565b6108d4565b34801561037957600080fd5b506102c4610388366004611ee0565b6108fe565b34801561039957600080fd5b506102c46103a8366004611e82565b610981565b3480156103b957600080fd5b506102c46103c8366004611ec7565b610a5d565b3480156103d957600080fd5b506102c4610c16565b3480156103ee57600080fd5b506102c4610cf5565b34801561040357600080fd5b506102c4610412366004611f0c565b610d15565b6102c4610425366004611f4c565b610e8c565b34801561043657600080fd5b50610233610f58565b34801561044b57600080fd5b5060975460ff16610266565b34801561046357600080fd5b506102336101635481565b34801561047a57600080fd5b50610233610489366004611e82565b6101676020526000908152604090205481565b3480156104a857600080fd5b5061015f546104bd906001600160a01b031681565b6040516001600160a01b03909116815260200161023d565b3480156104e157600080fd5b506102336101645481565b3480156104f857600080fd5b5061023360008051602061231783398151915281565b34801561051a57600080fd5b506102336101655481565b34801561053157600080fd5b5061023361100b565b34801561054657600080fd5b506102336101615481565b34801561055d57600080fd5b506102c461101f565b34801561057257600080fd5b50610233610581366004611e82565b6101686020526000908152604090205481565b3480156105a057600080fd5b506102666105af366004611ee0565b61103f565b3480156105c057600080fd5b50610233600081565b3480156105d557600080fd5b506102c46105e4366004611ec7565b61106a565b3480156105f557600080fd5b506102c4610604366004611ec7565b611189565b34801561061557600080fd5b506102336111cc565b34801561062a57600080fd5b506102c4610639366004611ee0565b611233565b34801561064a57600080fd5b506102336101665481565b34801561066157600080fd5b50610160546104bd906001600160a01b031681565b6001600160a01b03811660009081526101696020908152604080832054610168909252822054670de0b6b3a7640000906106ae6111cc565b6106b89190612024565b6001600160a01b038516600090815261016760205260409020546106dc919061203b565b6106e6919061205a565b6106f0919061207c565b92915050565b60006001600160e01b03198216637965db0b60e01b14806106f057506301ffc9a760e01b6001600160e01b03198316146106f0565b60008051602061231783398151915261074381611258565b5061016080546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602061231783398151915261077f81611258565b5061015f80546001600160a01b0319166001600160a01b0392909216919091179055565b6107ab611262565b6107b36112aa565b336107bc6111cc565b610166556107c861100b565b610164556001600160a01b03811615610813576107e481610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b600082116108345760405163d11b25af60e01b815260040160405180910390fd5b336000908152610167602052604081208054849290610854908490612024565b9250508190555081610161600082825461086e9190612024565b909155505061015f5461088b906001600160a01b03163384611305565b60408051338152602081018490527f7084f5476618d8e60b11ef0d7d3f06914655adb8793e28ff7f018d4c76d505d591015b60405180910390a1506108d1600161012d55565b50565b600082815260fb60205260409020600101546108ef81611258565b6108f98383611370565b505050565b6001600160a01b03811633146109735760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61097d82826113f6565b5050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036109c95760405162461bcd60e51b815260040161096a90612094565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610a126000805160206122d0833981519152546001600160a01b031690565b6001600160a01b031614610a385760405162461bcd60e51b815260040161096a906120e0565b610a418161145d565b604080516000808252602082019092526108d191839190611475565b600080516020612317833981519152610a7581611258565b6000610a7f6111cc565b61016655610a8b61100b565b610164556001600160a01b03811615610ad657610aa781610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b61016354421115610af85761016254610aef908461205a565b61016555610b38565b60004261016354610b099190612024565b61016554610b17919061203b565b61016254909150610b28858361207c565b610b32919061205a565b61016555505b60006101655411610b5c57604051637a69ed5160e11b815260040160405180910390fd5b610160546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa158015610ba5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bc9919061212c565b6101625461016554610bdb919061203b565b1115610bfa576040516388b88e1160e01b815260040160405180910390fd5b61016254610c08904261207c565b610163555050426101645550565b33610c1f6111cc565b61016655610c2b61100b565b610164556001600160a01b03811615610c7657610c4781610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b33600090815261016960205260409020548015610cb857336000818152610169602052604081205561016054610cb8916001600160a01b039091169083611305565b60408051338152602081018390527f8a43c4352486ec339f487f64af78ca5cbf06cd47833f073d3baf3a193e503161910160405180910390a15050565b600080516020612317833981519152610d0d81611258565b6108d16115e0565b600054610100900460ff1615808015610d355750600054600160ff909116105b80610d4f5750303b158015610d4f575060005460ff166001145b610db25760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161096a565b6000805460ff191660011790558015610dd5576000805461ff0019166101001790555b610ddd611632565b610de5611659565b610ded611688565b610df8600033611370565b610e1060008051602061231783398151915233611370565b61015f80546001600160a01b038086166001600160a01b03199283161790925561016080549285169290911691909117905580156108f9576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610ed45760405162461bcd60e51b815260040161096a90612094565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610f1d6000805160206122d0833981519152546001600160a01b031690565b6001600160a01b031614610f435760405162461bcd60e51b815260040161096a906120e0565b610f4c8261145d565b61097d82826001611475565b6000306001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001614610ff85760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c0000000000000000606482015260840161096a565b506000805160206122d083398151915290565b600061101a42610163546116b7565b905090565b60008051602061231783398151915261103781611258565b6108d16116d0565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b611072611262565b61107a6112aa565b336110836111cc565b6101665561108f61100b565b610164556001600160a01b038116156110da576110ab81610676565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b600082116110fb5760405163d11b25af60e01b815260040160405180910390fd5b61015f54611114906001600160a01b031633308561170d565b33600090815261016760205260408120805484929061113490849061207c565b9250508190555081610161600082825461114e919061207c565b909155505060408051338152602081018490527f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d91016108bd565b6000805160206123178339815191526111a181611258565b426101635411156111c55760405163715f384360e11b815260040160405180910390fd5b5061016255565b6000610161546000036111e157506101665490565b61016154610164546111f161100b565b6111fb9190612024565b61016554611209919061203b565b61121b90670de0b6b3a764000061203b565b611225919061205a565b6101665461101a919061207c565b600082815260fb602052604090206001015461124e81611258565b6108f983836113f6565b6108d1813361174b565b60975460ff16156112a85760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161096a565b565b600261012d54036112fd5760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c00604482015260640161096a565b600261012d55565b6040516001600160a01b0383166024820152604481018290526108f990849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526117a4565b600161012d55565b61137a828261103f565b61097d57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff191660011790556113b23390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611400828261103f565b1561097d57600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60008051602061231783398151915261097d81611258565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156114a8576108f983611876565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611502575060408051601f3d908101601f191682019092526114ff9181019061212c565b60015b6115655760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b606482015260840161096a565b6000805160206122d083398151915281146115d45760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b606482015260840161096a565b506108f9838383611912565b6115e8611937565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff166112a85760405162461bcd60e51b815260040161096a90612145565b600054610100900460ff166116805760405162461bcd60e51b815260040161096a90612145565b6112a8611980565b600054610100900460ff166116af5760405162461bcd60e51b815260040161096a90612145565b6112a86119a7565b6000818311156116c757816116c9565b825b9392505050565b6116d8611262565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a2586116153390565b6040516001600160a01b03808516602483015283166044820152606481018290526117459085906323b872dd60e01b90608401611331565b50505050565b611755828261103f565b61097d57611762816119da565b61176d8360206119ec565b60405160200161177e9291906121bc565b60408051601f198184030181529082905262461bcd60e51b825261096a91600401612231565b60006117f9826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611b889092919063ffffffff16565b8051909150156108f957808060200190518101906118179190612264565b6108f95760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840161096a565b6001600160a01b0381163b6118e35760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b606482015260840161096a565b6000805160206122d083398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b61191b83611b9f565b6000825111806119285750805b156108f9576117458383611bdf565b60975460ff166112a85760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161096a565b600054610100900460ff166113685760405162461bcd60e51b815260040161096a90612145565b600054610100900460ff166119ce5760405162461bcd60e51b815260040161096a90612145565b6097805460ff19169055565b60606106f06001600160a01b03831660145b606060006119fb83600261203b565b611a0690600261207c565b67ffffffffffffffff811115611a1e57611a1e611f36565b6040519080825280601f01601f191660200182016040528015611a48576020820181803683370190505b509050600360fc1b81600081518110611a6357611a63612286565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611a9257611a92612286565b60200101906001600160f81b031916908160001a9053506000611ab684600261203b565b611ac190600161207c565b90505b6001811115611b39576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611af557611af5612286565b1a60f81b828281518110611b0b57611b0b612286565b60200101906001600160f81b031916908160001a90535060049490941c93611b328161229c565b9050611ac4565b5083156116c95760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161096a565b6060611b978484600085611cd3565b949350505050565b611ba881611876565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b611c475760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b606482015260840161096a565b600080846001600160a01b031684604051611c6291906122b3565b600060405180830381855af49150503d8060008114611c9d576040519150601f19603f3d011682016040523d82523d6000602084013e611ca2565b606091505b5091509150611cca82826040518060600160405280602781526020016122f060279139611dae565b95945050505050565b606082471015611d345760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840161096a565b600080866001600160a01b03168587604051611d5091906122b3565b60006040518083038185875af1925050503d8060008114611d8d576040519150601f19603f3d011682016040523d82523d6000602084013e611d92565b606091505b5091509150611da387838387611dc7565b979650505050505050565b60608315611dbd5750816116c9565b6116c98383611e3c565b60608315611e36578251600003611e2f576001600160a01b0385163b611e2f5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161096a565b5081611b97565b611b9783835b815115611e4c5781518083602001fd5b8060405162461bcd60e51b815260040161096a9190612231565b80356001600160a01b0381168114611e7d57600080fd5b919050565b600060208284031215611e9457600080fd5b6116c982611e66565b600060208284031215611eaf57600080fd5b81356001600160e01b0319811681146116c957600080fd5b600060208284031215611ed957600080fd5b5035919050565b60008060408385031215611ef357600080fd5b82359150611f0360208401611e66565b90509250929050565b60008060408385031215611f1f57600080fd5b611f2883611e66565b9150611f0360208401611e66565b634e487b7160e01b600052604160045260246000fd5b60008060408385031215611f5f57600080fd5b611f6883611e66565b9150602083013567ffffffffffffffff80821115611f8557600080fd5b818501915085601f830112611f9957600080fd5b813581811115611fab57611fab611f36565b604051601f8201601f19908116603f01168101908382118183101715611fd357611fd3611f36565b81604052828152886020848701011115611fec57600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b634e487b7160e01b600052601160045260246000fd5b6000828210156120365761203661200e565b500390565b60008160001904831182151516156120555761205561200e565b500290565b60008261207757634e487b7160e01b600052601260045260246000fd5b500490565b6000821982111561208f5761208f61200e565b500190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b60006020828403121561213e57600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60005b838110156121ab578181015183820152602001612193565b838111156117455750506000910152565b7f416363657373436f6e74726f6c3a206163636f756e74200000000000000000008152600083516121f4816017850160208801612190565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351612225816028840160208801612190565b01602801949350505050565b6020815260008251806020840152612250816040850160208701612190565b601f01601f19169190910160400192915050565b60006020828403121561227657600080fd5b815180151581146116c957600080fd5b634e487b7160e01b600052603260045260246000fd5b6000816122ab576122ab61200e565b506000190190565b600082516122c5818460208701612190565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775a2646970667358221220c82d82d9d2a7b7eb331bfab08b8c9ede8d9f26d39d3a2fca175cb0af0e4c514864736f6c634300080f0033";

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
