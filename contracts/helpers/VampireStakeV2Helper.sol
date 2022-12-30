// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "../staking/VampireStake.sol";

contract VampireStakeV2Helper is VampireStake {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    function unluckyNumber() public pure returns (uint256) {
        return 13;
    }

    function transferFromContract(
        address _token,
        address _to,
        uint256 _amount
    ) public {
        IERC20Upgradeable(_token).approve(address(this), _amount);
        IERC20Upgradeable(_token).transferFrom(address(this), _to, _amount);
    }

    function setHuntOver(uint256 _huntOver) public {
        huntOver = _huntOver;
    }

    function setBleedRate(uint256 _bleedRate) public {
        bleedRate = _bleedRate;
    }
}
