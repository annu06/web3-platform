// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title PlatformToken
 * @notice ERC-20 governance token with staking, rewards, and vote delegation.
 *         Used for DAO participation and DeFi incentives across the platform.
 */
contract PlatformToken is
    ERC20,
    ERC20Burnable,
    ERC20Permit,
    ERC20Votes,
    AccessControl,
    Pausable,
    ReentrancyGuard
{
    bytes32 public constant MINTER_ROLE  = keccak256("MINTER_ROLE");
    bytes32 public constant PAUSER_ROLE  = keccak256("PAUSER_ROLE");

    uint256 public constant MAX_SUPPLY   = 1_000_000_000 * 10 ** 18; // 1 billion
    uint256 public constant REWARD_RATE  = 100;   // 1% per epoch
    uint256 public constant EPOCH_LENGTH = 7 days;

    // ---- Staking state ----
    struct StakeInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 stakedAt;
        uint256 lastClaimedAt;
    }

    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    uint256 public accRewardPerToken; // scaled by 1e18
    uint256 public lastRewardTime;
    uint256 public rewardPool;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardPoolFunded(uint256 amount);

    constructor(address admin)
        ERC20("Platform Token", "PLT")
        ERC20Permit("Platform Token")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
        _grantRole(PAUSER_ROLE, admin);

        // Mint initial supply: 40% to treasury, 30% to ecosystem, 30% locked
        uint256 treasuryAmount = (MAX_SUPPLY * 40) / 100;
        _mint(admin, treasuryAmount);
        lastRewardTime = block.timestamp;
    }

    // ─────────────────────────────────────────────────────────────
    // Minting
    // ─────────────────────────────────────────────────────────────

    function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) {
        require(totalSupply() + amount <= MAX_SUPPLY, "PlatformToken: max supply exceeded");
        _mint(to, amount);
    }

    // ─────────────────────────────────────────────────────────────
    // Staking
    // ─────────────────────────────────────────────────────────────

    function stake(uint256 amount) external nonReentrant whenNotPaused {
        require(amount > 0, "PlatformToken: zero amount");
        _updateRewards();

        StakeInfo storage info = stakes[msg.sender];
        if (info.amount > 0) {
            uint256 pending = _pendingReward(msg.sender);
            if (pending > 0) _distributeReward(msg.sender, pending);
        }

        _transfer(msg.sender, address(this), amount);
        info.amount      += amount;
        info.rewardDebt   = (info.amount * accRewardPerToken) / 1e18;
        info.stakedAt     = block.timestamp;
        totalStaked      += amount;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external nonReentrant {
        StakeInfo storage info = stakes[msg.sender];
        require(info.amount >= amount, "PlatformToken: insufficient stake");
        require(block.timestamp >= info.stakedAt + EPOCH_LENGTH, "PlatformToken: lock period active");

        _updateRewards();
        uint256 pending = _pendingReward(msg.sender);
        if (pending > 0) _distributeReward(msg.sender, pending);

        info.amount      -= amount;
        info.rewardDebt   = (info.amount * accRewardPerToken) / 1e18;
        totalStaked      -= amount;

        _transfer(address(this), msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimRewards() external nonReentrant {
        _updateRewards();
        uint256 pending = _pendingReward(msg.sender);
        require(pending > 0, "PlatformToken: no rewards");
        _distributeReward(msg.sender, pending);
        stakes[msg.sender].lastClaimedAt = block.timestamp;
    }

    function fundRewardPool(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _transfer(msg.sender, address(this), amount);
        rewardPool += amount;
        emit RewardPoolFunded(amount);
    }

    function pendingReward(address user) external view returns (uint256) {
        uint256 acc = accRewardPerToken;
        if (block.timestamp > lastRewardTime && totalStaked > 0) {
            uint256 elapsed  = block.timestamp - lastRewardTime;
            uint256 reward   = (elapsed * REWARD_RATE * totalStaked) / (EPOCH_LENGTH * 10000);
            uint256 actual   = reward > rewardPool ? rewardPool : reward;
            acc += (actual * 1e18) / totalStaked;
        }
        StakeInfo storage info = stakes[user];
        return (info.amount * acc) / 1e18 - info.rewardDebt;
    }

    // ─────────────────────────────────────────────────────────────
    // Internal helpers
    // ─────────────────────────────────────────────────────────────

    function _updateRewards() internal {
        if (block.timestamp <= lastRewardTime || totalStaked == 0) {
            lastRewardTime = block.timestamp;
            return;
        }
        uint256 elapsed = block.timestamp - lastRewardTime;
        uint256 reward  = (elapsed * REWARD_RATE * totalStaked) / (EPOCH_LENGTH * 10000);
        uint256 actual  = reward > rewardPool ? rewardPool : reward;
        if (actual > 0) {
            accRewardPerToken += (actual * 1e18) / totalStaked;
            rewardPool        -= actual;
        }
        lastRewardTime = block.timestamp;
    }

    function _pendingReward(address user) internal view returns (uint256) {
        StakeInfo storage info = stakes[user];
        return (info.amount * accRewardPerToken) / 1e18 - info.rewardDebt;
    }

    function _distributeReward(address user, uint256 amount) internal {
        stakes[user].rewardDebt = (stakes[user].amount * accRewardPerToken) / 1e18;
        _mint(user, amount); // rewards minted from remaining supply headroom
        emit RewardClaimed(user, amount);
    }

    // ─────────────────────────────────────────────────────────────
    // Admin
    // ─────────────────────────────────────────────────────────────

    function pause()   external onlyRole(PAUSER_ROLE) { _pause(); }
    function unpause() external onlyRole(PAUSER_ROLE) { _unpause(); }

    // ─────────────────────────────────────────────────────────────
    // Overrides required by Solidity
    // ─────────────────────────────────────────────────────────────

    function _update(address from, address to, uint256 value)
        internal override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public view override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
    {
        require(!paused() || from == address(0), "PlatformToken: paused");
    }
}
