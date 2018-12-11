var Krutilka = artifacts.require("./Krutilka.sol");

var RandomPermutation = artifacts.require("./RandomPermutation.sol");


module.exports = function(deployer) {
  deployer.deploy(RandomPermutation);
  deployer.deploy(Krutilka, RandomPermutation.address);
};
