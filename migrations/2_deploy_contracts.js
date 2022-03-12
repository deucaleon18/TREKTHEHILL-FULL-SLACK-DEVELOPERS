var Contractio = artifacts.require("./Contractio.sol");

module.exports = function(deployer) {
  deployer.deploy(Contractio);
};
