const PackageTracking = artifacts.require("PackageTracking");

module.exports = function(deployer) {
  deployer.deploy(PackageTracking, 'Initial value');
};
