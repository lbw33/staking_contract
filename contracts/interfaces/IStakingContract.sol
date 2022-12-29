// SPDX-License-Identifier: MIT
// StakingContract interface

pragma solidity ^0.8.15;

interface IStakingContract {
    /***** Events *****/
    event Staked(address account, uint256 amount);
    event StakeWithdrawn(address account, uint256 amount);
    event RewardsWithdrawn(address account, uint256 amount);

    /***** Functions *****/

    function setRewardsDuration(uint256 _duration) external;

    function notifyRewardAmount(uint256 _amount) external;

    function stake(uint256 _amount) external;

    function withdrawStake(uint256 _amount) external;

    function withdrawRewards() external;

    function lastTimeRewardApplicable() external view returns (uint256);

    function rewardPerToken() external view returns (uint256);

    function earned(address _account) external view returns (uint256);

    function changeStakingToken(address _stakingToken) external;

    function changeRewardToken(address _rewardToken) external;
}
