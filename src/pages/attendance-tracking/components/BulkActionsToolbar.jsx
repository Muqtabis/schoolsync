import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActionsToolbar = ({ selectedStudents, onBulkUpdate, onMarkAllPresent }) => {
  const [showActionsMenu, setShowActionsMenu] = useState(false);

  const bulkActions = [
    {
      label: "Mark Present",
      value: "present",
      icon: "Check",
      color: "bg-green-600 hover:bg-green-700",
      description: "Mark selected students as present"
    },
    {
      label: "Mark Absent",
      value: "absent",
      icon: "X",
      color: "bg-red-600 hover:bg-red-700",
      description: "Mark selected students as absent"
    },
    {
      label: "Mark Tardy",
      value: "tardy",
      icon: "Clock",
      color: "bg-yellow-600 hover:bg-yellow-700",
      description: "Mark selected students as tardy"
    },
    {
      label: "Mark Excused",
      value: "excused",
      icon: "CheckCircle",
      color: "bg-blue-600 hover:bg-blue-700",
      description: "Mark selected students as excused"
    }
  ];

  const handleBulkAction = (status) => {
    onBulkUpdate(status);
    setShowActionsMenu(false);
  };

  const handleGenerateReport = () => {
    // Mock report generation
    const reportData = {
      date: new Date()?.toLocaleDateString(),
      selectedStudents: selectedStudents?.length,
      timestamp: new Date()?.toISOString()
    };
    
    console.log('Generating attendance report:', reportData);
    alert(`Report generated for ${selectedStudents?.length} students`);
  };

  const handleSendNotifications = () => {
    // Mock notification sending
    console.log('Sending notifications for selected students:', selectedStudents);
    alert(`Notifications sent to parents of ${selectedStudents?.length} students`);
  };

  if (selectedStudents?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Users" size={20} className="text-muted-foreground" />
            <div>
              <h4 className="text-md font-medium text-foreground">Bulk Actions</h4>
              <p className="text-sm text-muted-foreground">Select students to perform bulk operations</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button onClick={onMarkAllPresent} className="bg-green-600 hover:bg-green-700">
              <Icon name="Check" size={16} className="mr-2" />
              Mark All Present
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {selectedStudents?.length} selected
          </div>
          <div>
            <h4 className="text-md font-medium text-foreground">Bulk Actions</h4>
            <p className="text-sm text-muted-foreground">
              {selectedStudents?.length} student{selectedStudents?.length !== 1 ? 's' : ''} selected for bulk operations
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Quick Actions */}
          <div className="flex space-x-1">
            {bulkActions?.map((action) => (
              <Button
                key={action?.value}
                size="sm"
                className={action?.color}
                onClick={() => handleBulkAction(action?.value)}
                title={action?.description}
              >
                <Icon name={action?.icon} size={14} className="mr-1" />
                {action?.label}
              </Button>
            ))}
          </div>

          <div className="w-px h-6 bg-border mx-2"></div>

          {/* Primary Actions */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handleGenerateReport}
              className="border-gray-300 hover:bg-gray-50"
            >
              <Icon name="FileText" size={16} className="mr-2" />
              Generate Report
            </Button>
            
            <Button
              variant="outline"
              onClick={handleSendNotifications}
              className="border-blue-300 hover:bg-blue-50 text-blue-700"
            >
              <Icon name="Send" size={16} className="mr-2" />
              Send Notifications
            </Button>
            
            <Button onClick={onMarkAllPresent} className="bg-green-600 hover:bg-green-700">
              <Icon name="CheckCircle2" size={16} className="mr-2" />
              Mark All Present
            </Button>
          </div>
        </div>
      </div>

      {/* Action Confirmation Bar */}
      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-blue-800">
            <Icon name="Info" size={16} />
            <span>
              Use keyboard shortcuts: Ctrl+A (select all), Ctrl+P (mark present), Ctrl+X (clear selection)
            </span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onBulkUpdate(null)}
            className="text-blue-700 border-blue-300 hover:bg-blue-100"
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear Selection
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsToolbar;