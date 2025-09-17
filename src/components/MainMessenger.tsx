import { useState } from 'react';
import { WalletConnection } from './WalletConnection';
import { ChatHeader } from './ChatHeader';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  content: string;
  isSent: boolean;
  timestamp: string;
  isEncrypted: boolean;
  isDelivered: boolean;
  isRead: boolean;
}

export const MainMessenger = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hey! This message is encrypted and stored on-chain 🔒',
      isSent: false,
      timestamp: '2:30 PM',
      isEncrypted: true,
      isDelivered: true,
      isRead: true
    },
    {
      id: '2',
      content: 'Amazing! Complete privacy with blockchain transparency.',
      isSent: true,
      timestamp: '2:32 PM',
      isEncrypted: true,
      isDelivered: true,
      isRead: false
    }
  ]);

  const handleWalletConnect = (address: string) => {
    setWalletAddress(address);
    setIsWalletConnected(true);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isSent: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isEncrypted: true,
      isDelivered: false,
      isRead: false
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate delivery status
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, isDelivered: true } : msg
      ));
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-4xl p-4">
        {/* Header */}
        <div className="text-center py-8 space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Talk Privately, On-Chain.
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Send encrypted messages that remain completely private while being stored 
            on the blockchain. Only you and your recipient can decrypt and read them.
          </p>
        </div>

        {/* Main Chat Interface */}
        <div className="max-w-2xl mx-auto">
          {!isWalletConnected ? (
            <WalletConnection 
              onConnect={handleWalletConnect}
              isConnected={isWalletConnected}
              address={walletAddress}
            />
          ) : (
            <Card className="bg-gradient-card border-border/50 shadow-glow-accent overflow-hidden">
              <ChatHeader 
                title="Confidential Chat" 
                isEncrypted={true}
                participantCount={2}
              />
              
              {/* Messages Area */}
              <ScrollArea className="h-96 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      content={message.content}
                      isSent={message.isSent}
                      timestamp={message.timestamp}
                      isEncrypted={message.isEncrypted}
                      isDelivered={message.isDelivered}
                      isRead={message.isRead}
                    />
                  ))}
                </div>
              </ScrollArea>
              
              <MessageInput 
                onSendMessage={handleSendMessage}
                disabled={false}
              />
            </Card>
          )}
        </div>
        
        {/* Connected Wallet Status */}
        {isWalletConnected && (
          <div className="mt-6 max-w-2xl mx-auto">
            <WalletConnection 
              onConnect={handleWalletConnect}
              isConnected={isWalletConnected}
              address={walletAddress}
            />
          </div>
        )}
      </div>
    </div>
  );
};