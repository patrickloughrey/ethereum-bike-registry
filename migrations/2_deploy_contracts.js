var BikeRegistry = artifacts.require("BikeRegistry");

module.exports = function(deployer) {
  deployer.deploy(BikeRegistry);
};
