import React from 'react';
import Icon from '../../../components/AppIcon';

const RealTimeUpdates = () => {
  const updates = [
    {
      id: 1,
      type: 'enrollment',
      title: 'New Enrollment',
      message: 'Emma Wilson enrolled in Grade 9-C',
      time: '5 minutes ago',
      icon: 'UserPlus',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'attendance',
      title: 'Attendance Alert',
      message: 'Grade 7-A attendance below 80%',
      time: '12 minutes ago',
      icon: 'AlertTriangle',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
    {
      id: 3,
      type: 'payment',
      title: 'Fee Payment',
      message: 'Payment received from David Chen - $450',
      time: '18 minutes ago',
      icon: 'DollarSign',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 4,
      type: 'request',
      title: 'Staff Request',
      message: 'Leave request from Ms. Anderson',
      time: '25 minutes ago',
      icon: 'Clock',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 5,
      type: 'system',
      title: 'System Update',
      message: 'Grade management module updated',
      time: '1 hour ago',
      icon: 'RefreshCw',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Real-time Updates</h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {updates?.map((update) => (
          <div key={update?.id} className="flex items-start space-x-3 p-3 hover:bg-muted rounded-lg transition-colors duration-200">
            <div className={`w-8 h-8 rounded-full ${update?.bgColor} flex items-center justify-center flex-shrink-0`}>
              <Icon name={update?.icon} size={16} className={update?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{update?.title}</p>
                <span className="text-xs text-muted-foreground">{update?.time}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{update?.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
          View All Updates
        </button>
      </div>
    </div>
  );
};

export default RealTimeUpdates;