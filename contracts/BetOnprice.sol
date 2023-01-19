// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./PriceConsumerV3.sol";
import './IImplementation.sol';
import './V1.sol';

contract BetOnPrice {

    // Address of the contract owner
    address owner;

    // Array to store addresses of players
    address[] players;

    // Mapping to store each player's bet
    mapping(address => int) bets;

    // Variable to store the latest price
    int latestPrice;

    // Instance of the PriceConsumerV3 contract
    PriceConsumerV3 public priceConsumerV3;

    // Instance of the IImplementation contract
    IImplementation public implementation;

    /**
     * @dev Contract constructor
     * @notice The contract owner is set to msg.sender
     * @notice A new instance of the V1 contract is created
     */
    constructor() {
        owner = msg.sender;
        implementation = new V1();
    }

    /**
     * @dev Allows the owner to upgrade the implementation contract
     * @param _implementation - the address of the new implementation contract
     * @notice msg.sender must be the contract owner
     */
    function upgrade(address _implementation) external {
        require(msg.sender == owner, 'only admin');
        implementation = IImplementation(_implementation);
    }

    /**
     * @dev Returns the price of the bid
     * @return uint - the current price
     */
    function getPrice() external view returns(uint) {
        return implementation.getPrice()/100;
     }

    /**
     * @dev Allows a player to place a bet on the price
     * @param _bid - the price the player is betting on
     * @notice msg.value must be equal to the price/100
     */
    function placeBet(int _bid) public payable {
        require(msg.value == implementation.getPrice()/100, "not enough ether");
        players.push(msg.sender);
        bets[msg.sender] = _bid;
    }

    /**
     * @dev Returns the absolute value of x
     * @param x - the input value
     * @return uint - the absolute value of x
     */
    function abs(int x) internal pure returns (uint) {
        return x < 0 ? uint(-x) : uint(x);
    }

    /**
     * @dev allows the contract owner to transfer the balance to the player with the closest guess to the current price.
     * @notice msg.sender must be the contract owner
     */
    function rewardWinner() public {
        require(msg.sender == owner, "Only owner !");
        priceConsumerV3 = new PriceConsumerV3();
        latestPrice = priceConsumerV3.getLatestPrice();
        address winner = players[0];
        for (uint i = 1; i < players.length; i++) {
            if (abs(latestPrice - bets[players[i]]) < abs(latestPrice - bets[winner])) {
                winner = players[i];
            }
        }
        payable(winner).transfer(address(this).balance);
    }
}