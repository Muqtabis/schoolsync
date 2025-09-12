import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onAction }) => {
  const actions = [
    {
      id: 'attendance',
      label: 'Take Attendance',
      icon: 'UserCheck',
      variant: 'default',
      description: 'Mark student attendance for today'
    },
    {
      id: 'assignment',
      label: 'Create Assignment',
      icon: 'Plus',
      variant: 'outline',
      description: 'Create new assignment or homework'
    },
    {
      id: 'grade',
      label: 'Grade Submissions',
      icon: 'Edit',
      variant: 'outline',
      description: 'Review and grade student work'
    },
    {
      id: 'message',
      label: 'Message Parents',
      icon: 'MessageCircle',
      variant: 'outline',
      description: 'Send messages to parents'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="text-center">
            <Button
              variant={action?.variant}
              size="lg"
              iconName={action?.icon}
              iconPosition="left"
              onClick={() => onAction(action?.id)}
              className="w-full mb-2"
            >
              {action?.label}
            </Button>
            <p className="text-xs text-muted-foreground">{action?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;