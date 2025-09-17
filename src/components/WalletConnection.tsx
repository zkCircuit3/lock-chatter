import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, Shield, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WalletConnectionProps {
  onConnect: (address: string) => void;
  isConnected: boolean;
  address?: string;
}

export const WalletConnection = ({ onConnect, isConnected, address }: WalletConnectionProps) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate wallet connection
    setTimeout(() => {
      onConnect('0x1234...5678');
      setIsConnecting(false);
    }, 2000);
  };

  if (isConnected && address) {
    return (
      <Card className="bg-gradient-card p-4 border-primary/20 shadow-glow-primary">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Shield className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Connected</p>
            <p className="text-xs text-muted-foreground">{address}</p>
          </div>
          <Lock className="w-4 h-4 text-primary" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card p-6 border-border/50">
      <div className="text-center space-y-4">
        <div className="mx-auto p-4 bg-gradient-primary rounded-full w-fit">
          <Wallet className="w-8 h-8 text-primary-foreground" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Connect Your Wallet
          </h3>
          <p className="text-sm text-muted-foreground">
            Secure messaging requires wallet authentication for end-to-end encryption
          </p>
        </div>
        
        <Button 
          onClick={handleConnect}
          disabled={isConnecting}
          className={cn(
            "bg-gradient-primary hover:shadow-glow-primary transition-all duration-300",
            "hover:scale-105 transform"
          )}
        >
          {isConnecting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};