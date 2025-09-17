import { Lock, Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  content: string;
  isSent: boolean;
  timestamp: string;
  isEncrypted?: boolean;
  isDelivered?: boolean;
  isRead?: boolean;
}

export const MessageBubble = ({ 
  content, 
  isSent, 
  timestamp, 
  isEncrypted = true,
  isDelivered = true,
  isRead = false
}: MessageBubbleProps) => {
  return (
    <div className={cn(
      "flex gap-2 group",
      isSent ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-xs lg:max-w-md px-4 py-3 rounded-2xl relative",
        "transform transition-all duration-200 hover:scale-[1.02]",
        isSent 
          ? "bg-gradient-message text-primary-foreground ml-auto" 
          : "bg-gradient-received text-foreground mr-auto"
      )}>
        {/* Encryption indicator */}
        {isEncrypted && (
          <Lock className={cn(
            "w-3 h-3 absolute -top-1 -left-1 opacity-60",
            isSent ? "text-primary-foreground/60" : "text-muted-foreground"
          )} />
        )}
        
        {/* Message content */}
        <p className="text-sm leading-relaxed">{content}</p>
        
        {/* Message metadata */}
        <div className={cn(
          "flex items-center gap-1 mt-1 justify-end",
          isSent ? "text-primary-foreground/60" : "text-muted-foreground"
        )}>
          <span className="text-xs">{timestamp}</span>
          {isSent && (
            <>
              {isRead ? (
                <CheckCheck className="w-3 h-3" />
              ) : isDelivered ? (
                <CheckCheck className="w-3 h-3 opacity-60" />
              ) : (
                <Check className="w-3 h-3" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};