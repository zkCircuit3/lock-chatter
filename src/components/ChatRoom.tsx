import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  MessageCircle, 
  Users, 
  Lock, 
  Send, 
  Plus,
  Settings,
  Shield,
  User,
  CheckCircle
} from 'lucide-react';
import { LockChatterContract, ChatRoom, ChatMessage } from '../lib/contract';

interface ChatRoomProps {
  contract: LockChatterContract | null;
}

export function ChatRoomComponent({ contract }: ChatRoomProps) {
  const { address } = useAccount();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [newRoomDescription, setNewRoomDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (contract) {
      loadRooms();
    }
  }, [contract]);

  const loadRooms = async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      // In a real implementation, you would fetch rooms from the contract
      // For now, we'll use mock data
      const mockRooms: ChatRoom[] = [
        {
          roomId: 1,
          name: 'General Chat',
          description: 'Public discussion room',
          creator: '0x123...',
          isPrivate: false,
          isActive: true,
          memberCount: 15,
          messageCount: 42,
          createdAt: Date.now() - 86400000,
        },
        {
          roomId: 2,
          name: 'Private Discussion',
          description: 'Encrypted private room',
          creator: '0x456...',
          isPrivate: true,
          isActive: true,
          memberCount: 5,
          messageCount: 18,
          createdAt: Date.now() - 172800000,
        },
      ];
      setRooms(mockRooms);
    } catch (error) {
      console.error('Error loading rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const createRoom = async () => {
    if (!newRoomName.trim()) return;
    
    setLoading(true);
    try {
      if (contract) {
        // Real contract interaction
        const roomId = await contract.createChatRoom(
          newRoomName,
          newRoomDescription,
          isPrivate
        );
        
        // Refresh rooms list
        await loadRooms();
      } else {
        // Mock room creation for demo purposes
        const newRoom: ChatRoom = {
          roomId: Date.now(), // Use timestamp as mock ID
          name: newRoomName,
          description: newRoomDescription,
          creator: address || '0x000...',
          isPrivate,
          isActive: true,
          memberCount: 1,
          messageCount: 0,
          createdAt: Date.now(),
        };
        
        // Add to rooms list
        setRooms(prev => [...prev, newRoom]);
      }
      
      // Reset form
      setNewRoomName('');
      setNewRoomDescription('');
      setIsPrivate(false);
      setShowCreateRoom(false);
      
      // Show success message
      setSuccessMessage(`Room "${newRoomName}" created successfully!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinRoom = async (roomId: number) => {
    try {
      if (contract) {
        // Real contract interaction
        const success = await contract.joinRoom(roomId);
        if (success) {
          // Refresh rooms list
          await loadRooms();
        }
      } else {
        // Mock room joining for demo purposes
        setRooms(prev => prev.map(room => 
          room.roomId === roomId 
            ? { ...room, memberCount: room.memberCount + 1 }
            : room
        ));
        
        // Select the joined room
        const joinedRoom = rooms.find(room => room.roomId === roomId);
        if (joinedRoom) {
          setSelectedRoom(joinedRoom);
        }
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const sendMessage = async () => {
    if (!selectedRoom || !newMessage.trim()) return;
    
    setLoading(true);
    try {
      if (contract) {
        // Real contract interaction
        await contract.sendMessage(selectedRoom.roomId, newMessage, true);
        setNewMessage('');
        
        // Refresh messages
        loadMessages(selectedRoom.roomId);
      } else {
        // Mock message sending for demo purposes
        const newMsg: ChatMessage = {
          messageId: Date.now(),
          roomId: selectedRoom.roomId,
          sender: address || '0x000...',
          encryptedContent: newMessage,
          isEncrypted: true,
          timestamp: Date.now(),
        };
        
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');
        
        // Update room message count
        setRooms(prev => prev.map(room => 
          room.roomId === selectedRoom.roomId 
            ? { ...room, messageCount: room.messageCount + 1 }
            : room
        ));
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (roomId: number) => {
    try {
      if (contract) {
        // In a real implementation, you would fetch messages from the contract
        // For now, we'll use mock data
        const mockMessages: ChatMessage[] = [
          {
            messageId: 1,
            roomId,
            sender: '0x123...',
            encryptedContent: 'Hello everyone!',
            isEncrypted: true,
            timestamp: Date.now() - 3600000,
          },
          {
            messageId: 2,
            roomId,
            sender: '0x456...',
            encryptedContent: 'This is an encrypted message',
            isEncrypted: true,
            timestamp: Date.now() - 1800000,
          },
        ];
        setMessages(mockMessages);
      } else {
        // Mock messages for demo purposes
        const mockMessages: ChatMessage[] = [
          {
            messageId: 1,
            roomId,
            sender: '0x123...',
            encryptedContent: 'Welcome to the chat room!',
            isEncrypted: true,
            timestamp: Date.now() - 3600000,
          },
          {
            messageId: 2,
            roomId,
            sender: '0x456...',
            encryptedContent: 'This is a demo message with FHE encryption',
            isEncrypted: true,
            timestamp: Date.now() - 1800000,
          },
        ];
        setMessages(mockMessages);
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const selectRoom = (room: ChatRoom) => {
    setSelectedRoom(room);
    loadMessages(room.roomId);
  };

  return (
    <div className="flex h-[600px] border rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-1/3 border-r bg-muted/50">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Chat Rooms
            </h2>
            <Button
              size="sm"
              onClick={() => setShowCreateRoom(!showCreateRoom)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {showCreateRoom && (
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Create New Room</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  placeholder="Room name"
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                />
                <Textarea
                  placeholder="Room description"
                  value={newRoomDescription}
                  onChange={(e) => setNewRoomDescription(e.target.value)}
                  rows={2}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="private"
                    checked={isPrivate}
                    onChange={(e) => setIsPrivate(e.target.checked)}
                  />
                  <label htmlFor="private" className="text-sm">
                    Private room
                  </label>
                </div>
                <Button
                  size="sm"
                  onClick={createRoom}
                  disabled={loading || !newRoomName.trim()}
                  className="w-full"
                >
                  {loading ? 'Creating...' : 'Create Room'}
                </Button>
              </CardContent>
            </Card>
          )}
          
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-200 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800">{successMessage}</span>
            </div>
          )}
        </div>
        
        <ScrollArea className="h-[500px]">
          <div className="p-2 space-y-2">
            {rooms.map((room) => (
              <Card
                key={room.roomId}
                className={`cursor-pointer transition-colors ${
                  selectedRoom?.roomId === room.roomId ? 'bg-primary/10' : ''
                }`}
                onClick={() => selectRoom(room)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{room.name}</h3>
                        {room.isPrivate && (
                          <Lock className="w-3 h-3 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {room.memberCount}
                        </span>
                        <span>{room.messageCount} messages</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        joinRoom(room.roomId);
                      }}
                    >
                      Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedRoom ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b bg-muted/50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold flex items-center gap-2">
                    {selectedRoom.name}
                    {selectedRoom.isPrivate && (
                      <Shield className="w-4 h-4 text-green-600" />
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {selectedRoom.description}
                  </p>
                </div>
                <Badge variant="secondary">
                  {selectedRoom.memberCount} members
                </Badge>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.messageId} className="flex gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">
                          {message.sender.slice(0, 6)}...{message.sender.slice(-4)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                        {message.isEncrypted && (
                          <Shield className="w-3 h-3 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm">{message.encryptedContent}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Type your encrypted message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button
                  onClick={sendMessage}
                  disabled={loading || !newMessage.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Select a Chat Room</h3>
              <p className="text-muted-foreground">
                Choose a room from the sidebar to start chatting
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatRoomComponent;
