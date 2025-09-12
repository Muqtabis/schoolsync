import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const CourseAnalytics = () => {
  const analytics = [
    {
      title: 'Total Courses',
      value: '156',
      change: '+12',
      changeType: 'increase',
      icon: 'BookOpen',
      color: 'primary',
      description: 'this semester'
    },
    {
      title: 'Active Classes',
      value: '142',
      change: '+8',
      changeType: 'increase',
      icon: 'Play',
      color: 'success',
      description: 'currently running'
    },
    {
      title: 'Total Enrollment',
      value: '3,247',
      change: '+156',
      changeType: 'increase',
      icon: 'Users',
      color: 'info',
      description: 'students enrolled'
    },
    {
      title: 'Capacity Utilization',
      value: '89.2%',
      change: '+2.3%',
      changeType: 'increase',
      icon: 'TrendingUp',
      color: 'success',
      description: 'average utilization'
    },
    {
      title: 'Teacher Workload',
      value: '5.5',
      change: '+0.2',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'warning',
      description: 'avg classes per teacher'
    },
    {
      title: 'Schedule Conflicts',
      value: '3',
      change: '-2',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'error',
      description: 'require resolution'
    }
  ];

  const departmentStats = [
    { name: 'Mathematics', courses: 28, enrollment: 687, utilization: 92 },
    { name: 'English', courses: 24, enrollment: 612, utilization: 88 },
    { name: 'Science', courses: 22, enrollment: 534, utilization: 85 },
    { name: 'History', courses: 18, enrollment: 456, utilization: 89 },
    { name: 'Arts', courses: 16, enrollment: 298, utilization: 73 },
    { name: 'Physical Education', courses: 12, enrollment: 789, utilization: 98 }
  ];

  const getColorClasses = (color, changeType) => {
    const colorMap = {
      primary: 'bg-blue-50 border-blue-200',
      success: 'bg-green-50 border-green-200',
      warning: 'bg-amber-50 border-amber-200',
      error: 'bg-red-50 border-red-200',
      info: 'bg-purple-50 border-purple-200'
    };

    const iconColorMap = {
      primary: 'text-blue-600',
      success: 'text-green-600',
      warning: 'text-amber-600',
      error: 'text-red-600',
      info: 'text-purple-600'
    };

    const changeColorMap = {
      increase: 'text-green-600 bg-green-100',
      decrease: 'text-red-600 bg-red-100',
      neutral: 'text-blue-600 bg-blue-100'
    };

    return {
      card: colorMap?.[color] || colorMap?.primary,
      icon: iconColorMap?.[color] || iconColorMap?.primary,
      change: changeColorMap?.[changeType] || changeColorMap?.neutral
    };
  };

  const getUtilizationColor = (utilization) => {
    if (utilization >= 90) return 'bg-green-500';
    if (utilization >= 75) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Main Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {analytics?.map((stat, index) => {
          const colors = getColorClasses(stat?.color, stat?.changeType);
          
          return (
            <div key={index} className={`bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow ${colors?.card}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors?.icon} bg-white`}>
                  <Icon name={stat?.icon} size={20} />
                </div>
                <div className={`px-2 py-1 text-xs font-medium rounded-full ${colors?.change}`}>
                  {stat?.change}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
                <p className="text-sm font-medium text-foreground">{stat?.title}</p>
                <p className="text-xs text-muted-foreground">{stat?.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Department Overview</h3>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departmentStats?.map((dept, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">{dept?.name}</h4>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getUtilizationColor(dept?.utilization)}`}></div>
                  <span className="text-sm text-muted-foreground">{dept?.utilization}%</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Courses:</span>
                  <span className="font-medium text-foreground">{dept?.courses}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Enrollment:</span>
                  <span className="font-medium text-foreground">{dept?.enrollment?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg per Course:</span>
                  <span className="font-medium text-foreground">
                    {Math.round(dept?.enrollment / dept?.courses)}
                  </span>
                </div>
              </div>
              
              {/* Utilization Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Utilization</span>
                  <span className="text-muted-foreground">{dept?.utilization}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getUtilizationColor(dept?.utilization)}`}
                    style={{ width: `${dept?.utilization}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule Efficiency Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Time Slot Utilization</h3>
          
          <div className="space-y-3">
            {[
              { time: '8:00-9:00 AM', utilization: 85, courses: 12 },
              { time: '9:00-10:00 AM', utilization: 92, courses: 16 },
              { time: '10:00-11:00 AM', utilization: 88, courses: 14 },
              { time: '11:00-12:00 PM', utilization: 76, courses: 11 },
              { time: '1:00-2:00 PM', utilization: 94, courses: 18 },
              { time: '2:00-3:00 PM', utilization: 82, courses: 13 }
            ]?.map((slot, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{slot?.time}</span>
                    <span className="text-xs text-muted-foreground">{slot?.courses} courses</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getUtilizationColor(slot?.utilization)}`}
                      style={{ width: `${slot?.utilization}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-foreground ml-3">
                  {slot?.utilization}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Room Capacity Analysis</h3>
          
          <div className="space-y-4">
            {[
              { room: 'Math Labs', capacity: 180, used: 165, efficiency: 92 },
              { room: 'Science Labs', capacity: 120, used: 108, efficiency: 90 },
              { room: 'English Halls', capacity: 150, used: 127, efficiency: 85 },
              { room: 'Art Studios', capacity: 60, used: 45, efficiency: 75 },
              { room: 'Gymnasium', capacity: 200, used: 195, efficiency: 98 }
            ]?.map((room, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">{room?.room}</span>
                  <span className="text-xs text-muted-foreground">
                    {room?.used}/{room?.capacity} seats
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${getUtilizationColor(room?.efficiency)}`}
                      style={{ width: `${room?.efficiency}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {room?.efficiency}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnalytics;