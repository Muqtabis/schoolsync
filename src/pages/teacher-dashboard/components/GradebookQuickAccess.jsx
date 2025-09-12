import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GradebookQuickAccess = ({ submissions, onGradeSubmission, onViewAll }) => {
  const getSubmissionStatus = (status) => {
    switch (status) {
      case 'pending':
        return { color: 'text-warning', bg: 'bg-warning/10', icon: 'Clock' };
      case 'graded':
        return { color: 'text-success', bg: 'bg-success/10', icon: 'CheckCircle' };
      case 'late':
        return { color: 'text-error', bg: 'bg-error/10', icon: 'AlertTriangle' };
      default:
        return { color: 'text-muted-foreground', bg: 'bg-muted/10', icon: 'FileText' };
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const submissionDate = new Date(date);
    const diffInHours = Math.floor((now - submissionDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const pendingCount = submissions?.filter(sub => sub?.status === 'pending')?.length;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent Submissions</h2>
        <div className="flex items-center space-x-3">
          {pendingCount > 0 && (
            <div className="flex items-center space-x-1 bg-warning/10 px-2 py-1 rounded-md">
              <Icon name="Clock" size={14} className="text-warning" />
              <span className="text-sm font-medium text-warning">{pendingCount} pending</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            onClick={onViewAll}
          >
            View All
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {submissions?.map((submission) => {
          const statusConfig = getSubmissionStatus(submission?.status);
          
          return (
            <div
              key={submission?.id}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {submission?.studentName?.split(' ')?.map(n => n?.[0])?.join('')?.slice(0, 2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-sm font-medium text-foreground truncate">
                      {submission?.studentName}
                    </h3>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig?.bg} ${statusConfig?.color}`}>
                      <Icon name={statusConfig?.icon} size={12} />
                      <span className="capitalize">{submission?.status}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-foreground mb-1 truncate">{submission?.assignmentTitle}</p>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={12} />
                      <span>{submission?.subject}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} />
                      <span>{getTimeAgo(submission?.submittedAt)}</span>
                    </span>
                    {submission?.grade && (
                      <span className="flex items-center space-x-1">
                        <Icon name="Star" size={12} />
                        <span>{submission?.grade}/100</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                {submission?.status === 'pending' && (
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Edit"
                    onClick={() => onGradeSubmission(submission?.id)}
                  >
                    Grade
                  </Button>
                )}
                
                {submission?.status === 'graded' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Eye"
                    onClick={() => onGradeSubmission(submission?.id)}
                  >
                    View
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => window.open(submission?.fileUrl, '_blank')}
                />
              </div>
            </div>
          );
        })}
      </div>
      {submissions?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No recent submissions</p>
          <p className="text-sm text-muted-foreground mt-1">New submissions will appear here</p>
        </div>
      )}
    </div>
  );
};

export default GradebookQuickAccess;