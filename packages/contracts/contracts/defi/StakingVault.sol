// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title StakingVault
 * @notice Multi-pool yield farming. Supports multiple token pairs
 *         (e.g., PLT, PLT/ETH LP) with configurable reward emission.
 *         Architecture mirrors Masterchef-style contracts.
 */
contract StakingVault is Ownable, Pausable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ---- Data structures ----

    struct PoolInfo {
        IERC20  lpToken;
        uint256 allocPoint;       // Relative weight of reward emission
        uint256 lastRewardBlock;
        uint256 accRewardPerShare; // Scaled by 1e12
        uint256 depositFee;        // Basis points (max 200 = 2%)
        bool    active;
    }

    struct UserInfo {
        uint256 amount;
        uint256 rewardDebt;
        uint256 totalClaimed;
    }

    // ---- State ----

    IERC20 public rewardToken;
    uint256 public rewardPerBlock;
    uint256 public totalAllocPoint;
    uint256 public startBlock;
    address public feeCollector;

    PoolInfo[] public pools;
    mapping(uint256 => mapping(address => UserInfo)) public userInfo;

    // ---- Events ----

    event PoolAdded(uint256 indexed pid, address lpToken, uint256 allocPoint, uint256 depositFee);
    event PoolUpdated(uint256 indexed pid, uint256 allocPoint, bool active);
    event Deposit(address indexed user, uint256 indexed pid, uint256 amount);
    event Withdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 indexed pid, uint256 amount);
    event Harvest(address indexed user, uint256 indexed pid, uint256 amount);
    event RewardRateUpdated(uint256 newRate);

    constructor(
        IERC20  _rewardToken,
        uint256 _rewardPerBlock,
        uint256 _startBlock,
        address _feeCollector
    ) Ownable(msg.sender) {
        rewardToken    = _rewardToken;
        rewardPerBlock = _rewardPerBlock;
        startBlock     = _startBlock;
        feeCollector   = _feeCollector;
    }

    // ─────────────────────────────────────────────────────────────
    // Pool management
    // ─────────────────────────────────────────────────────────────

    function poolLength() external view returns (uint256) {
        return pools.length;
    }

    function addPool(
        uint256 _allocPoint,
        IERC20  _lpToken,
        uint256 _depositFee,
        bool    _withUpdate
    ) external onlyOwner {
        require(_depositFee <= 200, "StakingVault: fee too high");
        if (_withUpdate) massUpdatePools();

        totalAllocPoint += _allocPoint;
        pools.push(PoolInfo({
            lpToken:           _lpToken,
            allocPoint:        _allocPoint,
            lastRewardBlock:   block.number > startBlock ? block.number : startBlock,
            accRewardPerShare: 0,
            depositFee:        _depositFee,
            active:            true
        }));

        emit PoolAdded(pools.length - 1, address(_lpToken), _allocPoint, _depositFee);
    }

    function setPool(uint256 pid, uint256 _allocPoint, bool _active, bool _withUpdate)
        external onlyOwner
    {
        if (_withUpdate) massUpdatePools();
        totalAllocPoint = totalAllocPoint - pools[pid].allocPoint + _allocPoint;
        pools[pid].allocPoint = _allocPoint;
        pools[pid].active     = _active;
        emit PoolUpdated(pid, _allocPoint, _active);
    }

    // ─────────────────────────────────────────────────────────────
    // Reward calculation
    // ─────────────────────────────────────────────────────────────

    function pendingReward(uint256 pid, address user) external view returns (uint256) {
        PoolInfo storage pool = pools[pid];
        UserInfo storage info = userInfo[pid][user];
        uint256 acc           = pool.accRewardPerShare;

        if (block.number > pool.lastRewardBlock && pool.active) {
            uint256 lpSupply = pool.lpToken.balanceOf(address(this));
            if (lpSupply > 0 && totalAllocPoint > 0) {
                uint256 blocks  = block.number - pool.lastRewardBlock;
                uint256 reward  = (blocks * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
                acc            += (reward * 1e12) / lpSupply;
            }
        }

        return (info.amount * acc) / 1e12 - info.rewardDebt;
    }

    function massUpdatePools() public {
        for (uint256 i = 0; i < pools.length; i++) {
            _updatePool(i);
        }
    }

    function _updatePool(uint256 pid) internal {
        PoolInfo storage pool = pools[pid];
        if (block.number <= pool.lastRewardBlock || !pool.active) return;

        uint256 lpSupply = pool.lpToken.balanceOf(address(this));
        if (lpSupply == 0 || totalAllocPoint == 0) {
            pool.lastRewardBlock = block.number;
            return;
        }

        uint256 blocks             = block.number - pool.lastRewardBlock;
        uint256 reward             = (blocks * rewardPerBlock * pool.allocPoint) / totalAllocPoint;
        pool.accRewardPerShare    += (reward * 1e12) / lpSupply;
        pool.lastRewardBlock       = block.number;
    }

    // ─────────────────────────────────────────────────────────────
    // User interactions
    // ─────────────────────────────────────────────────────────────

    function deposit(uint256 pid, uint256 amount) external nonReentrant whenNotPaused {
        require(pools[pid].active, "StakingVault: pool not active");
        _updatePool(pid);

        PoolInfo storage pool = pools[pid];
        UserInfo storage info = userInfo[pid][msg.sender];

        // Harvest before depositing more
        if (info.amount > 0) {
            uint256 pending = (info.amount * pool.accRewardPerShare) / 1e12 - info.rewardDebt;
            if (pending > 0) _safeRewardTransfer(msg.sender, pending);
        }

        if (amount > 0) {
            uint256 before = pool.lpToken.balanceOf(address(this));
            pool.lpToken.safeTransferFrom(msg.sender, address(this), amount);
            uint256 received = pool.lpToken.balanceOf(address(this)) - before; // handles fee-on-transfer

            if (pool.depositFee > 0) {
                uint256 fee = (received * pool.depositFee) / 10000;
                pool.lpToken.safeTransfer(feeCollector, fee);
                received -= fee;
            }

            info.amount += received;
        }

        info.rewardDebt = (info.amount * pool.accRewardPerShare) / 1e12;
        emit Deposit(msg.sender, pid, amount);
    }

    function withdraw(uint256 pid, uint256 amount) external nonReentrant {
        PoolInfo storage pool = pools[pid];
        UserInfo storage info = userInfo[pid][msg.sender];
        require(info.amount >= amount, "StakingVault: insufficient balance");

        _updatePool(pid);

        uint256 pending = (info.amount * pool.accRewardPerShare) / 1e12 - info.rewardDebt;
        if (pending > 0) _safeRewardTransfer(msg.sender, pending);

        if (amount > 0) {
            info.amount -= amount;
            pool.lpToken.safeTransfer(msg.sender, amount);
        }

        info.rewardDebt = (info.amount * pool.accRewardPerShare) / 1e12;
        emit Withdraw(msg.sender, pid, amount);
    }

    function harvest(uint256 pid) external nonReentrant {
        _updatePool(pid);
        PoolInfo storage pool = pools[pid];
        UserInfo storage info = userInfo[pid][msg.sender];

        uint256 pending = (info.amount * pool.accRewardPerShare) / 1e12 - info.rewardDebt;
        require(pending > 0, "StakingVault: nothing to harvest");

        info.totalClaimed += pending;
        _safeRewardTransfer(msg.sender, pending);
        info.rewardDebt    = (info.amount * pool.accRewardPerShare) / 1e12;

        emit Harvest(msg.sender, pid, pending);
    }

    // Emergency withdraw without caring about rewards
    function emergencyWithdraw(uint256 pid) external nonReentrant {
        PoolInfo storage pool = pools[pid];
        UserInfo storage info = userInfo[pid][msg.sender];
        uint256 amount        = info.amount;

        info.amount    = 0;
        info.rewardDebt = 0;

        pool.lpToken.safeTransfer(msg.sender, amount);
        emit EmergencyWithdraw(msg.sender, pid, amount);
    }

    // ─────────────────────────────────────────────────────────────
    // Admin
    // ─────────────────────────────────────────────────────────────

    function setRewardPerBlock(uint256 newRate) external onlyOwner {
        massUpdatePools();
        rewardPerBlock = newRate;
        emit RewardRateUpdated(newRate);
    }

    function setFeeCollector(address newCollector) external onlyOwner {
        feeCollector = newCollector;
    }

    function pause()   external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    function _safeRewardTransfer(address to, uint256 amount) internal {
        uint256 bal = rewardToken.balanceOf(address(this));
        rewardToken.safeTransfer(to, amount > bal ? bal : amount);
    }
}
