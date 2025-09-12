import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ events, onEventClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentMonth = currentDate?.getMonth();
  const currentYear = currentDate?.getFullYear();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth?.getDay();
  const daysInMonth = lastDayOfMonth?.getDate();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentYear, currentMonth + direction, 1));
  };
  
  const getEventsForDate = (date) => {
    return events?.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate?.getDate() === date &&
             eventDate?.getMonth() === currentMonth &&
             eventDate?.getFullYear() === currentYear;
    });
  };
  
  const isToday = (date) => {
    return today?.getDate() === date &&
           today?.getMonth() === currentMonth &&
           today?.getFullYear() === currentYear;
  };
  
  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days?.push(<div key={`empty-${i}`} className="h-8" />);
    }
    
    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const dayEvents = getEventsForDate(date);
      const hasEvents = dayEvents?.length > 0;
      const isCurrentDay = isToday(date);
      
      days?.push(
        <div
          key={date}
          className={`h-8 flex items-center justify-center text-sm cursor-pointer rounded-md transition-colors duration-200 relative ${
            isCurrentDay
              ? 'bg-primary text-primary-foreground font-semibold'
              : hasEvents
              ? 'bg-accent/20 text-foreground hover:bg-accent/30'
              : 'text-foreground hover:bg-muted'
          }`}
          onClick={() => hasEvents && onEventClick(dayEvents)}
        >
          <span>{date}</span>
          {hasEvents && (
            <div className={`absolute bottom-0 right-0 w-2 h-2 rounded-full ${
              isCurrentDay ? 'bg-primary-foreground' : 'bg-accent'
            }`} />
          )}
        </div>
      );
    }
    
    return days;
  };
  
  const upcomingEvents = events?.filter(event => new Date(event.date) >= today)?.sort((a, b) => new Date(a.date) - new Date(b.date))?.slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Calendar</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronLeft"
            onClick={() => navigateMonth(-1)}
          />
          <span className="text-sm font-medium text-foreground min-w-32 text-center">
            {monthNames?.[currentMonth]} {currentYear}
          </span>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            onClick={() => navigateMonth(1)}
          />
        </div>
      </div>
      {/* Calendar Grid */}
      <div className="mb-6">
        {/* Week day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays?.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {renderCalendarDays()}
        </div>
      </div>
      {/* Upcoming Events */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Upcoming Events
        </h3>
        
        <div className="space-y-2">
          {upcomingEvents?.map((event) => (
            <div
              key={event?.id}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors duration-200"
              onClick={() => onEventClick([event])}
            >
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                event?.type === 'deadline' ? 'bg-error' :
                event?.type === 'meeting' ? 'bg-warning' :
                event?.type === 'event' ? 'bg-success' : 'bg-primary'
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{event?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(event.date)?.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: event?.time ? '2-digit' : undefined,
                    minute: event?.time ? '2-digit' : undefined
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {upcomingEvents?.length === 0 && (
          <div className="text-center py-4">
            <Icon name="Calendar" size={32} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No upcoming events</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarWidget;