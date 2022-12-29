/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  StakingContractV2Test,
  StakingContractV2TestInterface,
} from "../../../contracts/helpers/StakingContractV2Test";

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
        name: "_finish",
        type: "uint256",
      },
    ],
    name: "setFinishAt",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rate",
        type: "uint256",
      },
    ],
    name: "setRewardRate",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "testFN",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "pure",
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
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFromContract",
    outputs: [],
    stateMutability: "nonpayable",
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
  "0x60a06040523060805234801561001457600080fd5b506080516125e961004c60003960008181610b6c01528181610bac01528181610fe60152818161102601526110b501526125e96000f3fe60806040526004361061023a5760003560e01c80635c975abb1161012e57806391d14854116100ab578063cc1a378f1161006f578063cc1a378f1461068e578063cd3daf9d146106ae578063d547741f146106c3578063e79ad577146106e3578063f7c618c1146106f757600080fd5b806391d14854146106035780639e447fc614610623578063a217fddf14610644578063a694fc3a14610659578063c7b8981c1461067957600080fd5b806375b238fc116100f257806375b238fc146105895780637b0a47ee146105ab57806380faa57d146105c2578063817b1cd2146105d75780638456cb59146105ee57600080fd5b80635c975abb146104dc57806367d3b488146104f457806370a082311461050b57806372f702f3146105395780637519ab501461057257600080fd5b8063285d333b116101bc5780633c6b16ab116101805780633c6b16ab1461045f5780633f4ba83a1461047f578063485cc955146104945780634f1ef286146104b457806352d1902d146104c757600080fd5b8063285d333b146103b15780632f2ff15d146103d1578063309ad248146103f157806336568abe1461041f5780633659cfe61461043f57600080fd5b80630fb5a6b4116102035780630fb5a6b4146103135780632126aa091461032a578063248a9ca31461034a5780632576dcad1461037a57806325d5971f1461039157600080fd5b80628cc2621461023f57806301ffc9a7146102725780630700037d146102a2578063088ab8ce146102d05780630bea6637146102f2575b600080fd5b34801561024b57600080fd5b5061025f61025a3660046120c3565b610718565b6040519081526020015b60405180910390f35b34801561027e57600080fd5b5061029261028d3660046120de565b610798565b6040519015158152602001610269565b3480156102ae57600080fd5b5061025f6102bd3660046120c3565b6101696020526000908152604090205481565b3480156102dc57600080fd5b506102f06102eb3660046120c3565b6107cd565b005b3480156102fe57600080fd5b506102f061030d366004612108565b61016355565b34801561031f57600080fd5b5061025f6101625481565b34801561033657600080fd5b506102f0610345366004612121565b610830565b34801561035657600080fd5b5061025f610365366004612108565b600090815260fb602052604090206001015490565b34801561038657600080fd5b5061025f6101665481565b34801561039d57600080fd5b506102f06103ac366004612108565b610921565b3480156103bd57600080fd5b506102f06103cc3660046120c3565b610a52565b3480156103dd57600080fd5b506102f06103ec36600461215d565b610ab5565b3480156103fd57600080fd5b5061025f61040c3660046120c3565b6101686020526000908152604090205481565b34801561042b57600080fd5b506102f061043a36600461215d565b610adf565b34801561044b57600080fd5b506102f061045a3660046120c3565b610b62565b34801561046b57600080fd5b506102f061047a366004612108565b610c3e565b34801561048b57600080fd5b506102f0610df7565b3480156104a057600080fd5b506102f06104af366004612189565b610e17565b6102f06104c23660046121c9565b610fdc565b3480156104d357600080fd5b5061025f6110a8565b3480156104e857600080fd5b5060975460ff16610292565b34801561050057600080fd5b5061025f6101635481565b34801561051757600080fd5b5061025f6105263660046120c3565b6101676020526000908152604090205481565b34801561054557600080fd5b5061015f5461055a906001600160a01b031681565b6040516001600160a01b039091168152602001610269565b34801561057e57600080fd5b5061025f6101645481565b34801561059557600080fd5b5061025f60008051602061259483398151915281565b3480156105b757600080fd5b5061025f6101655481565b3480156105ce57600080fd5b5061025f61115b565b3480156105e357600080fd5b5061025f6101615481565b3480156105fa57600080fd5b506102f061116f565b34801561060f57600080fd5b5061029261061e36600461215d565b61118f565b34801561062f57600080fd5b506102f061063e366004612108565b61016555565b34801561065057600080fd5b5061025f600081565b34801561066557600080fd5b506102f0610674366004612108565b6111ba565b34801561068557600080fd5b506102f06112d9565b34801561069a57600080fd5b506102f06106a9366004612108565b6113d0565b3480156106ba57600080fd5b5061025f611413565b3480156106cf57600080fd5b506102f06106de36600461215d565b61147a565b3480156106ef57600080fd5b50600d61025f565b34801561070357600080fd5b506101605461055a906001600160a01b031681565b6001600160a01b03811660009081526101696020908152604080832054610168909252822054670de0b6b3a764000090610750611413565b61075a91906122a1565b6001600160a01b0385166000908152610167602052604090205461077e91906122b8565b61078891906122d7565b61079291906122f9565b92915050565b60006001600160e01b03198216637965db0b60e01b148061079257506301ffc9a760e01b6001600160e01b0319831614610792565b6000805160206125948339815191526107e58161149f565b6001600160a01b03821661080c5760405163560b6c5d60e11b815260040160405180910390fd5b5061016080546001600160a01b0319166001600160a01b0392909216919091179055565b60405163095ea7b360e01b8152306004820152602481018290526001600160a01b0384169063095ea7b3906044016020604051808303816000875af115801561087d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a19190612311565b506040516323b872dd60e01b81523060048201526001600160a01b038381166024830152604482018390528416906323b872dd906064016020604051808303816000875af11580156108f7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091b9190612311565b50505050565b6109296114a9565b6109316114f1565b3361093a611413565b6101665561094661115b565b610164556001600160a01b038116156109915761096281610718565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b600082116109b25760405163d11b25af60e01b815260040160405180910390fd5b3360009081526101676020526040812080548492906109d29084906122a1565b925050819055508161016160008282546109ec91906122a1565b909155505061015f54610a09906001600160a01b0316338461154c565b60408051338152602081018490527f8108595eb6bad3acefa9da467d90cc2217686d5c5ac85460f8b7849c840645fc91015b60405180910390a150610a4f600161012d55565b50565b600080516020612594833981519152610a6a8161149f565b6001600160a01b038216610a91576040516353ab834d60e11b815260040160405180910390fd5b5061015f80546001600160a01b0319166001600160a01b0392909216919091179055565b600082815260fb6020526040902060010154610ad08161149f565b610ada83836115b7565b505050565b6001600160a01b0381163314610b545760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b610b5e828261163d565b5050565b6001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000163003610baa5760405162461bcd60e51b8152600401610b4b90612333565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316610bf360008051602061254d833981519152546001600160a01b031690565b6001600160a01b031614610c195760405162461bcd60e51b8152600401610b4b9061237f565b610c22816116a4565b60408051600080825260208201909252610a4f918391906116bc565b600080516020612594833981519152610c568161149f565b6000610c60611413565b61016655610c6c61115b565b610164556001600160a01b03811615610cb757610c8881610718565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b61016354421115610cd95761016254610cd090846122d7565b61016555610d19565b60004261016354610cea91906122a1565b61016554610cf891906122b8565b61016254909150610d0985836122f9565b610d1391906122d7565b61016555505b60006101655411610d3d57604051637a69ed5160e11b815260040160405180910390fd5b610160546040516370a0823160e01b81523060048201526001600160a01b03909116906370a0823190602401602060405180830381865afa158015610d86573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610daa91906123cb565b6101625461016554610dbc91906122b8565b1115610ddb576040516388b88e1160e01b815260040160405180910390fd5b61016254610de990426122f9565b610163555050426101645550565b600080516020612594833981519152610e0f8161149f565b610a4f611827565b600054610100900460ff1615808015610e375750600054600160ff909116105b80610e515750303b158015610e51575060005460ff166001145b610eb45760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b6064820152608401610b4b565b6000805460ff191660011790558015610ed7576000805461ff0019166101001790555b6001600160a01b038316610efe576040516353ab834d60e11b815260040160405180910390fd5b6001600160a01b038216610f255760405163560b6c5d60e11b815260040160405180910390fd5b610f2d611879565b610f356118a0565b610f3d6118cf565b610f486000336115b7565b610f60600080516020612594833981519152336115b7565b61015f80546001600160a01b038086166001600160a01b0319928316179092556101608054928516929091169190911790558015610ada576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000001630036110245760405162461bcd60e51b8152600401610b4b90612333565b7f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031661106d60008051602061254d833981519152546001600160a01b031690565b6001600160a01b0316146110935760405162461bcd60e51b8152600401610b4b9061237f565b61109c826116a4565b610b5e828260016116bc565b6000306001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146111485760405162461bcd60e51b815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152608401610b4b565b5060008051602061254d83398151915290565b600061116a42610163546118fe565b905090565b6000805160206125948339815191526111878161149f565b610a4f611917565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6111c26114a9565b6111ca6114f1565b336111d3611413565b610166556111df61115b565b610164556001600160a01b0381161561122a576111fb81610718565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b6000821161124b5760405163d11b25af60e01b815260040160405180910390fd5b61015f54611264906001600160a01b0316333085611954565b3360009081526101676020526040812080548492906112849084906122f9565b9250508190555081610161600082825461129e91906122f9565b909155505060408051338152602081018490527f9e71bc8eea02a63969f509818f2dafb9254532904319f9dbda79b67bd34a5f3d9101610a3b565b336112e2611413565b610166556112ee61115b565b610164556001600160a01b038116156113395761130a81610718565b6001600160a01b0382166000908152610169602090815260408083209390935561016654610168909152919020555b336000908152610169602052604090205480611368576040516373380d9960e01b815260040160405180910390fd5b336000818152610169602052604081205561016054611393916001600160a01b03909116908361154c565b60408051338152602081018390527f8a43c4352486ec339f487f64af78ca5cbf06cd47833f073d3baf3a193e503161910160405180910390a15050565b6000805160206125948339815191526113e88161149f565b4261016354111561140c5760405163715f384360e11b815260040160405180910390fd5b5061016255565b60006101615460000361142857506101665490565b610161546101645461143861115b565b61144291906122a1565b6101655461145091906122b8565b61146290670de0b6b3a76400006122b8565b61146c91906122d7565b6101665461116a91906122f9565b600082815260fb60205260409020600101546114958161149f565b610ada838361163d565b610a4f813361198c565b60975460ff16156114ef5760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610b4b565b565b600261012d54036115445760405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152606401610b4b565b600261012d55565b6040516001600160a01b038316602482015260448101829052610ada90849063a9059cbb60e01b906064015b60408051601f198184030181529190526020810180516001600160e01b03166001600160e01b0319909316929092179091526119e5565b600161012d55565b6115c1828261118f565b610b5e57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff191660011790556115f93390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b611647828261118f565b15610b5e57600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600080516020612594833981519152610b5e8161149f565b7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435460ff16156116ef57610ada83611ab7565b826001600160a01b03166352d1902d6040518163ffffffff1660e01b8152600401602060405180830381865afa925050508015611749575060408051601f3d908101601f19168201909252611746918101906123cb565b60015b6117ac5760405162461bcd60e51b815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201526d6f6e206973206e6f74205555505360901b6064820152608401610b4b565b60008051602061254d833981519152811461181b5760405162461bcd60e51b815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f786044820152681a58589b195555525160ba1b6064820152608401610b4b565b50610ada838383611b53565b61182f611b78565b6097805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b600054610100900460ff166114ef5760405162461bcd60e51b8152600401610b4b906123e4565b600054610100900460ff166118c75760405162461bcd60e51b8152600401610b4b906123e4565b6114ef611bc1565b600054610100900460ff166118f65760405162461bcd60e51b8152600401610b4b906123e4565b6114ef611be8565b60008183111561190e5781611910565b825b9392505050565b61191f6114a9565b6097805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861185c3390565b6040516001600160a01b038085166024830152831660448201526064810182905261091b9085906323b872dd60e01b90608401611578565b611996828261118f565b610b5e576119a381611c1b565b6119ae836020611c2d565b6040516020016119bf92919061245b565b60408051601f198184030181529082905262461bcd60e51b8252610b4b916004016124d0565b6000611a3a826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316611dc99092919063ffffffff16565b805190915015610ada5780806020019051810190611a589190612311565b610ada5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401610b4b565b6001600160a01b0381163b611b245760405162461bcd60e51b815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201526c1bdd08184818dbdb9d1c9858dd609a1b6064820152608401610b4b565b60008051602061254d83398151915280546001600160a01b0319166001600160a01b0392909216919091179055565b611b5c83611de0565b600082511180611b695750805b15610ada5761091b8383611e20565b60975460ff166114ef5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610b4b565b600054610100900460ff166115af5760405162461bcd60e51b8152600401610b4b906123e4565b600054610100900460ff16611c0f5760405162461bcd60e51b8152600401610b4b906123e4565b6097805460ff19169055565b60606107926001600160a01b03831660145b60606000611c3c8360026122b8565b611c479060026122f9565b67ffffffffffffffff811115611c5f57611c5f6121b3565b6040519080825280601f01601f191660200182016040528015611c89576020820181803683370190505b509050600360fc1b81600081518110611ca457611ca4612503565b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611cd357611cd3612503565b60200101906001600160f81b031916908160001a9053506000611cf78460026122b8565b611d029060016122f9565b90505b6001811115611d7a576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110611d3657611d36612503565b1a60f81b828281518110611d4c57611d4c612503565b60200101906001600160f81b031916908160001a90535060049490941c93611d7381612519565b9050611d05565b5083156119105760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e746044820152606401610b4b565b6060611dd88484600085611f14565b949350505050565b611de981611ab7565b6040516001600160a01b038216907fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b90600090a250565b60606001600160a01b0383163b611e885760405162461bcd60e51b815260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f6044820152651b9d1c9858dd60d21b6064820152608401610b4b565b600080846001600160a01b031684604051611ea39190612530565b600060405180830381855af49150503d8060008114611ede576040519150601f19603f3d011682016040523d82523d6000602084013e611ee3565b606091505b5091509150611f0b828260405180606001604052806027815260200161256d60279139611fef565b95945050505050565b606082471015611f755760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401610b4b565b600080866001600160a01b03168587604051611f919190612530565b60006040518083038185875af1925050503d8060008114611fce576040519150601f19603f3d011682016040523d82523d6000602084013e611fd3565b606091505b5091509150611fe487838387612008565b979650505050505050565b60608315611ffe575081611910565b611910838361207d565b60608315612077578251600003612070576001600160a01b0385163b6120705760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401610b4b565b5081611dd8565b611dd883835b81511561208d5781518083602001fd5b8060405162461bcd60e51b8152600401610b4b91906124d0565b80356001600160a01b03811681146120be57600080fd5b919050565b6000602082840312156120d557600080fd5b611910826120a7565b6000602082840312156120f057600080fd5b81356001600160e01b03198116811461191057600080fd5b60006020828403121561211a57600080fd5b5035919050565b60008060006060848603121561213657600080fd5b61213f846120a7565b925061214d602085016120a7565b9150604084013590509250925092565b6000806040838503121561217057600080fd5b82359150612180602084016120a7565b90509250929050565b6000806040838503121561219c57600080fd5b6121a5836120a7565b9150612180602084016120a7565b634e487b7160e01b600052604160045260246000fd5b600080604083850312156121dc57600080fd5b6121e5836120a7565b9150602083013567ffffffffffffffff8082111561220257600080fd5b818501915085601f83011261221657600080fd5b813581811115612228576122286121b3565b604051601f8201601f19908116603f01168101908382118183101715612250576122506121b3565b8160405282815288602084870101111561226957600080fd5b8260208601602083013760006020848301015280955050505050509250929050565b634e487b7160e01b600052601160045260246000fd5b6000828210156122b3576122b361228b565b500390565b60008160001904831182151516156122d2576122d261228b565b500290565b6000826122f457634e487b7160e01b600052601260045260246000fd5b500490565b6000821982111561230c5761230c61228b565b500190565b60006020828403121561232357600080fd5b8151801515811461191057600080fd5b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b19195b1959d85d1958d85b1b60a21b606082015260800190565b6020808252602c908201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060408201526b6163746976652070726f787960a01b606082015260800190565b6000602082840312156123dd57600080fd5b5051919050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60005b8381101561244a578181015183820152602001612432565b8381111561091b5750506000910152565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161249381601785016020880161242f565b7001034b99036b4b9b9b4b733903937b6329607d1b60179184019182015283516124c481602884016020880161242f565b01602801949350505050565b60208152600082518060208401526124ef81604085016020870161242f565b601f01601f19169190910160400192915050565b634e487b7160e01b600052603260045260246000fd5b6000816125285761252861228b565b506000190190565b6000825161254281846020870161242f565b919091019291505056fe360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c6564a49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775a264697066735822122005e37c015183853d5be9712b2dd40078e36a535f70c86120872375d23730d57f64736f6c634300080f0033";

type StakingContractV2TestConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StakingContractV2TestConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StakingContractV2Test__factory extends ContractFactory {
  constructor(...args: StakingContractV2TestConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StakingContractV2Test> {
    return super.deploy(overrides || {}) as Promise<StakingContractV2Test>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StakingContractV2Test {
    return super.attach(address) as StakingContractV2Test;
  }
  override connect(signer: Signer): StakingContractV2Test__factory {
    return super.connect(signer) as StakingContractV2Test__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StakingContractV2TestInterface {
    return new utils.Interface(_abi) as StakingContractV2TestInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StakingContractV2Test {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as StakingContractV2Test;
  }
}
