import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnect } from '@/components/WalletConnect';
import { ChatRoomComponent } from '@/components/ChatRoom';
import { LockChatterContract } from '@/lib/contract';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, MessageCircle, Lock, Users } from 'lucide-react';

const Index = () => {
  const { address, isConnected } = useAccount();
  const [contract, setContract] = useState<LockChatterContract | null>(null);

  useEffect(() => {
    // Initialize contract when wallet is connected
    if (isConnected && address) {
      // In a real implementation, you would initialize the contract here
      // For now, we'll set it to null to show the wallet connection UI
      setContract(null);
    }
  }, [isConnected, address]);

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Lock Chatter
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Privacy-Preserving Chat with FHE Encryption
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <MessageCircle className="w-3 h-3 mr-1" />
                Encrypted Chat
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                <Lock className="w-3 h-3 mr-1" />
                FHE Protected
              </Badge>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                <Users className="w-3 h-3 mr-1" />
                Decentralized
              </Badge>
            </div>
          </div>
          
          <WalletConnect />
          
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Connect your wallet to start secure, private conversations
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-green-500" />
                Lock Chatter
              </h1>
              <p className="text-slate-300 mt-1">
                Secure, private conversations with FHE encryption
              </p>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                <MessageCircle className="w-3 h-3 mr-1" />
                Connected
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Main Chat Interface */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-0">
            <ChatRoomComponent contract={contract} />
          </CardContent>
        </Card>
        
        {/* Features */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                Encrypted Messaging
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                All messages are encrypted using FHE technology, ensuring complete privacy
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-500" />
                FHE Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Fully Homomorphic Encryption allows computation on encrypted data
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                Decentralized
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Built on blockchain technology for true decentralization
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;