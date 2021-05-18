// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


contract Video is ERC721URIStorage {

     constructor() ERC721("Video", "BVT") {
     }

     // address should not be a param.  renter should be msg.sender
     // second param should just be video id.

     function rentVideo(string memory tokenURI) public returns (uint256) {

          uint256 tokenId = 1;
          _mint(msg.sender, tokenId);
          _setTokenURI(tokenId, tokenURI);

          return tokenId;
     }
}
