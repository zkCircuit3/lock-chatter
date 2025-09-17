import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LogOut, User, MessageCircle } from 'lucide-react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">Connect Your Wallet</CardTitle>
          <CardDescription>
            Connect your wallet to start using Lock Chatter - the privacy-preserving chat application
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <ConnectButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          Connected Wallet
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Address</p>
            <p className="text-xs text-muted-foreground font-mono">
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Connected
          </Badge>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => disconnect()}
            className="flex-1"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default WalletConnect;
