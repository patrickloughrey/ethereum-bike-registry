var BikeRegistry = artifacts.require("./BikeRegistry.sol");

module.exports = function(deployer) {
  deployer.deploy(BikeRegistry);
};
