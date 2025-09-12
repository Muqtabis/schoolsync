import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NotificationPanel = ({ attendanceData }) => {
  const [activeTab, setActiveTab] = useState('alerts');

  // Generate notifications based on attendance data
  const generateNotifications = () => {
    const notifications = [];
    
    // Absent students notifications
    const absentStudents = attendanceData?.filter(student => student?.status === 'absent') || [];
    if (absentStudents?.length > 0) {
      notifications?.push({
        id: 'absent-alert',
        type: 'warning',
        icon: 'AlertTriangle',
        title: `${absentStudents?.length} Student${absentStudents?.length !== 1 ? 's' : ''} Absent`,
        message: `${absentStudents?.map(s => s?.name)?.join(', ')} ${absentStudents?.length === 1 ? 'is' : 'are'} marked absent today.`,
        actions: ['Contact Parents', 'Update Status'],
        timestamp: new Date(),
        priority: 'high',
        students: absentStudents
      });
    }

    // Tardy students notifications
    const tardyStudents = attendanceData?.filter(student => student?.status === 'tardy') || [];
    if (tardyStudents?.length > 0) {
      notifications?.push({
        id: 'tardy-alert',
        type: 'info',
        icon: 'Clock',
        title: `${tardyStudents?.length} Student${tardyStudents?.length !== 1 ? 's' : ''} Arrived Late`,
        message: `${tardyStudents?.map(s => s?.name)?.join(', ')} arrived late today.`,
        actions: ['View Details', 'Send Reminder'],
        timestamp: new Date(),
        priority: 'medium',
        students: tardyStudents
      });
    }

    // Perfect attendance notification
    const presentStudents = attendanceData?.filter(student => student?.status === 'present') || [];
    if (presentStudents?.length === attendanceData?.length && attendanceData?.length > 0) {
      notifications?.push({
        id: 'perfect-attendance',
        type: 'success',
        icon: 'CheckCircle',
        title: 'Perfect Attendance!',
        message: 'All students are present today. Great job!',
        actions: ['Celebrate'],
        timestamp: new Date(),
        priority: 'low',
        students: []
      });
    }

    return notifications;
  };

  const notifications = generateNotifications();

  const parentCommunications = [
    {
      id: 1,
      student: 'Emma Thompson',
      parent: 'Sarah Thompson',
      type: 'absence',
      status: 'sent',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      message: 'Your child was absent from Period 1 today.'
    },
    {
      id: 2,
      student: 'Liam Johnson',
      parent: 'Michael Johnson',
      type: 'tardy',
      status: 'pending',
      timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      message: 'Your child arrived late to class today.'
    },
    {
      id: 3,
      student: 'Noah Wilson',
      parent: 'Lisa Wilson',
      type: 'absence',
      status: 'delivered',
      timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
      message: 'Absence notification for today\'s class.'
    }
  ];

  const getNotificationColor = (type) => {
    const colors = {
      warning: 'bg-yellow-50 border-yellow-200',
      info: 'bg-blue-50 border-blue-200',
      success: 'bg-green-50 border-green-200',
      error: 'bg-red-50 border-red-200'
    };
    return colors?.[type] || colors?.info;
  };

  const getNotificationIconColor = (type) => {
    const colors = {
      warning: 'text-yellow-600',
      info: 'text-blue-600',
      success: 'text-green-600',
      error: 'text-red-600'
    };
    return colors?.[type] || colors?.info;
  };

  const getStatusColor = (status) => {
    const colors = {
      sent: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800',
      delivered: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800'
    };
    return colors?.[status] || colors?.pending;
  };

  const handleNotificationAction = (notificationId, action) => {
    console.log(`Performing action "${action}" for notification:`, notificationId);
    // Implement specific action logic here
    alert(`Action "${action}" performed for notification ${notificationId}`);
  };

  const handleResendCommunication = (communicationId) => {
    console.log('Resending communication:', communicationId);
    alert(`Communication ${communicationId} has been resent`);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header with Tabs */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Notifications</h4>
          <Icon name="Bell" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'alerts' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('alerts')}
          >
            Alerts
            {notifications?.length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {notifications?.length}
              </span>
            )}
          </button>
          <button
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'communications' ?'bg-background text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setActiveTab('communications')}
          >
            Communications
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'alerts' && (
          <div className="space-y-4">
            {notifications?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="CheckCircle" size={48} className="text-green-500 mx-auto mb-4" />
                <p className="text-muted-foreground">No alerts today!</p>
                <p className="text-sm text-muted-foreground">All attendance is on track.</p>
              </div>
            ) : (
              notifications?.map((notification) => (
                <div
                  key={notification?.id}
                  className={`p-4 rounded-lg border ${getNotificationColor(notification?.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    <Icon
                      name={notification?.icon}
                      size={20}
                      className={`mt-0.5 ${getNotificationIconColor(notification?.type)}`}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-foreground">
                          {notification?.title}
                        </h5>
                        <span className="text-xs text-muted-foreground">
                          {formatTimeAgo(notification?.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {notification?.message}
                      </p>
                      <div className="flex space-x-2">
                        {notification?.actions?.map((action) => (
                          <Button
                            key={action}
                            size="sm"
                            variant="outline"
                            onClick={() => handleNotificationAction(notification?.id, action)}
                            className="text-xs"
                          >
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'communications' && (
          <div className="space-y-4">
            {parentCommunications?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No communications sent</p>
              </div>
            ) : (
              parentCommunications?.map((comm) => (
                <div
                  key={comm?.id}
                  className="p-4 bg-muted rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-foreground">{comm?.student}</h5>
                      <p className="text-sm text-muted-foreground">to {comm?.parent}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(comm?.status)}`}>
                        {comm?.status?.toUpperCase()}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(comm?.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {comm?.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Mail" size={14} />
                      <span>{comm?.type} notification</span>
                    </div>
                    
                    {comm?.status === 'failed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleResendCommunication(comm?.id)}
                        className="text-xs"
                      >
                        <Icon name="RefreshCw" size={12} className="mr-1" />
                        Resend
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
            
            {parentCommunications?.length > 0 && (
              <Button variant="outline" className="w-full">
                <Icon name="Plus" size={16} className="mr-2" />
                Send New Communication
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;