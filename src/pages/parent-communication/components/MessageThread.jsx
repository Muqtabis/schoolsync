import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageThread = ({ thread, onThreadClick, isSelected }) => {
  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate?.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) {
      return messageDate?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageDate?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-error';
      case 'high': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getSenderTypeIcon = (type) => {
    switch (type) {
      case 'teacher': return 'BookOpen';
      case 'admin': return 'Settings';
      case 'school': return 'Building';
      default: return 'User';
    }
  };

  return (
    <div 
      className={`p-4 border-b border-border cursor-pointer transition-colors duration-200 hover:bg-muted ${
        isSelected ? 'bg-primary/5 border-l-4 border-l-primary' : ''
      }`}
      onClick={() => onThreadClick(thread)}
    >
      <div className="flex items-start space-x-3">
        <div className="relative flex-shrink-0">
          <Image
            src={thread?.senderAvatar}
            alt={thread?.senderName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-card border-2 border-card rounded-full flex items-center justify-center">
            <Icon 
              name={getSenderTypeIcon(thread?.senderType)} 
              size={12} 
              className="text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center space-x-2">
              <h4 className={`text-sm font-medium truncate ${
                thread?.unread ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {thread?.senderName}
              </h4>
              {thread?.priority !== 'normal' && (
                <Icon 
                  name="AlertCircle" 
                  size={14} 
                  className={getPriorityColor(thread?.priority)}
                />
              )}
            </div>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatTimestamp(thread?.timestamp)}
            </span>
          </div>

          <p className={`text-sm mb-1 truncate ${
            thread?.unread ? 'font-medium text-foreground' : 'text-muted-foreground'
          }`}>
            {thread?.subject}
          </p>

          <p className="text-xs text-muted-foreground truncate">
            {thread?.lastMessage}
          </p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              {thread?.hasAttachment && (
                <Icon name="Paperclip" size={12} className="text-muted-foreground" />
              )}
              {thread?.category && (
                <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                  {thread?.category}
                </span>
              )}
            </div>
            {thread?.unread && (
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageThread;