pragma solidity ^0.4.2;

contract Voting {
  //TODO create unit tests, that not only test, but guid a javascript / UI dev how to use this.
  //TODO figure out how to get a list of URLS back to client, given a user address
  //TODO figure out how to get a list of voter addresses back to the client given a URL
  //TODO add logging so UI clients can get logging data for 'free' from the local blockchain node.
  struct Vote {
    address curator; //address (identity) of curator
    uint voteCount; //total upvotes
  }

  // maps URL to Vote struct
  mapping (string => Vote) private voteMap;

  // maps userID (account address) to content
  mapping (address => string) private curatorMap;

  function upVote (string url) {
    voteMap[url].voteCount++;
  }

  function getVotes(string url) returns(uint count) {
    return voteMap[url].voteCount;
  }

  function createContent(string url) {
    require (voteMap[url].curator == 0x0); //entry should not exist
    voteMap[url].curator = msg.sender;
    voteMap[url].voteCount = 1;
    curatorMap[msg.sender] = url;
  }
}