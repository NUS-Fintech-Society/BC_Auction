const finalContract = artifacts.require("./Products.sol");

module.exports = function (deployer) {
  deployer.deploy(finalContract);
};
