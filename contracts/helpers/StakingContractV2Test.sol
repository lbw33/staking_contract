// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "../StakingContract.sol";

contract StakingContractV2Test is StakingContract {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    function testFN() public pure returns (uint256) {
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

    function setFinishAt(uint256 _finish) public {
        finishAt = _finish;
    }

    function setRewardRate(uint256 _rate) public {
        rewardRate = _rate;
    }
}
