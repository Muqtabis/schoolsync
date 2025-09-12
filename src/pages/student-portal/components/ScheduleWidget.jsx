import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ScheduleWidget = ({ schedule, onViewFullSchedule }) => {
  const [selectedDay, setSelectedDay] = useState('today');

  const getCurrentDaySchedule = () => {
    const today = new Date()?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
    return schedule?.find(day => day?.day?.toLowerCase() === today) || schedule?.[0];
  };

  const getNextClass = (classes) => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    
    return classes?.find(cls => {
      const [startHour, startMin] = cls?.startTime?.split(':')?.map(Number);
      const startTimeMinutes = startHour * 60 + startMin;
      return startTimeMinutes > currentTime;
    });
  };

  const isCurrentClass = (cls) => {
    const now = new Date();
    const currentTime = now?.getHours() * 60 + now?.getMinutes();
    const [startHour, startMin] = cls?.startTime?.split(':')?.map(Number);
    const [endHour, endMin] = cls?.endTime?.split(':')?.map(Number);
    const startTimeMinutes = startHour * 60 + startMin;
    const endTimeMinutes = endHour * 60 + endMin;
    
    return currentTime >= startTimeMinutes && currentTime <= endTimeMinutes;
  };

  const daySchedule = getCurrentDaySchedule();
  const nextClass = getNextClass(daySchedule?.classes);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="right"
          onClick={onViewFullSchedule}
        >
          Full Schedule
        </Button>
      </div>
      {nextClass && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Next Class</span>
          </div>
          <h4 className="text-base font-semibold text-foreground">{nextClass?.subject}</h4>
          <p className="text-sm text-muted-foreground">
            {nextClass?.startTime} - {nextClass?.endTime} • Room {nextClass?.room}
          </p>
          <p className="text-sm text-muted-foreground">Teacher: {nextClass?.teacher}</p>
        </div>
      )}
      <div className="space-y-3">
        <h4 className="text-base font-medium text-foreground">
          {daySchedule?.day || 'Today'}'s Classes
        </h4>
        {daySchedule?.classes?.map((cls, index) => (
          <div 
            key={index} 
            className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
              isCurrentClass(cls) 
                ? 'bg-accent/10 border border-accent/20' :'bg-muted hover:bg-muted/80'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                isCurrentClass(cls) ? 'bg-accent' : 'bg-muted-foreground'
              }`} />
              <div>
                <p className="text-sm font-medium text-foreground">{cls?.subject}</p>
                <p className="text-xs text-muted-foreground">
                  {cls?.startTime} - {cls?.endTime}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground">Room {cls?.room}</p>
              <p className="text-xs text-muted-foreground">{cls?.teacher}</p>
            </div>
          </div>
        ))}
      </div>
      {(!daySchedule?.classes || daySchedule?.classes?.length === 0) && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No classes scheduled for today</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleWidget;