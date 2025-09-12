import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssignmentCard = ({ assignment, onSubmit, onView }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error text-error-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted': return 'text-success';
      case 'overdue': return 'text-error';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="text-base font-semibold text-foreground">{assignment?.title}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment?.priority)}`}>
              {assignment?.priority}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{assignment?.subject}</p>
          <p className="text-sm text-foreground">{assignment?.description}</p>
        </div>
        <div className="text-right ml-4">
          <p className={`text-sm font-medium ${getStatusColor(assignment?.status)}`}>
            {assignment?.status?.charAt(0)?.toUpperCase() + assignment?.status?.slice(1)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {getDaysUntilDue(assignment?.dueDate)}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Due: {new Date(assignment.dueDate)?.toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{assignment?.estimatedTime}</span>
          </div>
        </div>
        {assignment?.grade && (
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-warning" />
            <span className="text-sm font-medium text-foreground">{assignment?.grade}%</span>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onView(assignment)}
          className="flex-1"
        >
          View Details
        </Button>
        {assignment?.status !== 'submitted' && (
          <Button
            variant={assignment?.status === 'overdue' ? 'destructive' : 'default'}
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={() => onSubmit(assignment)}
            className="flex-1"
          >
            {assignment?.status === 'overdue' ? 'Submit Late' : 'Submit'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;