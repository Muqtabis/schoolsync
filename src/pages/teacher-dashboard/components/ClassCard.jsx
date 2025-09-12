import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ClassCard = ({ classData, onTakeAttendance, onPostAnnouncement, onAccessGradebook }) => {
  const getAttendanceColor = (rate) => {
    if (rate >= 90) return 'text-success';
    if (rate >= 75) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">{classData?.subject}</h3>
          <p className="text-sm text-muted-foreground">{classData?.grade} • {classData?.section}</p>
        </div>
        <div className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md">
          <Icon name="Users" size={14} />
          <span className="text-sm font-medium">{classData?.enrolledStudents}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Attendance Rate</p>
          <p className={`text-lg font-semibold ${getAttendanceColor(classData?.attendanceRate)}`}>
            {classData?.attendanceRate}%
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-1">Pending Assignments</p>
          <p className="text-lg font-semibold text-foreground">{classData?.pendingAssignments}</p>
        </div>
      </div>
      {classData?.upcomingDeadline && (
        <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <div>
              <p className="text-sm font-medium text-foreground">Upcoming Deadline</p>
              <p className="text-xs text-muted-foreground">{classData?.upcomingDeadline}</p>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="default"
          size="sm"
          iconName="UserCheck"
          iconPosition="left"
          onClick={() => onTakeAttendance(classData?.id)}
          className="flex-1 sm:flex-none"
        >
          Attendance
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="Megaphone"
          iconPosition="left"
          onClick={() => onPostAnnouncement(classData?.id)}
          className="flex-1 sm:flex-none"
        >
          Announce
        </Button>
        <Button
          variant="ghost"
          size="sm"
          iconName="BookOpen"
          iconPosition="left"
          onClick={() => onAccessGradebook(classData?.id)}
          className="flex-1 sm:flex-none"
        >
          Gradebook
        </Button>
      </div>
    </div>
  );
};

export default ClassCard;