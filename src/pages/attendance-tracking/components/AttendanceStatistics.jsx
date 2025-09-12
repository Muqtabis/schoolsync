import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceStatistics = ({ stats }) => {
  const statisticsData = [
    {
      title: "Present",
      value: stats?.present || 0,
      percentage: stats?.total > 0 ? ((stats?.present / stats?.total) * 100)?.toFixed(1) : 0,
      icon: "Check",
      color: "success",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200"
    },
    {
      title: "Absent",
      value: stats?.absent || 0,
      percentage: stats?.total > 0 ? ((stats?.absent / stats?.total) * 100)?.toFixed(1) : 0,
      icon: "X",
      color: "error",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      borderColor: "border-red-200"
    },
    {
      title: "Tardy",
      value: stats?.tardy || 0,
      percentage: stats?.total > 0 ? ((stats?.tardy / stats?.total) * 100)?.toFixed(1) : 0,
      icon: "Clock",
      color: "warning",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      borderColor: "border-yellow-200"
    },
    {
      title: "Excused",
      value: stats?.excused || 0,
      percentage: stats?.total > 0 ? ((stats?.excused / stats?.total) * 100)?.toFixed(1) : 0,
      icon: "CheckCircle",
      color: "info",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200"
    }
  ];

  const attendanceRate = stats?.total > 0 ? (((stats?.present + stats?.excused) / stats?.total) * 100)?.toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Overall Attendance Rate */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Overall Attendance Rate</h3>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            attendanceRate >= 95 ? 'bg-green-100 text-green-800' :
            attendanceRate >= 90 ? 'bg-yellow-100 text-yellow-800': 'bg-red-100 text-red-800'
          }`}>
            {attendanceRate >= 95 ? 'Excellent' :
             attendanceRate >= 90 ? 'Good': 'Needs Attention'}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-3xl font-bold text-foreground">{attendanceRate}%</div>
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-500 ${
                attendanceRate >= 95 ? 'bg-green-500' :
                attendanceRate >= 90 ? 'bg-yellow-500': 'bg-red-500'
              }`}
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
          <div className="text-sm text-muted-foreground">
            {stats?.present + stats?.excused}/{stats?.total} students
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statisticsData?.map((stat) => (
          <div
            key={stat?.title}
            className={`bg-card border rounded-lg p-6 hover:shadow-md transition-shadow duration-200 ${stat?.borderColor}`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={24} className={stat?.textColor} />
              </div>
              <div className={`px-2 py-1 text-xs font-medium rounded-full ${stat?.bgColor} ${stat?.textColor}`}>
                {stat?.percentage}%
              </div>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{stat?.title}</p>
              <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>of {stats?.total} students</span>
              </div>
            </div>
            
            {/* Progress bar for individual stats */}
            <div className="mt-3 bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-500 ${
                  stat?.color === 'success' ? 'bg-green-500' :
                  stat?.color === 'error' ? 'bg-red-500' :
                  stat?.color === 'warning'? 'bg-yellow-500' : 'bg-blue-500'
                }`}
                style={{ width: `${stat?.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-md font-semibold text-foreground mb-3">Quick Insights</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-green-600" />
            <span className="text-muted-foreground">
              {stats?.present > stats?.absent ? 'Good attendance today' : 'Attendance needs attention'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-yellow-600" />
            <span className="text-muted-foreground">
              {stats?.tardy} students arrived late
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-blue-600" />
            <span className="text-muted-foreground">
              {stats?.total} students enrolled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceStatistics;