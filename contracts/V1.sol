// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import './IImplementation.sol';

/**
 * @dev V1 contract that implements the IImplementation interface
 */
contract V1 is IImplementation {
    /**
     * @dev The betting price for the contract
     */
    uint public bettingPrice = 1 ether;

    /**
     * @return uint - the current betting price
     */
    function getPrice() override external view returns(uint) {
        return bettingPrice;
    }
}
