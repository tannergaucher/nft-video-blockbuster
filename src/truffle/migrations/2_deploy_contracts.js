// eslint-disable-next-line no-undef
const Video = artifacts.require("Video");

module.exports = function (deployer) {
  deployer.deploy(Video);
};
