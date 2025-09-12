import React from 'react';
import Icon from '../../../components/AppIcon';

const TodaySchedule = ({ schedule }) => {
  const getCurrentPeriod = () => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    
    return schedule?.find(period => {
      const [startHour, startMin] = period?.startTime?.split(':')?.map(Number);
      const [endHour, endMin] = period?.endTime?.split(':')?.map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      
      return currentTime >= startMinutes && currentTime <= endMinutes;
    });
  };

  const isUpcoming = (period) => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    const [startHour, startMin] = period?.startTime?.split(':')?.map(Number);
    const startMinutes = startHour * 60 + startMin;
    
    return startMinutes > currentTime && startMinutes - currentTime <= 60;
  };

  const currentPeriod = getCurrentPeriod();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>{new Date()?.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'short', 
            day: 'numeric' 
          })}</span>
        </div>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {schedule?.map((period) => {
          const isCurrent = currentPeriod?.id === period?.id;
          const isNext = isUpcoming(period);
          
          return (
            <div
              key={period?.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isCurrent 
                  ? 'border-primary bg-primary/10 shadow-sm' 
                  : isNext
                  ? 'border-warning bg-warning/5' :'border-border bg-muted/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    isCurrent ? 'bg-primary animate-pulse' : isNext ?'bg-warning' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <h3 className="text-sm font-medium text-foreground">{period?.subject}</h3>
                    <p className="text-xs text-muted-foreground">{period?.grade} • {period?.section}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {period?.startTime} - {period?.endTime}
                  </p>
                  {isCurrent && (
                    <p className="text-xs text-primary font-medium">Current Class</p>
                  )}
                  {isNext && (
                    <p className="text-xs text-warning font-medium">Up Next</p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{period?.classroom}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{period?.studentCount} students</span>
                  </span>
                </div>
                {period?.notes && (
                  <span className="flex items-center space-x-1">
                    <Icon name="StickyNote" size={12} />
                    <span className="truncate max-w-24">{period?.notes}</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {schedule?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No classes scheduled for today</p>
        </div>
      )}
    </div>
  );
};

export default TodaySchedule;