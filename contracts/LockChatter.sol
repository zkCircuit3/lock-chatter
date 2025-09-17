// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract LockChatter is SepoliaConfig {
    using FHE for *;
    
    struct ChatRoom {
        euint32 roomId;
        string name;
        string description;
        address creator;
        ebool isPrivate;
        ebool isActive;
        euint32 memberCount;
        euint32 messageCount;
        uint256 createdAt;
    }
    
    struct ChatMessage {
        euint32 messageId;
        euint32 roomId;
        address sender;
        externalEuint32 encryptedContent;
        ebool isEncrypted;
        uint256 timestamp;
    }
    
    struct UserProfile {
        euint32 userId;
        string username;
        ebool isActive;
        euint32 messageCount;
        euint32 reputation;
        uint256 joinedAt;
    }
    
    mapping(uint256 => ChatRoom) public chatRooms;
    mapping(uint256 => ChatMessage) public messages;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => mapping(uint256 => ebool)) public roomMemberships;
    mapping(address => euint32) public userReputation;
    
    uint256 public roomCounter;
    uint256 public messageCounter;
    uint256 public userCounter;
    
    address public owner;
    address public moderator;
    
    event RoomCreated(uint256 indexed roomId, address indexed creator, string name);
    event MessageSent(uint256 indexed messageId, uint256 indexed roomId, address indexed sender);
    event UserJoined(uint256 indexed roomId, address indexed user);
    event UserLeft(uint256 indexed roomId, address indexed user);
    event ReputationUpdated(address indexed user, uint32 reputation);
    event RoomDeactivated(uint256 indexed roomId);
    
    constructor(address _moderator) {
        owner = msg.sender;
        moderator = _moderator;
    }
    
    function createChatRoom(
        string memory _name,
        string memory _description,
        externalEuint32 isPrivate,
        bytes calldata inputProof
    ) public returns (uint256) {
        uint256 roomId = roomCounter++;
        
        // Convert externalEuint32 to ebool
        ebool privateRoom = FHE.fromExternal(isPrivate, inputProof);
        
        chatRooms[roomId] = ChatRoom({
            roomId: FHE.asEuint32(roomId),
            name: _name,
            description: _description,
            creator: msg.sender,
            isPrivate: privateRoom,
            isActive: FHE.asEbool(true),
            memberCount: FHE.asEuint32(1),
            messageCount: FHE.asEuint32(0),
            createdAt: block.timestamp
        });
        
        // Add creator as member
        roomMemberships[msg.sender][roomId] = FHE.asEbool(true);
        
        emit RoomCreated(roomId, msg.sender, _name);
        return roomId;
    }
    
    function sendMessage(
        uint256 roomId,
        externalEuint32 encryptedContent,
        externalEuint32 isEncrypted,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(chatRooms[roomId].creator != address(0), "Room does not exist");
        
        // Check if user is member of the room
        ebool isMember = roomMemberships[msg.sender][roomId];
        require(FHE.decrypt(isMember), "User is not a member of this room");
        
        uint256 messageId = messageCounter++;
        
        // Convert external values to internal FHE types
        euint32 internalContent = FHE.fromExternal(encryptedContent, inputProof);
        ebool internalEncrypted = FHE.fromExternal(isEncrypted, inputProof);
        
        messages[messageId] = ChatMessage({
            messageId: FHE.asEuint32(messageId),
            roomId: FHE.asEuint32(roomId),
            sender: msg.sender,
            encryptedContent: encryptedContent,
            isEncrypted: internalEncrypted,
            timestamp: block.timestamp
        });
        
        // Update room message count
        chatRooms[roomId].messageCount = FHE.add(chatRooms[roomId].messageCount, FHE.asEuint32(1));
        
        // Update user message count
        if (userProfiles[msg.sender].creator != address(0)) {
            userProfiles[msg.sender].messageCount = FHE.add(userProfiles[msg.sender].messageCount, FHE.asEuint32(1));
        }
        
        emit MessageSent(messageId, roomId, msg.sender);
        return messageId;
    }
    
    function joinRoom(uint256 roomId) public returns (bool) {
        require(chatRooms[roomId].creator != address(0), "Room does not exist");
        
        // Check if room is private
        ebool isPrivate = chatRooms[roomId].isPrivate;
        if (FHE.decrypt(isPrivate)) {
            // For private rooms, only allow if user is invited (simplified for demo)
            // In production, implement proper invitation system
            return false;
        }
        
        // Add user to room
        roomMemberships[msg.sender][roomId] = FHE.asEbool(true);
        
        // Update member count
        chatRooms[roomId].memberCount = FHE.add(chatRooms[roomId].memberCount, FHE.asEuint32(1));
        
        emit UserJoined(roomId, msg.sender);
        return true;
    }
    
    function leaveRoom(uint256 roomId) public {
        require(chatRooms[roomId].creator != address(0), "Room does not exist");
        
        // Remove user from room
        roomMemberships[msg.sender][roomId] = FHE.asEbool(false);
        
        // Update member count
        chatRooms[roomId].memberCount = FHE.sub(chatRooms[roomId].memberCount, FHE.asEuint32(1));
        
        emit UserLeft(roomId, msg.sender);
    }
    
    function createUserProfile(string memory _username) public {
        require(userProfiles[msg.sender].creator == address(0), "Profile already exists");
        
        uint256 userId = userCounter++;
        
        userProfiles[msg.sender] = UserProfile({
            userId: FHE.asEuint32(userId),
            username: _username,
            isActive: FHE.asEbool(true),
            messageCount: FHE.asEuint32(0),
            reputation: FHE.asEuint32(100), // Starting reputation
            joinedAt: block.timestamp
        });
        
        userReputation[msg.sender] = FHE.asEuint32(100);
    }
    
    function updateReputation(address user, externalEuint32 reputationChange, bytes calldata inputProof) public {
        require(msg.sender == moderator || msg.sender == owner, "Only moderator or owner can update reputation");
        
        euint32 change = FHE.fromExternal(reputationChange, inputProof);
        userReputation[user] = FHE.add(userReputation[user], change);
        
        if (userProfiles[user].creator != address(0)) {
            userProfiles[user].reputation = FHE.add(userProfiles[user].reputation, change);
        }
        
        emit ReputationUpdated(user, 0); // Amount will be decrypted off-chain
    }
    
    function deactivateRoom(uint256 roomId) public {
        require(msg.sender == chatRooms[roomId].creator || msg.sender == moderator || msg.sender == owner, "Not authorized");
        
        chatRooms[roomId].isActive = FHE.asEbool(false);
        
        emit RoomDeactivated(roomId);
    }
    
    function getRoomInfo(uint256 roomId) public view returns (
        string memory name,
        string memory description,
        address creator,
        uint256 createdAt
    ) {
        require(chatRooms[roomId].creator != address(0), "Room does not exist");
        
        return (
            chatRooms[roomId].name,
            chatRooms[roomId].description,
            chatRooms[roomId].creator,
            chatRooms[roomId].createdAt
        );
    }
    
    function getUserProfile(address user) public view returns (
        string memory username,
        uint256 joinedAt
    ) {
        require(userProfiles[user].creator != address(0), "Profile does not exist");
        
        return (
            userProfiles[user].username,
            userProfiles[user].joinedAt
        );
    }
    
    // Admin functions
    function setModerator(address _moderator) public {
        require(msg.sender == owner, "Only owner can set moderator");
        moderator = _moderator;
    }
    
    function transferOwnership(address newOwner) public {
        require(msg.sender == owner, "Only owner can transfer ownership");
        owner = newOwner;
    }
}
