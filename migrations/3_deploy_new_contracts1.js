var VotingContract = artifacts.require("./Voting.sol");
var SimpleStorageContract = artifacts.require("./SimpleStorage.sol");
var MappedStorageContract = artifacts.require("./MappedStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(VotingContract);
  deployer.deploy(SimpleStorageContract);
  deployer.deploy(MappedStorageContract);
};
