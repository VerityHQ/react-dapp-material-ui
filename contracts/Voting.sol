pragma solidity ^0.4.2;

import "./SimpleStorage.sol";

contract Voting is SimpleStorage {
  struct ContentId {
    bytes32 content;
  }

  address userAddress

  mapping (ContentId => userAddress) private contentMap;

  function upVote (contentId) {

  }

  function getVotes(contentId) {

  }

  function createContent(bytes32 contentId) payable returns (bytes32) {
    // Check if user exists.
    // If yes, return user name.
    // If no, check if name was sent.
    // If yes, create and return user.
    // If no, throw.

    if (contentId == 0x0)
    {
        throw;
    }

    if (users[msg.sender].contentId == 0x0)
    {
        users[msg.sender].contentId = contentId;

        return (users[msg.sender].contentId);
    }

    return (users[msg.sender].contentId);
  }
}
