import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkOperations = ({ selectedCount = 0, onBulkOperation, onClearSelection }) => {
  const operations = [
    {
      key: 'update_status',
      label: 'Update Status',
      icon: 'UserCheck',
      variant: 'outline',
      description: 'Change enrollment status for selected students'
    },
    {
      key: 'send_message',
      label: 'Send Message',
      icon: 'Mail',
      variant: 'outline',
      description: 'Send message to selected students and guardians'
    },
    {
      key: 'schedule_meeting',
      label: 'Schedule Meeting',
      icon: 'Calendar',
      variant: 'outline',
      description: 'Schedule meetings with selected students'
    },
    {
      key: 'generate_report',
      label: 'Generate Report',
      icon: 'FileText',
      variant: 'outline',
      description: 'Generate performance reports for selected students'
    },
    {
      key: 'export_data',
      label: 'Export Data',
      icon: 'Download',
      variant: 'outline',
      description: 'Export selected student data to CSV/Excel'
    },
    {
      key: 'assign_counselor',
      label: 'Assign Counselor',
      icon: 'UserPlus',
      variant: 'outline',
      description: 'Assign academic counselor to selected students'
    }
  ];

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="CheckCircle2" size={20} className="text-primary" />
          <div>
            <h3 className="font-semibold text-foreground">Bulk Operations</h3>
            <p className="text-sm text-muted-foreground">
              {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          iconSize={16}
          onClick={onClearSelection}
          className="text-muted-foreground hover:text-foreground"
        >
          Clear Selection
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-4">
        {operations?.slice(0, 3)?.map((operation) => (
          <Button
            key={operation?.key}
            variant={operation?.variant}
            size="sm"
            iconName={operation?.icon}
            iconSize={14}
            onClick={() => onBulkOperation?.(operation?.key)}
            className="flex-shrink-0"
          >
            {operation?.label}
          </Button>
        ))}
        
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
          iconSize={16}
          className="text-muted-foreground"
        >
          More Actions
        </Button>
      </div>

      {/* All Operations Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {operations?.map((operation) => (
          <div
            key={operation?.key}
            className="group cursor-pointer bg-white border border-border rounded-lg p-3 hover:border-primary/30 hover:shadow-sm transition-all"
            onClick={() => onBulkOperation?.(operation?.key)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Icon 
                  name={operation?.icon} 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors" 
                />
              </div>
              <div>
                <div className="text-xs font-medium text-foreground group-hover:text-primary transition-colors">
                  {operation?.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Operation Confirmation */}
      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-center">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Info" size={16} className="text-amber-600" />
          <span className="text-sm text-amber-800">
            Bulk operations will be applied to all {selectedCount} selected students.
          </span>
        </div>
      </div>
    </div>
  );
};

export default BulkOperations;