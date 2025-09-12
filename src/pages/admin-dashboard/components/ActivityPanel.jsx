import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityPanel = () => {
  const [activeTab, setActiveTab] = useState('recent');

  const tabs = [
    { id: 'recent', label: 'Recent Activities', icon: 'Clock' },
    { id: 'approvals', label: 'Pending Approvals', icon: 'CheckCircle' },
    { id: 'events', label: 'Upcoming Events', icon: 'Calendar' },
    { id: 'notifications', label: 'System Alerts', icon: 'Bell' }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New Student Enrollment',
      description: 'Sarah Johnson enrolled in Grade 10-A',
      time: '2 hours ago',
      icon: 'UserPlus',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Fee Payment Received',
      description: 'Monthly fee payment from Michael Brown',
      time: '4 hours ago',
      icon: 'DollarSign',
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'attendance',
      title: 'Attendance Alert',
      description: 'Low attendance in Grade 8-B (72%)',
      time: '6 hours ago',
      icon: 'AlertTriangle',
      color: 'text-amber-600'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      title: 'Teacher Leave Request',
      description: 'Dr. Smith - Medical leave for 3 days',
      priority: 'high',
      department: 'Mathematics'
    },
    {
      id: 2,
      title: 'Budget Approval',
      description: 'Science lab equipment purchase - $2,500',
      priority: 'medium',
      department: 'Science'
    },
    {
      id: 3,
      title: 'Event Permission',
      description: 'Annual sports day venue booking',
      priority: 'low',
      department: 'Sports'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Parent-Teacher Meeting',
      date: '2025-09-15',
      time: '10:00 AM',
      location: 'Main Auditorium'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: '2025-09-18',
      time: '9:00 AM',
      location: 'School Grounds'
    },
    {
      id: 3,
      title: 'Staff Training Session',
      date: '2025-09-20',
      time: '2:00 PM',
      location: 'Conference Room'
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Server Maintenance',
      description: 'Scheduled maintenance on Sept 14, 11 PM - 2 AM',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      title: 'System Update',
      description: 'New features available in grade management',
      severity: 'low'
    },
    {
      id: 3,
      type: 'error',
      title: 'Payment Gateway Issue',
      description: 'Temporary issue with online fee payments',
      severity: 'high'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-amber-100 text-amber-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors?.[priority] || colors?.low;
  };

  const getSeverityColor = (severity) => {
    const colors = {
      high: 'border-l-red-500',
      medium: 'border-l-amber-500',
      low: 'border-l-blue-500'
    };
    return colors?.[severity] || colors?.low;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'recent':
        return (
          <div className="space-y-4">
            {recentActivities?.map((activity) => (
              <div key={activity?.id} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200">
                <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity?.color}`}>
                  <Icon name={activity?.icon} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                  <p className="text-sm text-muted-foreground">{activity?.description}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity?.time}</p>
                </div>
              </div>
            ))}
          </div>
        );

      case 'approvals':
        return (
          <div className="space-y-4">
            {pendingApprovals?.map((approval) => (
              <div key={approval?.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-foreground">{approval?.title}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(approval?.priority)}`}>
                    {approval?.priority}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{approval?.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{approval?.department}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="xs">Reject</Button>
                    <Button variant="default" size="xs">Approve</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'events':
        return (
          <div className="space-y-4">
            {upcomingEvents?.map((event) => (
              <div key={event?.id} className="p-4 border border-border rounded-lg">
                <h4 className="text-sm font-medium text-foreground mb-2">{event?.title}</h4>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Calendar" size={14} className="mr-2" />
                    {event?.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="Clock" size={14} className="mr-2" />
                    {event?.time}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Icon name="MapPin" size={14} className="mr-2" />
                    {event?.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4">
            {systemAlerts?.map((alert) => (
              <div key={alert?.id} className={`p-4 border-l-4 bg-card rounded-lg ${getSeverityColor(alert?.severity)}`}>
                <h4 className="text-sm font-medium text-foreground mb-1">{alert?.title}</h4>
                <p className="text-sm text-muted-foreground">{alert?.description}</p>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="border-b border-border">
        <nav className="flex space-x-1 p-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="hidden sm:inline">{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="p-6 max-h-96 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ActivityPanel;