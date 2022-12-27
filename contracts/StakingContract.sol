// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "hardhat/console.sol";

contract StakingContract is
    Initializable,
    UUPSUpgradeable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeERC20Upgradeable for IERC20Upgradeable;

    IERC20Upgradeable public stakingToken;
    IERC20Upgradeable public rewardToken;

    /***** Roles *****/
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /***** Variables *****/

    uint256 public totalStaked;
    uint256 public duration;
    uint256 public finishAt;
    uint256 public updatedAt;
    uint256 public rewardRate;
    uint256 public rewardPerTokenStored;

    /***** Modifiers *****/
    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }
        _;
    }

    /***** Mappings *****/

    mapping(address => uint256) public balanceOf;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    /***** Events *****/
    event Staked(address account, uint256 amount);
    event RewardsWithdrawn(address account, uint256 amount);

    /***** Custom Errors *****/

    error RewardDurationNotFinished();
    error RewardRateCannotBeZero();
    error RewardAmountGreaterThanBalance();
    error AmountCannotBeZero();

    function initialize(address _stakingToken, address _rewardToken)
        public
        initializer
    {
        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        stakingToken = IERC20Upgradeable(_stakingToken);
        rewardToken = IERC20Upgradeable(_rewardToken);
    }

    /// @notice Authorise contract upgrade
    /// @dev Only entity with ADMIN_ROLE can call
    /// @param _newImplementation new implementation contract address

    function _authorizeUpgrade(address _newImplementation)
        internal
        override
        onlyRole(ADMIN_ROLE)
    {}

    /// @notice Pause contract
    /// @dev Only entity with ADMIN_ROLE can call

    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /// @notice Unpause contract
    /// @dev Only entity with ADMIN_ROLE can call

    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /// @notice Set rewards duration for contract
    /// @dev Restricted to ADMIN_ROLE
    /// @param _duration rewards duration

    function setRewardsDuration(uint256 _duration)
        external
        onlyRole(ADMIN_ROLE)
    {
        if (finishAt > block.timestamp) revert RewardDurationNotFinished();
        duration = _duration;
    }

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

    /// @notice Allows users to stake tokens
    /// @dev Allowed when not paused
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

    /// @notice Allows users to withdraw rewards
    /// @dev Allowed when not paused
    /// @param _amount amount of rewards to withdraw
    function withdraw(uint256 _amount)
        external
        whenNotPaused
        nonReentrant
        updateReward(msg.sender)
    {
        if (_amount <= 0) revert AmountCannotBeZero();
        balanceOf[msg.sender] -= _amount;
        totalStaked -= _amount;
        rewardToken.safeTransferFrom(address(this), msg.sender, _amount);
    }

    function lastTimeRewardApplicable() public view returns (uint256) {
        return _min(block.timestamp, finishAt);
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }
        return
            rewardPerTokenStored +
            (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) /
            totalStaked;
    }

    function earned(address _account) public view returns (uint256) {
        return
            ((balanceOf[_account] *
                ((rewardPerToken() - userRewardPerTokenPaid[_account]))) /
                1e18) + rewards[_account];
    }

    function getReward() external updateReward(msg.sender) {
        uint256 reward = rewards[msg.sender];

        if (reward > 0) {
            rewards[msg.sender] = 0;
            rewardToken.safeTransfer(msg.sender, reward);
        }

        emit RewardsWithdrawn(msg.sender, reward);
    }

    function changeStakingToken(address _stakingToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        stakingToken = IERC20Upgradeable(_stakingToken);
    }

    function changeRewardToken(address _rewardToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        rewardToken = IERC20Upgradeable(_rewardToken);
    }

    function _min(uint256 _x, uint256 _y) private pure returns (uint256) {
        return _x <= _y ? _x : _y;
    }
}
