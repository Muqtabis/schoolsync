import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessPanel = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'compose',
      title: 'Compose Message',
      description: 'Send a message to teachers or staff',
      icon: 'PenTool',
      color: 'bg-primary',
      textColor: 'text-primary-foreground'
    },
    {
      id: 'schedule',
      title: 'Schedule Conference',
      description: 'Request parent-teacher meeting',
      icon: 'Calendar',
      color: 'bg-accent',
      textColor: 'text-accent-foreground'
    },
    {
      id: 'reports',
      title: 'View Reports',
      description: 'Check academic progress',
      icon: 'FileText',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground'
    },
    {
      id: 'events',
      title: 'School Events',
      description: 'Upcoming activities and dates',
      icon: 'Calendar',
      color: 'bg-warning',
      textColor: 'text-warning-foreground'
    }
  ];

  const upcomingItems = [
    {
      id: 1,
      type: 'conference',
      title: 'Parent-Teacher Conference',
      description: 'Math Teacher - Ms. Johnson',
      date: '2025-01-15',
      time: '2:30 PM',
      icon: 'Users'
    },
    {
      id: 2,
      type: 'event',
      title: 'Science Fair',
      description: 'Student project presentations',
      date: '2025-01-20',
      time: '10:00 AM',
      icon: 'Beaker'
    },
    {
      id: 3,
      type: 'permission',
      title: 'Field Trip Permission',
      description: 'Natural History Museum visit',
      date: '2025-01-25',
      time: 'Due Soon',
      icon: 'FileCheck'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Mid-Term Progress Report',
      subject: 'All Subjects',
      date: '2025-01-10',
      status: 'available'
    },
    {
      id: 2,
      title: 'Attendance Summary',
      subject: 'December 2024',
      date: '2025-01-05',
      status: 'available'
    },
    {
      id: 3,
      title: 'Behavior Report',
      subject: 'Quarterly Review',
      date: '2025-01-08',
      status: 'new'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-card rounded-lg border border-border p-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <Button
              key={action?.id}
              variant="outline"
              className="h-auto p-4 justify-start text-left"
              onClick={() => onActionClick(action?.id)}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg ${action?.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={action?.icon} size={20} className={action?.textColor} />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-foreground text-sm">{action?.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{action?.description}</p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      {/* Upcoming Items */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming</h3>
          <Button variant="ghost" size="sm" iconName="Calendar">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {upcomingItems?.map((item) => (
            <div key={item?.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={item?.icon} size={18} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground text-sm">{item?.title}</h4>
                <p className="text-xs text-muted-foreground">{item?.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    {formatDate(item?.date)}
                  </span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{item?.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Reports */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
          <Button variant="ghost" size="sm" iconName="FileText">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {recentReports?.map((report) => (
            <div key={report?.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="FileText" size={16} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground text-sm">{report?.title}</h4>
                  <p className="text-xs text-muted-foreground">{report?.subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {report?.status === 'new' && (
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDate(report?.date)}
                </span>
                <Button variant="ghost" size="sm" iconName="Download" iconSize={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickAccessPanel;