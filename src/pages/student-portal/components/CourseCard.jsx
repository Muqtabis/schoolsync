import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onViewDetails, onSubmitAssignment }) => {
  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-warning';
    if (grade >= 70) return 'text-accent';
    return 'text-error';
  };

  const getAttendanceColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${course?.color}`}>
            <Icon name={course?.icon} size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{course?.name}</h3>
            <p className="text-sm text-muted-foreground">{course?.teacher}</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-lg font-bold ${getGradeColor(course?.currentGrade)}`}>
            {course?.currentGrade}%
          </p>
          <p className="text-xs text-muted-foreground">Current Grade</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Next Class</span>
          </div>
          <p className="text-sm text-muted-foreground">{course?.nextClass}</p>
        </div>
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Room</span>
          </div>
          <p className="text-sm text-muted-foreground">{course?.room}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="Users" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {course?.attendance}% Attendance
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {course?.pendingAssignments} Pending
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          iconName="Eye"
          iconPosition="left"
          onClick={() => onViewDetails(course)}
          className="flex-1"
        >
          View Details
        </Button>
        {course?.pendingAssignments > 0 && (
          <Button
            variant="default"
            size="sm"
            iconName="Upload"
            iconPosition="left"
            onClick={() => onSubmitAssignment(course)}
            className="flex-1"
          >
            Submit Work
          </Button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;