pragma solidity ^0.4.2;

import './FixedSupplyToken.sol';

contract Voting {
  //TODO create unit tests, that not only test, but guid a javascript / UI dev how to use this.
  //TODO figure out how to get a list of URLS back to client, given a user address
  //TODO figure out how to get a list of voter addresses back to the client given a URL
  //TODO add logging so UI clients can get logging data for 'free' from the local blockchain node.
  struct Vote {
    address curator; //address (identity) of curator
    uint voteCount; //total upvotes
  }


  //struct Content {
  //  string url;
  //  string contentTitle;
  //}


  // Key is the URL 
  mapping (string => string) urlToTitle;

  // maps URL to Vote struct
  mapping (string => Vote) private voteMap;

  //mapping (string => Content) private content;

  // maps userID (account address) to content ( URL )
  // changed to facilitate the idea:
  // A user can upload multiple contents 
  // and each content is a URL
  mapping (string => address) private curatorMap;
  
  FixedSupplyToken fsToken = new FixedSupplyToken();


  //     function transfer(address _to, uint256 _amount) returns (bool success) {

  
  
  
  function upVote (string url) {

    voteMap[url].voteCount++;

    address curatorsAddress = curatorMap[url];

    bool transferSuccess = fsToken.transfer(curatorsAddress, 1);
    if (!transferSuccess) {
      throw;
    }

  }

  function getVotes(string url) returns(uint count) {
    return voteMap[url].voteCount;
  }

  function createContent(string url, string title) {
    require (voteMap[url].curator == 0x0); //entry should not exist
    voteMap[url].curator = msg.sender;
    voteMap[url].voteCount = 1;
    urlToTitle[url] = title;
    curatorMap[url] = msg.sender;


  }

}
