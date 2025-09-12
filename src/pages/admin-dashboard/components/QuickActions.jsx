import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: 'Add Student',
      description: 'Enroll new student',
      icon: 'UserPlus',
      variant: 'default',
      href: '/student-portal'
    },
    {
      id: 2,
      title: 'Schedule Event',
      description: 'Create new event',
      icon: 'Calendar',
      variant: 'outline',
      href: '/admin-dashboard'
    },
    {
      id: 3,
      title: 'Generate Report',
      description: 'Create analytics report',
      icon: 'FileText',
      variant: 'outline',
      href: '/admin-dashboard'
    },
    {
      id: 4,
      title: 'System Settings',
      description: 'Configure system',
      icon: 'Settings',
      variant: 'secondary',
      href: '/admin-dashboard'
    }
  ];

  const handleActionClick = (href) => {
    window.location.href = href;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions?.map((action) => (
          <div key={action?.id} className="text-center">
            <Button
              variant={action?.variant}
              size="lg"
              iconName={action?.icon}
              iconPosition="left"
              onClick={() => handleActionClick(action?.href)}
              className="w-full mb-2"
            >
              {action?.title}
            </Button>
            <p className="text-xs text-muted-foreground">{action?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;