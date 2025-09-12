import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceAnalytics = ({ stats }) => {
  const attendanceRate = stats?.total > 0 ? (((stats?.present + stats?.excused) / stats?.total) * 100)?.toFixed(1) : 0;
  
  const trendData = [
    { day: 'Mon', rate: 92 },
    { day: 'Tue', rate: 88 },
    { day: 'Wed', rate: 95 },
    { day: 'Thu', rate: 89 },
    { day: 'Fri', rate: 94 }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      icon: 'AlertTriangle',
      message: '3 students approaching truancy threshold',
      count: 3,
      action: 'Review Cases'
    },
    {
      id: 2,
      type: 'info',
      icon: 'TrendingUp',
      message: 'Attendance improved by 2.5% this week',
      count: null,
      action: 'View Trends'
    },
    {
      id: 3,
      type: 'urgent',
      icon: 'AlertCircle',
      message: 'Chronic absenteeism: 2 students need intervention',
      count: 2,
      action: 'Contact Parents'
    }
  ];

  const getAlertColor = (type) => {
    const colors = {
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      urgent: 'bg-red-50 border-red-200 text-red-800'
    };
    return colors?.[type] || colors?.info;
  };

  const getAlertIconColor = (type) => {
    const colors = {
      warning: 'text-yellow-600',
      info: 'text-blue-600',
      urgent: 'text-red-600'
    };
    return colors?.[type] || colors?.info;
  };

  return (
    <div className="space-y-6">
      {/* Attendance Rate Card */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Today's Rate</h4>
          <Icon 
            name="TrendingUp" 
            size={20} 
            className={attendanceRate >= 95 ? 'text-green-600' : attendanceRate >= 90 ? 'text-yellow-600' : 'text-red-600'} 
          />
        </div>
        
        <div className="text-center">
          <div className="text-3xl font-bold text-foreground mb-2">{attendanceRate}%</div>
          <div className={`text-sm font-medium ${
            attendanceRate >= 95 ? 'text-green-600' :
            attendanceRate >= 90 ? 'text-yellow-600': 'text-red-600'
          }`}>
            {attendanceRate >= 95 ? 'Excellent' :
             attendanceRate >= 90 ? 'Good': 'Needs Attention'}
          </div>
        </div>
        
        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          <div className="flex justify-between">
            <span>Present: {stats?.present}</span>
            <span>Absent: {stats?.absent}</span>
          </div>
          <div className="flex justify-between">
            <span>Tardy: {stats?.tardy}</span>
            <span>Excused: {stats?.excused}</span>
          </div>
        </div>
      </div>
      {/* Weekly Trend */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Weekly Trend</h4>
          <Icon name="BarChart3" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {trendData?.map((day, index) => (
            <div key={day?.day} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground w-8">{day?.day}</span>
              <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    day?.rate >= 95 ? 'bg-green-500' :
                    day?.rate >= 90 ? 'bg-yellow-500': 'bg-red-500'
                  }`}
                  style={{ width: `${day?.rate}%` }}
                />
              </div>
              <span className="text-sm font-medium text-foreground w-10 text-right">
                {day?.rate}%
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Weekly Average</span>
            <span className="font-medium">
              {(trendData?.reduce((sum, day) => sum + day?.rate, 0) / trendData?.length)?.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      {/* Alerts and Notifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-foreground">Alerts</h4>
          <Icon name="Bell" size={20} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-3">
          {alerts?.map((alert) => (
            <div 
              key={alert?.id} 
              className={`p-3 rounded-lg border ${getAlertColor(alert?.type)}`}
            >
              <div className="flex items-start space-x-3">
                <Icon 
                  name={alert?.icon} 
                  size={16} 
                  className={`mt-0.5 ${getAlertIconColor(alert?.type)}`} 
                />
                <div className="flex-1">
                  <p className="text-sm font-medium mb-1">
                    {alert?.message}
                  </p>
                  <button className="text-xs font-medium hover:underline">
                    {alert?.action}
                  </button>
                </div>
                {alert?.count && (
                  <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                    alert?.type === 'urgent' ? 'bg-red-600 text-white' :
                    alert?.type === 'warning'? 'bg-yellow-600 text-white' : 'bg-blue-600 text-white'
                  }`}>
                    {alert?.count}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-4">Quick Actions</h4>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Icon name="FileText" size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-foreground">Generate Daily Report</span>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Icon name="Send" size={16} className="text-green-600" />
              <span className="text-sm font-medium text-foreground">Send Parent Notifications</span>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 text-left hover:bg-muted rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <Icon name="Calendar" size={16} className="text-purple-600" />
              <span className="text-sm font-medium text-foreground">View Historical Data</span>
            </div>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceAnalytics;