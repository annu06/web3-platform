// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title MultiSigWallet
 * @notice N-of-M multisig treasury. Used by the DAO for off-chain treasury management
 *         and emergency actions that bypass the governor when speed matters.
 *         Supports ETH and ERC-20 token transactions.
 */
contract MultiSigWallet {
    // ---- Events ----
    event OwnerAdded(address indexed owner);
    event OwnerRemoved(address indexed owner);
    event RequirementChanged(uint256 required);
    event Deposit(address indexed sender, uint256 amount);
    event TransactionSubmitted(uint256 indexed txId, address indexed submitter);
    event TransactionConfirmed(uint256 indexed txId, address indexed confirmer);
    event ConfirmationRevoked(uint256 indexed txId, address indexed revoker);
    event TransactionExecuted(uint256 indexed txId);
    event TransactionFailed(uint256 indexed txId);

    // ---- State ----
    struct Transaction {
        address to;
        uint256 value;
        bytes   data;
        bool    executed;
        uint256 numConfirmations;
        string  description;
    }

    address[] public owners;
    mapping(address => bool) public isOwner;
    uint256 public required;

    Transaction[] public transactions;
    mapping(uint256 => mapping(address => bool)) public confirmed;

    // ---- Modifiers ----
    modifier onlyOwner() {
        require(isOwner[msg.sender], "MultiSig: not owner");
        _;
    }

    modifier txExists(uint256 txId) {
        require(txId < transactions.length, "MultiSig: tx not found");
        _;
    }

    modifier notExecuted(uint256 txId) {
        require(!transactions[txId].executed, "MultiSig: already executed");
        _;
    }

    modifier notConfirmed(uint256 txId) {
        require(!confirmed[txId][msg.sender], "MultiSig: already confirmed");
        _;
    }

    // ─────────────────────────────────────────────────────────────
    // Constructor
    // ─────────────────────────────────────────────────────────────

    constructor(address[] memory _owners, uint256 _required) {
        require(_owners.length >= 2, "MultiSig: need >= 2 owners");
        require(_required >= 1 && _required <= _owners.length, "MultiSig: invalid required");

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            require(owner != address(0), "MultiSig: zero address");
            require(!isOwner[owner], "MultiSig: duplicate owner");
            isOwner[owner] = true;
            owners.push(owner);
            emit OwnerAdded(owner);
        }

        required = _required;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    // ─────────────────────────────────────────────────────────────
    // Transaction lifecycle
    // ─────────────────────────────────────────────────────────────

    function submit(
        address to,
        uint256 value,
        bytes calldata data,
        string calldata description
    ) external onlyOwner returns (uint256 txId) {
        txId = transactions.length;
        transactions.push(Transaction({
            to:               to,
            value:            value,
            data:             data,
            executed:         false,
            numConfirmations: 0,
            description:      description
        }));
        emit TransactionSubmitted(txId, msg.sender);
    }

    function confirm(uint256 txId)
        external
        onlyOwner
        txExists(txId)
        notExecuted(txId)
        notConfirmed(txId)
    {
        transactions[txId].numConfirmations++;
        confirmed[txId][msg.sender] = true;
        emit TransactionConfirmed(txId, msg.sender);
    }

    function revoke(uint256 txId)
        external
        onlyOwner
        txExists(txId)
        notExecuted(txId)
    {
        require(confirmed[txId][msg.sender], "MultiSig: not confirmed");
        transactions[txId].numConfirmations--;
        confirmed[txId][msg.sender] = false;
        emit ConfirmationRevoked(txId, msg.sender);
    }

    function execute(uint256 txId)
        external
        onlyOwner
        txExists(txId)
        notExecuted(txId)
    {
        Transaction storage tx_ = transactions[txId];
        require(tx_.numConfirmations >= required, "MultiSig: not enough confirmations");

        tx_.executed = true;
        (bool success, ) = tx_.to.call{ value: tx_.value }(tx_.data);

        if (success) {
            emit TransactionExecuted(txId);
        } else {
            tx_.executed = false;
            emit TransactionFailed(txId);
        }
    }

    // ─────────────────────────────────────────────────────────────
    // Owner management (requires multisig itself to call)
    // ─────────────────────────────────────────────────────────────

    modifier onlySelf() {
        require(msg.sender == address(this), "MultiSig: only via multisig");
        _;
    }

    function addOwner(address newOwner) external onlySelf {
        require(!isOwner[newOwner], "MultiSig: already owner");
        isOwner[newOwner] = true;
        owners.push(newOwner);
        emit OwnerAdded(newOwner);
    }

    function removeOwner(address owner) external onlySelf {
        require(isOwner[owner], "MultiSig: not owner");
        require(owners.length - 1 >= required, "MultiSig: would break quorum");
        isOwner[owner] = false;
        for (uint256 i = 0; i < owners.length; i++) {
            if (owners[i] == owner) {
                owners[i] = owners[owners.length - 1];
                owners.pop();
                break;
            }
        }
        emit OwnerRemoved(owner);
    }

    function changeRequirement(uint256 newRequired) external onlySelf {
        require(newRequired >= 1 && newRequired <= owners.length, "MultiSig: invalid required");
        required = newRequired;
        emit RequirementChanged(newRequired);
    }

    // ─────────────────────────────────────────────────────────────
    // Views
    // ─────────────────────────────────────────────────────────────

    function getOwners() external view returns (address[] memory) { return owners; }
    function getTransactionCount() external view returns (uint256) { return transactions.length; }

    function getTransaction(uint256 txId) external view returns (
        address to, uint256 value, bytes memory data,
        bool executed, uint256 numConfirmations, string memory description
    ) {
        Transaction storage t = transactions[txId];
        return (t.to, t.value, t.data, t.executed, t.numConfirmations, t.description);
    }

    function isConfirmedBy(uint256 txId, address owner) external view returns (bool) {
        return confirmed[txId][owner];
    }
}
