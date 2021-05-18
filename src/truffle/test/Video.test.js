const { assert } = require("chai");

// eslint-disable-next-line no-undef
const Video = artifacts.require("./Video.sol");

require("chai").use(require("chai-as-promised")).should();

// eslint-disable-next-line no-undef
contract("Video", (accounts) => {
  let contract;

  // eslint-disable-next-line no-undef
  before(async () => {
    contract = await Video.deployed();
  });

  describe("deployment", () => {
    it("deploys successfully", () => {
      const address = contract.address;
      assert.notEqual(address, "");
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "Video");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "BVT");
    });
  });
});
