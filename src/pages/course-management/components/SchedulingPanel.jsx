import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SchedulingPanel = ({ selectedCourses = [], onScheduleUpdate }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [conflicts, setConflicts] = useState([]);

  // Mock time slots
  const timeSlots = [
    { value: '8:00-9:00', label: '8:00 AM - 9:00 AM' },
    { value: '9:00-10:00', label: '9:00 AM - 10:00 AM' },
    { value: '10:00-11:00', label: '10:00 AM - 11:00 AM' },
    { value: '11:00-12:00', label: '11:00 AM - 12:00 PM' },
    { value: '12:00-13:00', label: '12:00 PM - 1:00 PM' },
    { value: '13:00-14:00', label: '1:00 PM - 2:00 PM' },
    { value: '14:00-15:00', label: '2:00 PM - 3:00 PM' },
    { value: '15:00-16:00', label: '3:00 PM - 4:00 PM' }
  ];

  // Mock rooms
  const rooms = [
    { value: '', label: 'Select Room...' },
    { value: 'MATH101', label: 'Math Lab 101' },
    { value: 'ENG205', label: 'English Hall 205' },
    { value: 'SCI301', label: 'Science Lab 301' },
    { value: 'HIST102', label: 'History Hall 102' },
    { value: 'ART201', label: 'Art Studio 201' },
    { value: 'GYM', label: 'Gymnasium' },
    { value: 'COMP401', label: 'Computer Lab 401' },
    { value: 'MUS301', label: 'Music Room 301' }
  ];

  // Mock current week schedule
  const weekSchedule = {
    Monday: [
      { time: '9:00-10:00', course: 'MATH101', room: 'MATH101', teacher: 'Dr. Johnson' },
      { time: '10:00-11:00', course: 'ENG201', room: 'ENG205', teacher: 'Prof. Brown' },
      { time: '13:00-14:30', course: 'SCI301', room: 'SCI301', teacher: 'Dr. Davis' }
    ],
    Tuesday: [
      { time: '8:00-9:30', course: 'HIST101', room: 'HIST102', teacher: 'Prof. Wilson' },
      { time: '14:00-15:00', course: 'ART201', room: 'ART201', teacher: 'Ms. Garcia' }
    ],
    Wednesday: [
      { time: '9:00-10:00', course: 'MATH101', room: 'MATH101', teacher: 'Dr. Johnson' },
      { time: '11:00-12:00', course: 'PE101', room: 'GYM', teacher: 'Coach Taylor' }
    ],
    Thursday: [
      { time: '8:00-9:30', course: 'HIST101', room: 'HIST102', teacher: 'Prof. Wilson' },
      { time: '10:30-12:00', course: 'ENG201', room: 'ENG205', teacher: 'Prof. Brown' }
    ],
    Friday: [
      { time: '9:00-10:00', course: 'MATH101', room: 'MATH101', teacher: 'Dr. Johnson' },
      { time: '13:00-14:30', course: 'SCI301', room: 'SCI301', teacher: 'Dr. Davis' },
      { time: '14:00-15:00', course: 'ART201', room: 'ART201', teacher: 'Ms. Garcia' }
    ]
  };

  const handleScheduleAction = (action) => {
    console.log(`Schedule action: ${action}`, { 
      selectedCourses, 
      timeSlot: selectedTimeSlot, 
      room: selectedRoom 
    });
    onScheduleUpdate?.(action);
  };

  const checkConflicts = () => {
    // Mock conflict detection
    const detectedConflicts = [
      {
        type: 'room',
        message: 'Math Lab 101 is already booked for 9:00-10:00 AM on Monday',
        course: 'MATH101'
      },
      {
        type: 'teacher',
        message: 'Dr. Johnson has another class scheduled at this time',
        course: 'MATH102'
      }
    ];
    setConflicts(detectedConflicts);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Class Scheduling</h3>
        <Button variant="ghost" size="sm" iconName="Settings" iconSize={16} />
      </div>

      {/* Selected Courses Info */}
      {selectedCourses?.length > 0 && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {selectedCourses?.length} course{selectedCourses?.length !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Ready for scheduling operations
          </div>
        </div>
      )}

      {/* Quick Scheduling Actions */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Time Slot
          </label>
          <Select
            value={selectedTimeSlot}
            onValueChange={setSelectedTimeSlot}
            options={timeSlots}
            placeholder="Select time slot..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Room Assignment
          </label>
          <Select
            value={selectedRoom}
            onValueChange={setSelectedRoom}
            options={rooms}
            placeholder="Select room..."
          />
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Search"
            iconSize={16}
            onClick={checkConflicts}
            className="flex-1"
          >
            Check Conflicts
          </Button>
          <Button
            variant="default"
            size="sm"
            iconName="Calendar"
            iconSize={16}
            onClick={() => handleScheduleAction('apply_schedule')}
            className="flex-1"
            disabled={!selectedTimeSlot || !selectedRoom}
          >
            Apply Schedule
          </Button>
        </div>
      </div>

      {/* Conflict Detection Results */}
      {conflicts?.length > 0 && (
        <div className="mb-6 space-y-2">
          <h4 className="text-sm font-medium text-foreground">Conflicts Detected:</h4>
          {conflicts?.map((conflict, index) => (
            <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-red-600 mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-red-800 capitalize">
                    {conflict?.type} Conflict
                  </div>
                  <div className="text-xs text-red-600">{conflict?.message}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scheduling Analytics */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Room Utilization</h4>
        <div className="space-y-2">
          {rooms?.slice(1, 5)?.map((room) => (
            <div key={room?.value} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{room?.label}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${Math.random() * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Schedule Preview */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">This Week's Schedule</h4>
        
        <div className="space-y-3">
          {Object.entries(weekSchedule)?.map(([day, classes]) => (
            <div key={day} className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h5 className="text-sm font-medium text-foreground">{day}</h5>
                <span className="text-xs text-muted-foreground">
                  {classes?.length} classes
                </span>
              </div>
              
              <div className="space-y-1">
                {classes?.length > 0 ? classes?.map((classItem, index) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex-1">
                      <div className="font-medium text-foreground">{classItem?.course}</div>
                      <div className="text-muted-foreground">{classItem?.teacher}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-muted-foreground">{classItem?.time}</div>
                      <div className="text-muted-foreground">{classItem?.room}</div>
                    </div>
                  </div>
                )) : (
                  <div className="text-xs text-muted-foreground italic">No classes scheduled</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Schedule Actions */}
        <div className="flex items-center space-x-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconSize={14}
            onClick={() => handleScheduleAction('auto_schedule')}
            className="flex-1"
          >
            Auto Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Copy"
            iconSize={14}
            onClick={() => handleScheduleAction('duplicate_schedule')}
            className="flex-1"
          >
            Duplicate
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SchedulingPanel;