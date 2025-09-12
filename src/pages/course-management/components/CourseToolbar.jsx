import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const CourseToolbar = ({ 
  onSearch, 
  selectedCount = 0, 
  onBulkOperation,
  viewMode = 'grid',
  onViewModeChange 
}) => {
  const handleCreateCourse = () => {
    console.log('Create new course clicked');
    onBulkOperation?.('create_course');
  };

  const handleScheduleClasses = () => {
    console.log('Schedule classes clicked');
    onBulkOperation?.('schedule_classes');
  };

  const handleAssignTeachers = () => {
    console.log('Assign teachers clicked');
    onBulkOperation?.('assign_teachers');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        {/* Left Section - Search and Primary Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="relative flex-1 lg:w-80">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search courses by name, ID, teacher, or department..."
              className="pl-9 pr-4 py-2 w-full"
              onChange={(e) => onSearch?.(e?.target?.value)}
            />
          </div>

          {/* Primary Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconSize={16}
              onClick={handleCreateCourse}
            >
              Create Course
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Calendar"
              iconSize={16}
              onClick={handleScheduleClasses}
            >
              Schedule Classes
            </Button>
          </div>
        </div>

        {/* Right Section - View Controls and Actions */}
        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              iconName="Grid3x3"
              iconSize={16}
              onClick={() => onViewModeChange?.('grid')}
              className="px-2 py-1"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              iconName="List"
              iconSize={16}
              onClick={() => onViewModeChange?.('list')}
              className="px-2 py-1"
            />
          </div>

          {/* Secondary Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="UserPlus"
              iconSize={16}
              onClick={handleAssignTeachers}
            >
              Assign Teachers
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconSize={16}
              onClick={() => onBulkOperation?.('export')}
            >
              Export
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="MoreHorizontal"
              iconSize={16}
            />
          </div>
        </div>
      </div>
      {/* Selection Info */}
      {selectedCount > 0 && (
        <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {selectedCount} course{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Calendar"
                iconSize={14}
                onClick={() => onBulkOperation?.('bulk_schedule')}
              >
                Bulk Schedule
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="UserCheck"
                iconSize={14}
                onClick={() => onBulkOperation?.('assign_teacher')}
              >
                Assign Teacher
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                iconSize={14}
                onClick={() => onBulkOperation?.('update_settings')}
              >
                Update Settings
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">156</div>
          <div className="text-xs text-muted-foreground">Total Courses</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">142</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-amber-600">8</div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600">6</div>
          <div className="text-xs text-muted-foreground">Cancelled</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">89.2%</div>
          <div className="text-xs text-muted-foreground">Avg Capacity</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">58</div>
          <div className="text-xs text-muted-foreground">Teachers</div>
        </div>
      </div>
    </div>
  );
};

export default CourseToolbar;