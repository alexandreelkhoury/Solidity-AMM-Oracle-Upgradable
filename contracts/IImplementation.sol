// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/**
 * @dev Interface for contract implementations
 */
interface IImplementation {
    /**
     * @return uint - the current price
     */
    function getPrice() external view returns(uint);
}
