import React from 'react';
import Icon from '../../../components/AppIcon';

const StudentStatistics = () => {
  const statistics = [
    {
      title: 'Total Enrolled',
      value: '1,450',
      change: '+5.2%',
      changeType: 'increase',
      icon: 'Users',
      color: 'primary',
      description: 'from last month'
    },
    {
      title: 'Active Students',
      value: '1,398',
      change: '+12',
      changeType: 'increase',
      icon: 'UserCheck',
      color: 'success',
      description: 'currently enrolled'
    },
    {
      title: 'Grade Distribution',
      value: 'Balanced',
      change: 'Optimal',
      changeType: 'neutral',
      icon: 'TrendingUp',
      color: 'info',
      description: 'across all grades'
    },
    {
      title: 'Avg Attendance',
      value: '94.2%',
      change: '+1.3%',
      changeType: 'increase',
      icon: 'Calendar',
      color: 'success',
      description: 'this semester'
    },
    {
      title: 'Academic Alerts',
      value: '23',
      change: '-5',
      changeType: 'decrease',
      icon: 'AlertTriangle',
      color: 'warning',
      description: 'require attention'
    },
    {
      title: 'New Enrollments',
      value: '187',
      change: '+32%',
      changeType: 'increase',
      icon: 'UserPlus',
      color: 'primary',
      description: 'this academic year'
    }
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {statistics?.map((stat, index) => {
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
  );
};

export default StudentStatistics;