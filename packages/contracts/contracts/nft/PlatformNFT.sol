// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PlatformNFT
 * @notice ERC-721 NFT with on-chain royalties (EIP-2981), IPFS metadata,
 *         a native marketplace (list/buy/cancel), and auction support.
 */
contract PlatformNFT is
    ERC721,
    ERC721URIStorage,
    ERC721Burnable,
    ERC721Royalty,
    ERC721Enumerable,
    AccessControl,
    Pausable,
    ReentrancyGuard
{
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    uint256 private _nextTokenId;
    uint256 public mintPrice;
    uint256 public maxSupply;

    // ---- Marketplace ----
    struct Listing {
        address seller;
        uint256 price;
        bool    active;
    }

    struct Auction {
        address seller;
        uint256 startPrice;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        bool    settled;
    }

    mapping(uint256 => Listing) public listings;
    mapping(uint256 => Auction) public auctions;

    uint256 public platformFee = 250; // 2.5% in basis points
    address public feeRecipient;

    event NFTMinted(address indexed to, uint256 indexed tokenId, string uri);
    event Listed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event Delisted(uint256 indexed tokenId);
    event Sold(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event AuctionCreated(uint256 indexed tokenId, uint256 startPrice, uint256 endTime);
    event BidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event AuctionSettled(uint256 indexed tokenId, address indexed winner, uint256 amount);

    constructor(
        address admin,
        uint256 _mintPrice,
        uint256 _maxSupply,
        uint96  defaultRoyaltyBps
    )
        ERC721("Platform NFT", "PNFT")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);

        mintPrice    = _mintPrice;
        maxSupply    = _maxSupply;
        feeRecipient = admin;

        _setDefaultRoyalty(admin, defaultRoyaltyBps); // e.g., 500 = 5%
    }

    // ─────────────────────────────────────────────────────────────
    // Minting
    // ─────────────────────────────────────────────────────────────

    function mint(address to, string calldata uri)
        external payable nonReentrant whenNotPaused returns (uint256)
    {
        require(_nextTokenId < maxSupply, "PlatformNFT: sold out");
        require(msg.value >= mintPrice, "PlatformNFT: insufficient ETH");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        if (msg.value > mintPrice) {
            payable(msg.sender).transfer(msg.value - mintPrice);
        }

        emit NFTMinted(to, tokenId, uri);
        return tokenId;
    }

    function adminMint(address to, string calldata uri, uint96 royaltyBps)
        external onlyRole(MINTER_ROLE) returns (uint256)
    {
        require(_nextTokenId < maxSupply, "PlatformNFT: sold out");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        if (royaltyBps > 0) _setTokenRoyalty(tokenId, to, royaltyBps);
        emit NFTMinted(to, tokenId, uri);
        return tokenId;
    }

    // ─────────────────────────────────────────────────────────────
    // Marketplace: Fixed-Price
    // ─────────────────────────────────────────────────────────────

    function listForSale(uint256 tokenId, uint256 price) external whenNotPaused {
        require(ownerOf(tokenId) == msg.sender, "PlatformNFT: not owner");
        require(price > 0, "PlatformNFT: zero price");
        require(!auctions[tokenId].endTime > 0, "PlatformNFT: in auction");

        approve(address(this), tokenId);
        listings[tokenId] = Listing({ seller: msg.sender, price: price, active: true });
        emit Listed(tokenId, msg.sender, price);
    }

    function cancelListing(uint256 tokenId) external {
        require(listings[tokenId].seller == msg.sender, "PlatformNFT: not seller");
        delete listings[tokenId];
        emit Delisted(tokenId);
    }

    function buy(uint256 tokenId) external payable nonReentrant whenNotPaused {
        Listing memory listing = listings[tokenId];
        require(listing.active, "PlatformNFT: not listed");
        require(msg.value >= listing.price, "PlatformNFT: insufficient ETH");

        delete listings[tokenId];

        (address royaltyReceiver, uint256 royaltyAmount) = royaltyInfo(tokenId, listing.price);
        uint256 fee        = (listing.price * platformFee) / 10000;
        uint256 sellerNet  = listing.price - fee - royaltyAmount;

        payable(feeRecipient).transfer(fee);
        if (royaltyAmount > 0) payable(royaltyReceiver).transfer(royaltyAmount);
        payable(listing.seller).transfer(sellerNet);

        _transfer(listing.seller, msg.sender, tokenId);

        if (msg.value > listing.price) {
            payable(msg.sender).transfer(msg.value - listing.price);
        }

        emit Sold(tokenId, msg.sender, listing.price);
    }

    // ─────────────────────────────────────────────────────────────
    // Marketplace: Auction
    // ─────────────────────────────────────────────────────────────

    function createAuction(uint256 tokenId, uint256 startPrice, uint256 duration)
        external whenNotPaused
    {
        require(ownerOf(tokenId) == msg.sender, "PlatformNFT: not owner");
        require(!listings[tokenId].active, "PlatformNFT: already listed");
        require(duration >= 1 hours && duration <= 30 days, "PlatformNFT: invalid duration");

        approve(address(this), tokenId);
        auctions[tokenId] = Auction({
            seller:        msg.sender,
            startPrice:    startPrice,
            highestBid:    0,
            highestBidder: address(0),
            endTime:        block.timestamp + duration,
            settled:        false
        });

        emit AuctionCreated(tokenId, startPrice, block.timestamp + duration);
    }

    function placeBid(uint256 tokenId) external payable nonReentrant whenNotPaused {
        Auction storage auction = auctions[tokenId];
        require(block.timestamp < auction.endTime, "PlatformNFT: auction ended");
        require(
            msg.value > auction.highestBid && msg.value >= auction.startPrice,
            "PlatformNFT: bid too low"
        );

        // Refund previous bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBid    = msg.value;
        auction.highestBidder = msg.sender;

        // Extend by 5 min if bid placed in last 5 min (anti-sniping)
        if (auction.endTime - block.timestamp < 5 minutes) {
            auction.endTime = block.timestamp + 5 minutes;
        }

        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    function settleAuction(uint256 tokenId) external nonReentrant {
        Auction storage auction = auctions[tokenId];
        require(block.timestamp >= auction.endTime, "PlatformNFT: auction active");
        require(!auction.settled, "PlatformNFT: already settled");

        auction.settled = true;

        if (auction.highestBidder == address(0)) {
            // No bids — return NFT to seller
            emit AuctionSettled(tokenId, auction.seller, 0);
            return;
        }

        (address royaltyReceiver, uint256 royaltyAmount) = royaltyInfo(tokenId, auction.highestBid);
        uint256 fee       = (auction.highestBid * platformFee) / 10000;
        uint256 sellerNet = auction.highestBid - fee - royaltyAmount;

        payable(feeRecipient).transfer(fee);
        if (royaltyAmount > 0) payable(royaltyReceiver).transfer(royaltyAmount);
        payable(auction.seller).transfer(sellerNet);

        _transfer(auction.seller, auction.highestBidder, tokenId);

        emit AuctionSettled(tokenId, auction.highestBidder, auction.highestBid);
    }

    // ─────────────────────────────────────────────────────────────
    // Admin
    // ─────────────────────────────────────────────────────────────

    function setPlatformFee(uint256 newFee) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(newFee <= 1000, "PlatformNFT: fee too high"); // max 10%
        platformFee = newFee;
    }

    function setMintPrice(uint256 newPrice) external onlyRole(DEFAULT_ADMIN_ROLE) {
        mintPrice = newPrice;
    }

    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        payable(msg.sender).transfer(address(this).balance);
    }

    function pause()   external onlyRole(PAUSER_ROLE) { _pause(); }
    function unpause() external onlyRole(PAUSER_ROLE) { _unpause(); }

    // ─────────────────────────────────────────────────────────────
    // Overrides
    // ─────────────────────────────────────────────────────────────

    function _update(address to, uint256 tokenId, address auth)
        internal override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage, ERC721Enumerable, ERC721Royalty, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
