pragma solidity ^0.4.2;
contract MappedStorage {
  //TODO: just an idea of how to map many to many. Not tested.
  // see the following to get a better understanding of the problems
  // and possible solutions
  // https://medium.com/@robhitchens/solidity-crud-part-1-824ffa69509a
  // https://ethereum.stackexchange.com/questions/13167/are-there-well-solved-and-simple-storage-patterns-for-solidity
  // https://ethereum.stackexchange.com/questions/11947/mapping-multiple-keys-in-a-mapping-to-a-single-struct
  // https://solidity.readthedocs.io/en/latest/types.html#mappings
  // 
  //table-like storage for Content with a many-to-many association to Curators 
  // using mappings for random access and arrays for lists of keys. 
  // Here, a ContentStruct has a list of curators.
  struct ContentStruct {
      string url;
      address[] curators; //NOTE: more that 50 elements in an array starts to get cumbersome and dangerous - gas cost increases with size.
      //---
      uint contentId;
      mapping(string => address[]) urlCurators;
  }
  address[] private contentIds; //contentIds
  mapping(address => ContentStruct) curatorContentMap;

  // mapping(string => address[]) contentMap;
  // mapping(address => string[]) curatorMap; //TODO: do we need both of these to get the job done?
  function contentExists(address curatorAddress)
    public 
    constant
    returns(bool isIndeed)
  {
    if (contentIds.length == 0) 
      return false;
    return (contentIds[curatorContentMap[curatorAddress].contentId] == curatorAddress);
  }

  function registerContent(
    address curatorAddress, 
    string url) 
    public
    returns(uint contentId)
  {
    if (contentExists(curatorAddress)) 
      revert(); 
    curatorContentMap[curatorAddress].urlCurators[url].push(curatorAddress);//?
    curatorContentMap[curatorAddress].contentId = contentIds.push(curatorAddress)-1;
    //log new content
    return contentIds.length-1;
  }
  
  function getContent(address curatorAddress)
    public 
    constant
    returns(string url, uint contentId)
  {
    if (!contentExists(curatorAddress)) 
      revert(); 
    return(
      curatorContentMap[curatorAddress].url, 
      curatorContentMap[curatorAddress].contentId);
  }
  //we need to let the client loop through the address array
  //instead of looping in the contract. So we need to give the client
  //a length for the array so they can iterate
  
  //Mappings can only use elementary types (address, uint, bytes, string) as keys
  //Mappings are not iterable, but it is possible to implement a data structure on top of them. 
  //For an example, see iterable mapping. This allows you to iterate in solidity code as opposed to the client
  //https://solidity.readthedocs.io/en/latest/types.html#mappings
  //https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol
  //Without iteration, the client will need to keep track of the URLs if we want a list of them in the UI
  mapping (string => ContentStruct) contentMap;
  //Clients can enumerate the "curators" list for a given curator with a few functions to help out.
  // return the number of curators stored in the list inside a Content struct.
  // NOTE: this is also the upvote count total for the content.
  function contentCuratorCount(string url) constant returns(uint count) {
      return contentMap[url].curators.length;
  }
  //return the curator keys for the client to iterate its way through the list.
  function contentCuratorAtIndex(string url, uint contentId) constant returns(address curatorAddress) {
      return contentMap[url].curators[contentId];
  }
  function registerNewContent(string url, address curator) public {
      //TODO: test for exist?
      //first one to register also upvotes/attests.
      //So posting curator is always a[0] and they should get the rewards
      contentMap[url].curators.push(curator);
      contentMap[url].contentId = contentIds.push(curator)-1;
  }
}