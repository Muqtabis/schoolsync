import React from 'react';
import Icon from '../../../components/AppIcon';

const AnnouncementCard = ({ announcement }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-error bg-error/5';
      case 'important': return 'border-l-warning bg-warning/5';
      case 'normal': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return 'AlertTriangle';
      case 'important': return 'Info';
      case 'normal': return 'Bell';
      default: return 'MessageSquare';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const announcementDate = new Date(date);
    const diffTime = Math.abs(now - announcementDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <div className={`border-l-4 rounded-lg p-4 ${getPriorityColor(announcement?.priority)}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon 
            name={getPriorityIcon(announcement?.priority)} 
            size={20} 
            className="text-foreground" 
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {announcement?.title}
            </h4>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {getTimeAgo(announcement?.date)}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{announcement?.content}</p>
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">By {announcement?.author}</p>
            {announcement?.category && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                {announcement?.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;