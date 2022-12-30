// SPDX-License-Identifier: MIT
// StakingContract interface

pragma solidity ^0.8.15;

interface IVampireStake {
    function totalStakesEmbedded() external view returns (uint256);

    function hunterStakesEmbedded(address account)
        external
        view
        returns (uint256);

    function setHuntDuration(uint256 _huntDuration) external;

    function notifyBloodAmount(uint256 _bloodAmount) external;

    function embedStake(uint256 _stakeAmount) external;

    function withdrawStake(uint256 _stakeAmount) external;

    function collectBlood() external;

    function runAway() external;

    function checkOverShoulder() external view returns (uint256);

    function bloodPerStakeEmbedded() external view returns (uint256);

    function bloodCollected(address _hunter) external view returns (uint256);

    function updateStakeToken(address _stakeToken) external;

    function updateBloodToken(address _bloodToken) external;
}
