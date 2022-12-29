// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "./interfaces/IStakingContract.sol";

contract StakingContract is
    IStakingContract,
    Initializable,
    UUPSUpgradeable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    /// @dev stakingToken address
    IERC20Upgradeable public stakingToken;
    /// @dev rewardToken address
    IERC20Upgradeable public rewardToken;

    /***** Roles *****/
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /***** Variables *****/
    /// @dev total staked in contract
    uint256 public totalStaked;
    /// @dev reward duration
    uint256 public duration;
    /// @dev reward period end
    uint256 public finishAt;
    /// @dev last updated at
    uint256 public updatedAt;
    /// @dev reward rate p/sec
    uint256 public rewardRate;
    /// @dev reward p/token
    uint256 public rewardPerTokenStaked;

    /***** Mappings *****/

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public userRewardPerTokenStaked;
    mapping(address => uint256) public rewards;

    /***** Events *****/
    /// @notice emitted on staking tokens
    /// @param account address of staker
    /// @param amount stake amount
    event Staked(address account, uint256 amount);
    /// @notice emitted on withdrawing staked tokens
    /// @param account address of staker
    /// @param amount withdraw amount
    event StakeWithdrawn(address account, uint256 amount);
    /// @notice emitted on withdrawing reward
    /// @param account address of staker
    /// @param amount reward amount
    event RewardsWithdrawn(address account, uint256 amount);

    /***** Custom Errors *****/
    /// @notice triggers if staking token address(0)
    error StakingTokenCannotBeZeroAddress();
    /// @notice triggers if reward token address(0)
    error RewardTokenCannotBeZeroAddress();
    /// @notice triggers if trying to set new duration before current period is ended
    error RewardDurationNotFinished();
    /// @notice triggers if reward rate calculates to be zero
    error RewardRateCannotBeZero();
    /// @notice triggers if calculated reward amount is greater than current reward balance of contract
    error RewardAmountGreaterThanBalance();
    /// @notice triggers if passed in amount is zero
    error AmountCannotBeZero();
    /// @notice triggers if rewards for address is zero
    error NoRewardsToClaim();

    /***** Modifiers *****/
    modifier updateReward(address _account) {
        rewardPerTokenStaked = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenStaked[_account] = rewardPerTokenStaked;
        }
        _;
    }

    /// @notice initializes contract
    /// @dev sets contract access control
    /// @param _stakingToken contract address of staking token
    /// @param _rewardToken contract address of reward token
    function initialize(address _stakingToken, address _rewardToken)
        public
        initializer
    {
        if (_stakingToken == address(0))
            revert StakingTokenCannotBeZeroAddress();
        if (_rewardToken == address(0)) revert RewardTokenCannotBeZeroAddress();

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        stakingToken = IERC20Upgradeable(_stakingToken);
        rewardToken = IERC20Upgradeable(_rewardToken);
    }

    /// @notice authorise contract upgrade
    /// @dev only callable by ADMIN_ROLE
    /// @param _newImplementation new implementation contract address

    function _authorizeUpgrade(address _newImplementation)
        internal
        override
        onlyRole(ADMIN_ROLE)
    {}

    /// @notice Pause contract
    /// @dev only callable by ADMIN_ROLE

    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /// @notice unpause contract
    /// @dev only callable by ADMIN_ROLE

    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /// @notice set rewards duration for contract
    /// @dev only callable by ADMIN_ROLE
    /// @param _duration rewards duration

    function setRewardsDuration(uint256 _duration)
        external
        onlyRole(ADMIN_ROLE)
    {
        if (finishAt > block.timestamp) revert RewardDurationNotFinished();
        duration = _duration;
    }

    /// @notice sets reward rate (p/sec) based on desposited rewards and duration set
    /// @dev revert if _amount = 0 or _amount > reward balance of contract
    /// @dev only callable by ADMIN_ROLE
    /// @param _amount rewards deposited into contract to calculate reward rate from
    function notifyRewardAmount(uint256 _amount)
        external
        onlyRole(ADMIN_ROLE)
        updateReward(address(0))
    {
        if (block.timestamp > finishAt) {
            rewardRate = _amount / duration;
        } else {
            uint256 remainingRewards = rewardRate *
                (finishAt - block.timestamp);
            rewardRate = (remainingRewards + _amount) / duration;
        }

        if (rewardRate <= 0) revert RewardRateCannotBeZero();
        if ((rewardRate * duration) > rewardToken.balanceOf(address(this)))
            revert RewardAmountGreaterThanBalance();

        finishAt = block.timestamp + duration;
        updatedAt = block.timestamp;
    }

    /// @notice allows users to stake tokens
    /// @dev reverts if _amount = 0
    /// @dev emits Staked event
    /// @dev allowed when not paused
    /// @param _amount amount of tokens to stake
    function stake(uint256 _amount)
        external
        whenNotPaused
        nonReentrant
        updateReward(msg.sender)
    {
        if (_amount <= 0) revert AmountCannotBeZero();
        stakingToken.safeTransferFrom(msg.sender, address(this), _amount);
        balanceOf[msg.sender] += _amount;
        totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }

    /// @notice allows users to withdraw stake
    /// @dev reverts if _amount = 0
    /// @dev emits StakeWtihdrawn event
    /// @dev allowed when not paused
    /// @param _amount amount of user stake to withdraw
    function withdrawStake(uint256 _amount)
        external
        whenNotPaused
        nonReentrant
        updateReward(msg.sender)
    {
        if (_amount <= 0) revert AmountCannotBeZero();
        balanceOf[msg.sender] -= _amount;
        totalStaked -= _amount;
        stakingToken.safeTransfer(msg.sender, _amount);
        emit StakeWithdrawn(msg.sender, _amount);
    }

    /// @notice allows users to withdraw rewards earned
    /// @dev reverts if no rewards to claim
    /// @dev emits RewardsWithdrawn event
    function withdrawRewards() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];

        if (reward <= 0) revert NoRewardsToClaim();

        rewards[msg.sender] = 0;
        rewardToken.safeTransfer(msg.sender, reward);

        emit RewardsWithdrawn(msg.sender, reward);
    }

    /// @notice returns minimum of block.timestamp and finishAt
    function lastTimeRewardApplicable() public view returns (uint256) {
        return _min(block.timestamp, finishAt);
    }

    /// @notice returns reward per token
    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStaked;
        }
        return
            rewardPerTokenStaked +
            (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) /
            totalStaked;
    }

    /// @notice returns total earned reward amount by account
    /// @param _account address of staker
    function earned(address _account) public view returns (uint256) {
        return
            (balanceOf[_account] *
                (rewardPerToken() - userRewardPerTokenStaked[_account])) /
            1e18 +
            rewards[_account];
    }

    /// @notice changes staking token contract
    /// @dev revert with StakingTokenCannotBeZeroAddress if new stake token address(0)
    /// @dev only callable by ADMIN_ROLE
    /// @param _stakingToken new staking token contract address
    function changeStakingToken(address _stakingToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        if (_stakingToken == address(0))
            revert StakingTokenCannotBeZeroAddress();

        stakingToken = IERC20Upgradeable(_stakingToken);
    }

    /// @notice changes reward token contract
    /// @dev revert with RewardTokenCannotBeZeroAddress if new stake token address(0)
    /// @dev only callable by ADMIN_ROLE
    /// @param _rewardToken new reward token contract address
    function changeRewardToken(address _rewardToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        if (_rewardToken == address(0)) revert RewardTokenCannotBeZeroAddress();
        rewardToken = IERC20Upgradeable(_rewardToken);
    }

    /// @notice returns minimum of two numbers
    function _min(uint256 _x, uint256 _y) private pure returns (uint256) {
        return _x <= _y ? _x : _y;
    }
}
