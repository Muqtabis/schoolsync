import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const StudentFilters = ({ filters = {}, onFilterChange }) => {
  const gradeOptions = [
    { value: '', label: 'All Grades' },
    { value: '9', label: 'Grade 9' },
    { value: '10', label: 'Grade 10' },
    { value: '11', label: 'Grade 11' },
    { value: '12', label: 'Grade 12' }
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'graduated', label: 'Graduated' },
    { value: 'transferred', label: 'Transferred' }
  ];

  const performanceOptions = [
    { value: '', label: 'All Performance' },
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'satisfactory', label: 'Satisfactory' },
    { value: 'needs_improvement', label: 'Needs Improvement' }
  ];

  const attendanceOptions = [
    { value: '', label: 'All Attendance' },
    { value: '90-100', label: '90-100%' },
    { value: '80-89', label: '80-89%' },
    { value: '70-79', label: '70-79%' },
    { value: 'below-70', label: 'Below 70%' }
  ];

  const handleClearFilters = () => {
    onFilterChange?.('gradeLevel', '');
    onFilterChange?.('enrollmentStatus', '');
    onFilterChange?.('academicPerformance', '');
    onFilterChange?.('attendance', '');
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Grade Level Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Grade Level
          </label>
          <Select
            value={filters?.gradeLevel || ''}
            onValueChange={(value) => onFilterChange?.('gradeLevel', value)}
            options={gradeOptions}
            placeholder="Select grade..."
          />
        </div>

        {/* Enrollment Status Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Enrollment Status
          </label>
          <Select
            value={filters?.enrollmentStatus || ''}
            onValueChange={(value) => onFilterChange?.('enrollmentStatus', value)}
            options={statusOptions}
            placeholder="Select status..."
          />
        </div>

        {/* Academic Performance Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Academic Performance
          </label>
          <Select
            value={filters?.academicPerformance || ''}
            onValueChange={(value) => onFilterChange?.('academicPerformance', value)}
            options={performanceOptions}
            placeholder="Select performance..."
          />
        </div>

        {/* Attendance Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Attendance Range
          </label>
          <Select
            value={filters?.attendance || ''}
            onValueChange={(value) => onFilterChange?.('attendance', value)}
            options={attendanceOptions}
            placeholder="Select attendance..."
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
          {filters?.gradeLevel && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>Grade {filters?.gradeLevel}</span>
              <button
                onClick={() => onFilterChange?.('gradeLevel', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.enrollmentStatus && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>{filters?.enrollmentStatus}</span>
              <button
                onClick={() => onFilterChange?.('enrollmentStatus', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.academicPerformance && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>{filters?.academicPerformance}</span>
              <button
                onClick={() => onFilterChange?.('academicPerformance', '')}
                className="ml-2 hover:bg-primary/20 rounded-full p-0.5"
              >
                <span className="text-xs">×</span>
              </button>
            </div>
          )}
          
          {filters?.attendance && (
            <div className="inline-flex items-center space-x-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
              <span>Attendance: {filters?.attendance}</span>
              <button
                onClick={() => onFilterChange?.('attendance', '')}
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

export default StudentFilters;