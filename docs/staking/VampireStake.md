# Solidity API

## VampireStake

### stakeToken

```solidity
contract VampireStakeToken stakeToken
```

_STAKE Token address_

### bloodToken

```solidity
contract VampireBloodToken bloodToken
```

_BLOOD Token address_

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### huntDuration

```solidity
uint256 huntDuration
```

_reward duration_

### huntOver

```solidity
uint256 huntOver
```

_reward period end_

### checkSurroundings

```solidity
uint256 checkSurroundings
```

_last updated at_

### bleedRate

```solidity
uint256 bleedRate
```

_reward rate p/sec_

### bloodPerStake

```solidity
uint256 bloodPerStake
```

_reward p/token_

### hunterBloodPerStake

```solidity
mapping(address => uint256) hunterBloodPerStake
```

### hunterBloodCollected

```solidity
mapping(address => uint256) hunterBloodCollected
```

### BloodAdded

```solidity
event BloodAdded(string message, uint256 blood)
```

emitted on reward BLOOD tokens deposited

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | operation message |
| blood | uint256 | reward amount |

### StakeEmbedded

```solidity
event StakeEmbedded(string message, address hunter, uint256 stakes)
```

emitted on staking STAKE tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | operation message |
| hunter | address | address of staker |
| stakes | uint256 | stake amount |

### StakeWithdrawn

```solidity
event StakeWithdrawn(string message, address hunter, uint256 stakes)
```

emitted on withdrawing stake tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | operation message |
| hunter | address | address of staker |
| stakes | uint256 | withdraw amount |

### BloodCollected

```solidity
event BloodCollected(string message, address hunter, uint256 blood)
```

emitted on withdrawing BLOOD reward

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| message | string | operation message |
| hunter | address | address of staker |
| blood | uint256 | reward amount |

### monitorVitals

```solidity
modifier monitorVitals(address _hunter)
```

### initialize

```solidity
function initialize(address _stakeToken, address _bloodToken) public
```

initializes contract

_sets contract access control_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _stakeToken | address | contract address of STAKE token |
| _bloodToken | address | contract address of BLOOD token |

### totalStakesEmbedded

```solidity
function totalStakesEmbedded() external view returns (uint256)
```

returns total staked tokens in contract

### hunterStakesEmbedded

```solidity
function hunterStakesEmbedded(address _hunter) external view returns (uint256)
```

returns staked balance of account

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _hunter | address | address of staker |

### checkOverShoulder

```solidity
function checkOverShoulder() public view returns (uint256)
```

returns minimum of block.timestamp and huntOver

### bloodPerStakeEmbedded

```solidity
function bloodPerStakeEmbedded() public view returns (uint256)
```

returns BLOOD reward per token

### bloodCollected

```solidity
function bloodCollected(address _hunter) public view returns (uint256)
```

returns total earned BLOOD reward amount by account

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _hunter | address | address of staker |

### embedStake

```solidity
function embedStake(uint256 _stakeAmount) external
```

allows users to stake tokens

_reverts if _stakeAmount = 0
emits StakedEmbedded event
allowed when not paused_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _stakeAmount | uint256 | amount of STAKE tokens to stake |

### withdrawStake

```solidity
function withdrawStake(uint256 _stakeAmount) public
```

allows users to withdraw stake

_reverts if _stakeAmount = 0
emits StakeWithdrawn event
allowed when not paused_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _stakeAmount | uint256 | amount of user stake to withdraw |

### collectBlood

```solidity
function collectBlood() public
```

allows users to withdraw BLOOD rewards earned

_reverts if no rewards to claim
emits BloodCollected event_

### runAway

```solidity
function runAway() external
```

withdraws stake and rewards

### pause

```solidity
function pause() public
```

pause contract

_only callable by ADMIN_ROLE_

### unpause

```solidity
function unpause() public
```

unpause contract

_only callable by ADMIN_ROLE_

### setHuntDuration

```solidity
function setHuntDuration(uint256 _huntDuration) external
```

set hunt duration for contract

_only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _huntDuration | uint256 | hunt duration |

### notifyBloodAmount

```solidity
function notifyBloodAmount(uint256 _bloodAmount) external
```

sets BLOOD reward rate (p/sec) based on desposited BLOOD and hunt duration set

_revert if _amount = 0 or _amount > BLOOD balance of contract
only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bloodAmount | uint256 | BLOOD deposited into contract to calculate bleed rate from |

### updateStakeToken

```solidity
function updateStakeToken(address _stakeToken) external
```

updates STAKE token contract

_reverts if new STAKE token address(0)
only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _stakeToken | address | new staking token contract address |

### updateBloodToken

```solidity
function updateBloodToken(address _bloodToken) external
```

updates BLOOD token contract

_reverts if new BLOOD token address(0)
only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _bloodToken | address | new BLOOD token contract address |

### _authorizeUpgrade

```solidity
function _authorizeUpgrade(address _newImplementation) internal
```

authorise contract upgrade

_only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _newImplementation | address | new implementation contract address |

