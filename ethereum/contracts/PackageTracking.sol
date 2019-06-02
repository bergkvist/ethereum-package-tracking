pragma solidity ^0.5.1;

contract PackageTracking {
    string public message;

    constructor(string memory initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}