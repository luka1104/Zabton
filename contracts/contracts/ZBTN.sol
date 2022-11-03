// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ZBTNCoin is ERC20 {
    uint256 constant _initial_supply = 1_000_000_000_000 * (10**8);

    constructor() ERC20("Zabton", "ZBTN") {
        _mint(msg.sender, _initial_supply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 8;
    }

    function multiTransfer(
        address[] calldata targets,
        uint256[] calldata amounts
    ) external {
        require(
            targets.length == amounts.length,
            "Airdropper: input length mismatch"
        );

        for (uint256 j = 0; j < amounts.length; j++) {
            transfer(targets[j], amounts[j]);
        }
    }

    function multiTransferFrom(
        address[] calldata recipients,
        address[] calldata targets,
        uint256[] calldata amounts
    ) external {
        require(
            targets.length == amounts.length &&
                targets.length == recipients.length,
            "Airdropper: input length mismatch"
        );

        for (uint256 j = 0; j < amounts.length; j++) {
            transferFrom(recipients[j], targets[j], amounts[j]);
        }
    }
}
