# Solidity API

## StakingContract

### stakingToken

```solidity
contract IERC20Upgradeable stakingToken
```

_stakingToken address_

### rewardToken

```solidity
contract IERC20Upgradeable rewardToken
```

_rewardToken address_

### ADMIN_ROLE

```solidity
bytes32 ADMIN_ROLE
```

### totalStaked

```solidity
uint256 totalStaked
```

_total staked in contract_

### duration

```solidity
uint256 duration
```

_reward duration_

### finishAt

```solidity
uint256 finishAt
```

_reward period end_

### updatedAt

```solidity
uint256 updatedAt
```

_last updated at_

### rewardRate

```solidity
uint256 rewardRate
```

_reward rate p/sec_

### rewardPerTokenStaked

```solidity
uint256 rewardPerTokenStaked
```

_reward p/token_

### balanceOf

```solidity
mapping(address => uint256) balanceOf
```

### userRewardPerTokenStaked

```solidity
mapping(address => uint256) userRewardPerTokenStaked
```

### rewards

```solidity
mapping(address => uint256) rewards
```

### Staked

```solidity
event Staked(address account, uint256 amount)
```

emitted on staking tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | address of staker |
| amount | uint256 | stake amount |

### StakeWithdrawn

```solidity
event StakeWithdrawn(address account, uint256 amount)
```

emitted on withdrawing staked tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | address of staker |
| amount | uint256 | withdraw amount |

### RewardsWithdrawn

```solidity
event RewardsWithdrawn(address account, uint256 amount)
```

emitted on withdrawing reward

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | address of staker |
| amount | uint256 | reward amount |

### StakingTokenCannotBeZeroAddress

```solidity
error StakingTokenCannotBeZeroAddress()
```

triggers if staking token address(0)

### RewardTokenCannotBeZeroAddress

```solidity
error RewardTokenCannotBeZeroAddress()
```

triggers if reward token address(0)

### RewardDurationNotFinished

```solidity
error RewardDurationNotFinished()
```

triggers if trying to set new duration before current period is ended

### RewardRateCannotBeZero

```solidity
error RewardRateCannotBeZero()
```

triggers if reward rate calculates to be zero

### RewardAmountGreaterThanBalance

```solidity
error RewardAmountGreaterThanBalance()
```

triggers if calculated reward amount is greater than current reward balance of contract

### AmountCannotBeZero

```solidity
error AmountCannotBeZero()
```

triggers if passed in amount is zero

### NoRewardsToClaim

```solidity
error NoRewardsToClaim()
```

triggers if rewards for address is zero

### updateReward

```solidity
modifier updateReward(address _account)
```

### initialize

```solidity
function initialize(address _stakingToken, address _rewardToken) public
```

initializes contract

_sets contract access control_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _stakingToken | address | contract address of staking token |
| _rewardToken | address | contract address of reward token |

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

### pause

```solidity
function pause() public
```

Pause contract

_only callable by ADMIN_ROLE_

### unpause

```solidity
function unpause() public
```

unpause contract

_only callable by ADMIN_ROLE_

### setRewardsDuration

```solidity
function setRewardsDuration(uint256 _duration) external
```

set rewards duration for contract

_only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _duration | uint256 | rewards duration |

### notifyRewardAmount

```solidity
function notifyRewardAmount(uint256 _amount) external
```

sets reward rate (p/sec) based on desposited rewards and duration set

_revert if _amount = 0 or _amount > reward balance of contract
only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | rewards deposited into contract to calculate reward rate from |

### stake

```solidity
function stake(uint256 _amount) external
```

allows users to stake tokens

_reverts if _amount = 0
emits Staked event
allowed when not paused_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | amount of tokens to stake |

### withdrawStake

```solidity
function withdrawStake(uint256 _amount) external
```

allows users to withdraw stake

_reverts if _amount = 0
emits StakeWtihdrawn event
allowed when not paused_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | amount of user stake to withdraw |

### withdrawRewards

```solidity
function withdrawRewards() external
```

allows users to withdraw rewards earned

_reverts if no rewards to claim
emits RewardsWithdrawn event_

### lastTimeRewardApplicable

```solidity
function lastTimeRewardApplicable() public view returns (uint256)
```

returns minimum of block.timestamp and finishAt

### rewardPerToken

```solidity
function rewardPerToken() public view returns (uint256)
```

returns reward per token

### earned

```solidity
function earned(address _account) public view returns (uint256)
```

returns total earned reward amount by account

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | address of staker |

### changeStakingToken

```solidity
function changeStakingToken(address _stakingToken) external
```

changes staking token contract

_revert with StakingTokenCannotBeZeroAddress if new stake token address(0)
only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _stakingToken | address | new staking token contract address |

### changeRewardToken

```solidity
function changeRewardToken(address _rewardToken) external
```

changes reward token contract

_revert with RewardTokenCannotBeZeroAddress if new stake token address(0)
only callable by ADMIN_ROLE_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardToken | address | new reward token contract address |

