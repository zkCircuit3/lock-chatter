import { Contract } from 'ethers';
import { encryptMessage, encryptBoolean, encryptAmount } from './fhe-utils';

export interface ChatRoom {
  roomId: number;
  name: string;
  description: string;
  creator: string;
  isPrivate: boolean;
  isActive: boolean;
  memberCount: number;
  messageCount: number;
  createdAt: number;
}

export interface ChatMessage {
  messageId: number;
  roomId: number;
  sender: string;
  encryptedContent: string;
  isEncrypted: boolean;
  timestamp: number;
}

export interface UserProfile {
  userId: number;
  username: string;
  isActive: boolean;
  messageCount: number;
  reputation: number;
  joinedAt: number;
}

export class LockChatterContract {
  private contract: Contract;
  private contractAddress: string;

  constructor(contract: Contract, contractAddress: string) {
    this.contract = contract;
    this.contractAddress = contractAddress;
  }

  async createChatRoom(
    name: string,
    description: string,
    isPrivate: boolean
  ): Promise<number> {
    try {
      const { encryptedData, inputProof } = await encryptBoolean(
        isPrivate,
        this.contractAddress,
        await this.contract.signer.getAddress()
      );

      const tx = await this.contract.createChatRoom(
        name,
        description,
        encryptedData,
        inputProof
      );

      const receipt = await tx.wait();
      const event = receipt.events?.find((e: any) => e.event === 'RoomCreated');
      return event?.args?.roomId?.toNumber() || 0;
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw error;
    }
  }

  async sendMessage(
    roomId: number,
    message: string,
    isEncrypted: boolean = true
  ): Promise<number> {
    try {
      const { encryptedData, inputProof } = await encryptMessage(
        message,
        this.contractAddress,
        await this.contract.signer.getAddress()
      );

      const { encryptedData: encryptedFlag, inputProof: flagProof } = await encryptBoolean(
        isEncrypted,
        this.contractAddress,
        await this.contract.signer.getAddress()
      );

      const tx = await this.contract.sendMessage(
        roomId,
        encryptedData,
        encryptedFlag,
        inputProof
      );

      const receipt = await tx.wait();
      const event = receipt.events?.find((e: any) => e.event === 'MessageSent');
      return event?.args?.messageId?.toNumber() || 0;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  async joinRoom(roomId: number): Promise<boolean> {
    try {
      const tx = await this.contract.joinRoom(roomId);
      await tx.wait();
      return true;
    } catch (error) {
      console.error('Error joining room:', error);
      return false;
    }
  }

  async leaveRoom(roomId: number): Promise<void> {
    try {
      const tx = await this.contract.leaveRoom(roomId);
      await tx.wait();
    } catch (error) {
      console.error('Error leaving room:', error);
      throw error;
    }
  }

  async createUserProfile(username: string): Promise<void> {
    try {
      const tx = await this.contract.createUserProfile(username);
      await tx.wait();
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  }

  async getRoomInfo(roomId: number): Promise<ChatRoom> {
    try {
      const [name, description, creator, createdAt] = await this.contract.getRoomInfo(roomId);
      
      return {
        roomId,
        name,
        description,
        creator,
        isPrivate: false, // Will be decrypted separately
        isActive: true, // Will be decrypted separately
        memberCount: 0, // Will be decrypted separately
        messageCount: 0, // Will be decrypted separately
        createdAt: createdAt.toNumber(),
      };
    } catch (error) {
      console.error('Error getting room info:', error);
      throw error;
    }
  }

  async getUserProfile(userAddress: string): Promise<UserProfile> {
    try {
      const [username, joinedAt] = await this.contract.getUserProfile(userAddress);
      
      return {
        userId: 0, // Will be decrypted separately
        username,
        isActive: true, // Will be decrypted separately
        messageCount: 0, // Will be decrypted separately
        reputation: 100, // Will be decrypted separately
        joinedAt: joinedAt.toNumber(),
      };
    } catch (error) {
      console.error('Error getting user profile:', error);
      throw error;
    }
  }

  async updateReputation(userAddress: string, reputationChange: number): Promise<void> {
    try {
      const { encryptedData, inputProof } = await encryptAmount(
        reputationChange,
        this.contractAddress,
        await this.contract.signer.getAddress()
      );

      const tx = await this.contract.updateReputation(
        userAddress,
        encryptedData,
        inputProof
      );
      await tx.wait();
    } catch (error) {
      console.error('Error updating reputation:', error);
      throw error;
    }
  }

  async deactivateRoom(roomId: number): Promise<void> {
    try {
      const tx = await this.contract.deactivateRoom(roomId);
      await tx.wait();
    } catch (error) {
      console.error('Error deactivating room:', error);
      throw error;
    }
  }

  // Event listeners
  onRoomCreated(callback: (roomId: number, creator: string, name: string) => void) {
    this.contract.on('RoomCreated', callback);
  }

  onMessageSent(callback: (messageId: number, roomId: number, sender: string) => void) {
    this.contract.on('MessageSent', callback);
  }

  onUserJoined(callback: (roomId: number, user: string) => void) {
    this.contract.on('UserJoined', callback);
  }

  onUserLeft(callback: (roomId: number, user: string) => void) {
    this.contract.on('UserLeft', callback);
  }

  onReputationUpdated(callback: (user: string, reputation: number) => void) {
    this.contract.on('ReputationUpdated', callback);
  }

  // Remove all listeners
  removeAllListeners() {
    this.contract.removeAllListeners();
  }
}
