import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CourseFilters = ({ filters = {}, onFilterChange }) => {
  const departmentOptions = [
    { value: '', label: 'All Departments' },
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Arts', label: 'Arts' },
    { value: 'Physical Education', label: 'Physical Education' },
    { value: 'Foreign Languages', label: 'Foreign Languages' },
    { value: 'Computer Science', label: 'Computer Science' }
  ];

  const semesterOptions = [
    { value: '', label: 'All Semesters' },
    { value: 'Fall 2024', label: 'Fall 2024' },
    { value: 'Spring 2025', label: 'Spring 2025' },
    { value: 'Summer 2025', label: 'Summer 2025' },
    { value: 'Fall 2025', label: 'Fall 2025' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const capacityOptions = [
    { value: '', label: 'All Capacity' },
    { value: 'full', label: 'Full (90%+)' },
    { value: 'near-full', label: 'Near Full (75-89%)' },
    { value: 'available', label: 'Available (<75%)' }
  ];

  const gradeOptions = [
    { value: '', label: 'All Grades' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' }
  ];

  const creditOptions = [
    { value: '', label: 'All Credits' },
    { value: '1', label: '1 Credit' },
    { value: '2', label: '2 Credits' },
    { value: '3', label: '3 Credits' },
    { value: '4', label: '4 Credits' },
    { value: '5+', label: '5+ Credits' }
  ];

  const handleClearFilters = () => {
    onFilterChange?.('department', '');
    onFilterChange?.('semester', '');
    onFilterChange?.('status', '');
    onFilterChange?.('capacity', '');
    onFilterChange?.('grade', '');
    onFilterChange?.('credits', '');
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value);

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Department Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Department
          </label>
          <Select
            value={filters?.department || ''}
            onValueChange={(value) => onFilterChange?.('department', value)}
            options={departmentOptions}
            placeholder="Select department..."
          />
        </div>

        {/* Semester Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Semester
          </label>
          <Select
            value={filters?.semester || ''}
            onValueChange={(value) => onFilterChange?.('semester', value)}
            options={semesterOptions}
            placeholder="Select semester..."
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <Select
            value={filters?.status || ''}
            onValueChange={(value) => onFilterChange?.('status', value)}
            options={statusOptions}
            placeholder="Select status..."
          />
        </div>

        {/* Capacity Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Capacity
          </label>
          <Select
            value={filters?.capacity || ''}
            onValueChange={(value) => onFilterChange?.('capacity', value)}
            options={capacityOptions}
            placeholder="Select capacity..."
          />
        </div>

        {/* Grade Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Grade Level
          </label>
          <Select
            value={filters?.grade || ''}
            onValueChange={(value) => onFilterChange?.('grade', value)}
            options={gradeOptions}
            placeholder="Select grade..."
          />
        </div>

        {/* Credits Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Credits
          </label>
          <Select
            value={filters?.credits || ''}
            onValueChange={(value) => onFilterChange?.('credits', value)}
            options={creditOptions}
            placeholder="Select credits..."
          />
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          iconName="Filter"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        >
          Advanced Filters
        </Button>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filters?.department && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>{filters?.department}</span>
              <button
                onClick={() => onFilterChange?.('department', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.semester && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>{filters?.semester}</span>
              <button
                onClick={() => onFilterChange?.('semester', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.status && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>{filters?.status}</span>
              <button
                onClick={() => onFilterChange?.('status', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.capacity && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>Capacity: {filters?.capacity}</span>
              <button
                onClick={() => onFilterChange?.('capacity', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.grade && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>Grade {filters?.grade}</span>
              <button
                onClick={() => onFilterChange?.('grade', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.credits && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>{filters?.credits} Credit{filters?.credits !== '1' ? 's' : ''}</span>
              <button
                onClick={() => onFilterChange?.('credits', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseFilters;