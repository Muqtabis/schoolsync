import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const AttendanceControls = ({
  selectedDate,
  selectedClass,
  selectedPeriod,
  onDateChange,
  onClassChange,
  onPeriodChange
}) => {
  const classes = [
    { value: '7A', label: 'Grade 7A - Mathematics' },
    { value: '7B', label: 'Grade 7B - Science' },
    { value: '8A', label: 'Grade 8A - English' },
    { value: '8B', label: 'Grade 8B - History' },
    { value: '9A', label: 'Grade 9A - Physics' },
    { value: '9B', label: 'Grade 9B - Chemistry' }
  ];

  const periods = [
    { value: '1', label: 'Period 1 (8:00 AM - 9:00 AM)' },
    { value: '2', label: 'Period 2 (9:15 AM - 10:15 AM)' },
    { value: '3', label: 'Period 3 (10:30 AM - 11:30 AM)' },
    { value: '4', label: 'Period 4 (12:30 PM - 1:30 PM)' },
    { value: '5', label: 'Period 5 (1:45 PM - 2:45 PM)' },
    { value: '6', label: 'Period 6 (3:00 PM - 4:00 PM)' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Attendance Controls</h3>
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => window.location?.reload()}
        >
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Date</label>
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Class Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Class</label>
          <Select
            value={selectedClass}
            onValueChange={onClassChange}
            options={classes}
            placeholder="Select a class"
          />
        </div>

        {/* Period Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Period</label>
          <Select
            value={selectedPeriod}
            onValueChange={onPeriodChange}
            options={periods}
            placeholder="Select a period"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Actions</label>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1"
              onClick={() => {
                const yesterday = new Date();
                yesterday?.setDate(yesterday?.getDate() - 1);
                onDateChange(yesterday?.toISOString()?.split('T')?.[0]);
              }}
            >
              <Icon name="ChevronLeft" size={16} className="mr-1" />
              Previous
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="flex-1"
              onClick={() => onDateChange(new Date()?.toISOString()?.split('T')?.[0])}
            >
              Today
            </Button>
          </div>
        </div>
      </div>
      {/* Current Selection Summary */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Current Selection:</span>
          <span className="font-medium text-foreground">
            {classes?.find(c => c?.value === selectedClass)?.label} • 
            {periods?.find(p => p?.value === selectedPeriod)?.label} • 
            {new Date(selectedDate)?.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceControls;