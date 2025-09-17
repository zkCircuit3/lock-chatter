import { Shield, Lock, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  title: string;
  isEncrypted?: boolean;
  participantCount?: number;
}

export const ChatHeader = ({ title, isEncrypted = true, participantCount = 2 }: ChatHeaderProps) => {
  return (
    <div className="bg-gradient-card border-b border-border/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          
          <div>
            <h2 className="font-semibold text-foreground">{title}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {isEncrypted && (
                <>
                  <Lock className="w-3 h-3" />
                  <span>End-to-end encrypted</span>
                </>
              )}
              <span>•</span>
              <Users className="w-3 h-3" />
              <span>{participantCount} participants</span>
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};