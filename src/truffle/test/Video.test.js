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

  describe("minting", () => {
    it("rents a video to renter", async () => {
      const result = await contract.rentVideo(
        accounts[0],
        `https://foo.com/video/a1.json`
      );
      const event = result.logs[0].args;
      assert.equal(event.tokenId.toNumber(), 1, "id is correct");
      assert.equal(event.to, accounts[0], "to is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
    });
  });
});
