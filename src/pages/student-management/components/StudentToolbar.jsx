import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const StudentToolbar = ({ 
  onSearch, 
  selectedCount = 0, 
  onBulkOperation,
  viewMode = 'grid',
  onViewModeChange 
}) => {
  const handleAddStudent = () => {
    console.log('Add new student clicked');
    // Handle add student logic
  };

  const handleBulkImport = () => {
    console.log('Bulk import clicked');
    onBulkOperation?.('bulk_import');
  };

  const handleGenerateReports = () => {
    console.log('Generate reports clicked');
    onBulkOperation?.('generate_reports');
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
              placeholder="Search students by name, ID, or email..."
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
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
              iconSize={16}
              onClick={handleBulkImport}
            >
              Bulk Import
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
              iconName="FileText"
              iconSize={16}
              onClick={handleGenerateReports}
            >
              Reports
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
                {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Mail"
                iconSize={14}
                onClick={() => onBulkOperation?.('send_message')}
              >
                Message
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="UserCheck"
                iconSize={14}
                onClick={() => onBulkOperation?.('update_status')}
              >
                Update Status
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                iconName="Calendar"
                iconSize={14}
                onClick={() => onBulkOperation?.('schedule_meeting')}
              >
                Schedule
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Quick Stats */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="text-center">
          <div className="text-lg font-semibold text-foreground">1,450</div>
          <div className="text-xs text-muted-foreground">Total Students</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-green-600">1,398</div>
          <div className="text-xs text-muted-foreground">Active</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-red-600">52</div>
          <div className="text-xs text-muted-foreground">Inactive</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-amber-600">23</div>
          <div className="text-xs text-muted-foreground">Alerts</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-blue-600">94.2%</div>
          <div className="text-xs text-muted-foreground">Avg Attendance</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-purple-600">187</div>
          <div className="text-xs text-muted-foreground">New This Year</div>
        </div>
      </div>
    </div>
  );
};

export default StudentToolbar;