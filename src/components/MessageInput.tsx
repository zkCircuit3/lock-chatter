import { useState } from 'react';
import { Send, Lock, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled = false }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-gradient-card border-t border-border/50 p-4">
      {/* Encryption notice */}
      <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
        <Lock className="w-3 h-3" />
        <span>Messages are encrypted before being stored on-chain</span>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your encrypted message..."
            disabled={disabled}
            rows={1}
            className={cn(
              "resize-none bg-secondary/50 border-border/50 rounded-2xl",
              "focus:border-primary/50 transition-colors pr-12",
              "placeholder:text-muted-foreground/60"
            )}
          />
          
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          >
            <Paperclip className="w-4 h-4" />
          </Button>
        </div>
        
        <Button 
          type="submit"
          disabled={!message.trim() || disabled}
          className={cn(
            "bg-gradient-primary hover:shadow-glow-primary transition-all duration-300",
            "hover:scale-105 transform rounded-2xl h-auto py-3",
            (!message.trim() || disabled) && "opacity-50 cursor-not-allowed transform-none"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};