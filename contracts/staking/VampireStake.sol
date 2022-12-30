// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

import "../interfaces/IVampireStake.sol";
import "../tokens/VampireStakeToken.sol";
import "../tokens/VampireBloodToken.sol";

contract VampireStake is
    IVampireStake,
    Initializable,
    UUPSUpgradeable,
    PausableUpgradeable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable
{
    using SafeERC20Upgradeable for VampireStakeToken;
    using SafeERC20Upgradeable for VampireBloodToken;

    /// @dev STAKE Token address
    VampireStakeToken public stakeToken;
    /// @dev BLOOD Token address
    VampireBloodToken public bloodToken;

    /* ========== ACCESS ROLES ========== */

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    /* ========== STATE VARIABLES ========== */

    /// @dev total staked in contract
    uint256 private _totalStakesEmbedded;
    /// @dev reward duration
    uint256 public huntDuration;
    /// @dev reward period end
    uint256 public huntOver;
    /// @dev last updated at
    uint256 public checkSurroundings;
    /// @dev reward rate p/sec
    uint256 public bleedRate;
    /// @dev reward p/token
    uint256 public bloodPerStake;

    /* ========== MAPPINGS ========== */

    mapping(address => uint256) private _hunterStakesEmbedded;
    mapping(address => uint256) public hunterBloodPerStake;
    mapping(address => uint256) public hunterBloodCollected;

    /* ========== EVENTS ========== */

    /// @notice emitted on reward BLOOD tokens deposited
    /// @param message operation message
    /// @param blood reward amount
    event BloodAdded(string message, uint256 blood);
    /// @notice emitted on staking STAKE tokens
    /// @param message operation message
    /// @param hunter address of staker
    /// @param stakes stake amount
    event StakeEmbedded(string message, address hunter, uint256 stakes);
    /// @notice emitted on withdrawing stake tokens
    /// @param message operation message
    /// @param hunter address of staker
    /// @param stakes withdraw amount
    event StakeWithdrawn(string message, address hunter, uint256 stakes);
    /// @notice emitted on withdrawing BLOOD reward
    /// @param message operation message
    /// @param hunter address of staker
    /// @param blood reward amount
    event BloodCollected(string message, address hunter, uint256 blood);

    /* ========== MODIFIERS ========== */

    modifier monitorVitals(address _hunter) {
        bloodPerStake = bloodPerStakeEmbedded();
        checkSurroundings = checkOverShoulder();

        if (_hunter != address(0)) {
            hunterBloodCollected[_hunter] = bloodCollected(_hunter);
            hunterBloodPerStake[_hunter] = bloodPerStake;
        }
        _;
    }

    /* ========== INITIALIZER ========== */

    /// @notice initializes contract
    /// @dev sets contract access control
    /// @param _stakeToken contract address of STAKE token
    /// @param _bloodToken contract address of BLOOD token
    function initialize(address _stakeToken, address _bloodToken)
        public
        initializer
    {
        require(
            _stakeToken != address(0),
            "VampireStake:: STAKE token cannot be address(0)"
        );
        require(
            _bloodToken != address(0),
            "VampireStake:: BLOOD token cannot be address(0)"
        );

        __AccessControl_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);

        stakeToken = VampireStakeToken(_stakeToken);
        bloodToken = VampireBloodToken(_bloodToken);
    }

    /* ========== VIEWS ========== */

    /// @notice returns total staked tokens in contract
    function totalStakesEmbedded() external view returns (uint256) {
        return _totalStakesEmbedded;
    }

    /// @notice returns staked balance of account
    /// @param _hunter address of staker
    function hunterStakesEmbedded(address _hunter)
        external
        view
        returns (uint256)
    {
        return _hunterStakesEmbedded[_hunter];
    }

    /// @notice returns minimum of block.timestamp and huntOver
    function checkOverShoulder() public view returns (uint256) {
        return _min(block.timestamp, huntOver);
    }

    /// @notice returns BLOOD reward per token
    function bloodPerStakeEmbedded() public view returns (uint256) {
        if (_totalStakesEmbedded == 0) {
            return bloodPerStake;
        }
        return
            bloodPerStake +
            (bleedRate * (checkOverShoulder() - checkSurroundings) * 1e18) /
            _totalStakesEmbedded;
    }

    /// @notice returns total earned BLOOD reward amount by account
    /// @param _hunter address of staker
    function bloodCollected(address _hunter) public view returns (uint256) {
        return
            (_hunterStakesEmbedded[_hunter] *
                (bloodPerStakeEmbedded() - hunterBloodPerStake[_hunter])) /
            1e18 +
            hunterBloodCollected[_hunter];
    }

    /* ========== MUTATIVE FUNCTIONS ========== */

    /// @notice allows users to stake tokens
    /// @dev reverts if _stakeAmount = 0
    /// @dev emits StakedEmbedded event
    /// @dev allowed when not paused
    /// @param _stakeAmount amount of STAKE tokens to stake
    function embedStake(uint256 _stakeAmount)
        external
        whenNotPaused
        nonReentrant
        monitorVitals(msg.sender)
    {
        require(
            _stakeAmount > 0,
            "VampireStake:: STAKE amount must be greater than zero"
        );
        stakeToken.safeTransferFrom(msg.sender, address(this), _stakeAmount);
        _hunterStakesEmbedded[msg.sender] += _stakeAmount;
        _totalStakesEmbedded += _stakeAmount;
        emit StakeEmbedded(
            "VampireStake:: STAKE embedded",
            msg.sender,
            _stakeAmount
        );
    }

    /// @notice allows users to withdraw stake
    /// @dev reverts if _stakeAmount = 0
    /// @dev emits StakeWithdrawn event
    /// @dev allowed when not paused
    /// @param _stakeAmount amount of user stake to withdraw
    function withdrawStake(uint256 _stakeAmount)
        public
        whenNotPaused
        nonReentrant
        monitorVitals(msg.sender)
    {
        require(
            _stakeAmount > 0,
            "VampireStake:: Withdraw amount must be greater than zero"
        );
        _hunterStakesEmbedded[msg.sender] -= _stakeAmount;
        _totalStakesEmbedded -= _stakeAmount;
        stakeToken.safeTransfer(msg.sender, _stakeAmount);
        emit StakeWithdrawn(
            "VampireStake:: Stake withdrawn",
            msg.sender,
            _stakeAmount
        );
    }

    /// @notice allows users to withdraw BLOOD rewards earned
    /// @dev reverts if no rewards to claim
    /// @dev emits BloodCollected event
    function collectBlood() public monitorVitals(msg.sender) {
        uint256 reward = hunterBloodCollected[msg.sender];

        require(
            reward > 0,
            "VampireStake:: BLOOD amount must be greater than zero"
        );

        hunterBloodCollected[msg.sender] = 0;
        bloodToken.safeTransfer(msg.sender, reward);

        emit BloodCollected(
            "VampireStake:: Rewards withdrawn",
            msg.sender,
            reward
        );
    }

    /// @notice withdraws stake and rewards
    function runAway() external {
        withdrawStake(_hunterStakesEmbedded[msg.sender]);
        collectBlood();
    }

    /* ========== RESTRICTED FUNCTIONS ========== */

    /// @notice pause contract
    /// @dev only callable by ADMIN_ROLE

    function pause() public onlyRole(ADMIN_ROLE) {
        _pause();
    }

    /// @notice unpause contract
    /// @dev only callable by ADMIN_ROLE

    function unpause() public onlyRole(ADMIN_ROLE) {
        _unpause();
    }

    /// @notice set hunt duration for contract
    /// @dev only callable by ADMIN_ROLE
    /// @param _huntDuration hunt duration

    function setHuntDuration(uint256 _huntDuration)
        external
        onlyRole(ADMIN_ROLE)
    {
        require(
            huntOver < block.timestamp,
            "VampireStake:: Current hunt is not over"
        );
        huntDuration = _huntDuration;
    }

    /// @notice sets BLOOD reward rate (p/sec) based on desposited BLOOD and hunt duration set
    /// @dev revert if _amount = 0 or _amount > BLOOD balance of contract
    /// @dev only callable by ADMIN_ROLE
    /// @param _bloodAmount BLOOD deposited into contract to calculate bleed rate from
    function notifyBloodAmount(uint256 _bloodAmount)
        external
        onlyRole(ADMIN_ROLE)
        monitorVitals(address(0))
    {
        if (block.timestamp > huntOver) {
            bleedRate = _bloodAmount / huntDuration;
        } else {
            uint256 remainingBlood = bleedRate * (huntOver - block.timestamp);
            bleedRate = (remainingBlood + _bloodAmount) / huntDuration;
        }
        require(
            bleedRate > 0,
            "VampireStake:: Bleed rate should be greater than zero"
        );
        require(
            (bleedRate * huntDuration) <= bloodToken.balanceOf(address(this)),
            "VampireStake:: BLOOD amount should be less than BLOOD balance"
        );

        huntOver = block.timestamp + huntDuration;
        checkSurroundings = block.timestamp;

        emit BloodAdded("VampireStake:: BLOOD added", _bloodAmount);
    }

    /// @notice updates STAKE token contract
    /// @dev reverts if new STAKE token address(0)
    /// @dev only callable by ADMIN_ROLE
    /// @param _stakeToken new staking token contract address
    function updateStakeToken(address _stakeToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        require(
            _stakeToken != address(0),
            "VampireStake:: STAKE token cannot be address(0)"
        );

        stakeToken = VampireStakeToken(_stakeToken);
    }

    /// @notice updates BLOOD token contract
    /// @dev reverts if new BLOOD token address(0)
    /// @dev only callable by ADMIN_ROLE
    /// @param _bloodToken new BLOOD token contract address
    function updateBloodToken(address _bloodToken)
        external
        onlyRole(ADMIN_ROLE)
    {
        require(
            _bloodToken != address(0),
            "VampireStake:: BLOOD token cannot be address(0)"
        );
        bloodToken = VampireBloodToken(_bloodToken);
    }

    /* ========== INTERNAL FUNCTIONS ========== */

    /// @notice authorise contract upgrade
    /// @dev only callable by ADMIN_ROLE
    /// @param _newImplementation new implementation contract address

    function _authorizeUpgrade(address _newImplementation)
        internal
        override
        onlyRole(ADMIN_ROLE)
    {}

    /// @notice returns minimum of two numbers
    function _min(uint256 _x, uint256 _y) private pure returns (uint256) {
        return _x <= _y ? _x : _y;
    }
}
