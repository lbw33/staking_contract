// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "../StakingContract.sol";

contract StakingContractV2Test is StakingContract {
    function testFN() public view returns (uint256) {
        return 13;
    }
}
