// SPDX-License-Identifier: MIT
pragma solidity ^0.8.5;
import "./ERC20.sol";

contract TDexToken is ERC20 {
    address public admin;
    constructor() ERC20("TDex Token", "TDEX") {
        _mint(msg.sender, 1000000 * 10 ** 18); // Creates a Million tokens
        admin = msg.sender;
    }

    function mint(address to, uint amount) external {
        require(msg.sender == admin, "only admin can mint new tokens");
        _mint(to, amount);
    }

    function burn(uint amount) external {
        _burn(msg.sender, amount);
    }
}