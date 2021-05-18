// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Video is ERC721URIStorage {
     using Counters for Counters.Counter;
     Counters.Counter private _tokenIds;

     constructor() ERC721("Video", "BVT") {
     }

     function rentVideo(address renter, string memory tokenURI) public returns (uint256) {
          _tokenIds.increment();

          uint256 newItemId = _tokenIds.current();
          _mint(renter, newItemId);
          _setTokenURI(newItemId, tokenURI);

          return newItemId;
     }
}


