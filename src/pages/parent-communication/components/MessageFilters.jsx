import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const MessageFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const senderTypeOptions = [
    { value: 'all', label: 'All Senders' },
    { value: 'teacher', label: 'Teachers' },
    { value: 'admin', label: 'Administration' },
    { value: 'school', label: 'School-wide' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'academic', label: 'Academic Progress' },
    { value: 'attendance', label: 'Attendance' },
    { value: 'behavior', label: 'Behavior' },
    { value: 'events', label: 'School Events' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'health', label: 'Health & Safety' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High Priority' },
    { value: 'normal', label: 'Normal' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Messages' },
    { value: 'unread', label: 'Unread Only' },
    { value: 'read', label: 'Read Only' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Select
          placeholder="Sender Type"
          options={senderTypeOptions}
          value={filters?.senderType}
          onChange={(value) => onFilterChange('senderType', value)}
          className="min-w-0"
        />

        <Select
          placeholder="Category"
          options={categoryOptions}
          value={filters?.category}
          onChange={(value) => onFilterChange('category', value)}
          className="min-w-0"
        />

        <Select
          placeholder="Priority"
          options={priorityOptions}
          value={filters?.priority}
          onChange={(value) => onFilterChange('priority', value)}
          className="min-w-0"
        />

        <Select
          placeholder="Status"
          options={statusOptions}
          value={filters?.status}
          onChange={(value) => onFilterChange('status', value)}
          className="min-w-0"
        />

        <Input
          type="search"
          placeholder="Search messages..."
          value={filters?.search}
          onChange={(e) => onFilterChange('search', e?.target?.value)}
          className="min-w-0"
        />

        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="RotateCcw"
            iconSize={16}
            onClick={onClearFilters}
            className="flex-1"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MessageFilters;