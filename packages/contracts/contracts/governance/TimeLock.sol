// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title TimeLock
 * @notice Wraps OZ TimelockController. All DAO governance actions execute
 *         through this contract after a minimum delay, giving token holders
 *         time to react to proposed changes.
 */
contract TimeLock is TimelockController {
    /**
     * @param minDelay  Seconds before a queued operation can execute (e.g., 2 days)
     * @param proposers Addresses that can propose (will be the Governor contract)
     * @param executors Addresses that can execute (address(0) = anyone)
     * @param admin     Initial admin (should be renounced after setup)
     */
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
