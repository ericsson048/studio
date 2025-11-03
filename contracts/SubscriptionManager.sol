// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SubscriptionManager {
    IERC20 public usdc;
    
    struct Subscription {
        address merchant;
        uint256 amount;
        uint256 frequency;
        uint256 lastPayment;
    }
    
    mapping(address => Subscription[]) public userSubscriptions;
    
    // ... implementation
}
