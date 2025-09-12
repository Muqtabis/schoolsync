import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GradesSummary = ({ grades, onViewDetails }) => {
  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-success';
    if (grade >= 80) return 'text-warning';
    if (grade >= 70) return 'text-accent';
    return 'text-error';
  };

  const getGradeIcon = (grade) => {
    if (grade >= 90) return 'TrendingUp';
    if (grade >= 80) return 'Minus';
    return 'TrendingDown';
  };

  const calculateGPA = (grades) => {
    if (!grades || grades?.length === 0) return 0;
    const total = grades?.reduce((sum, grade) => sum + grade?.percentage, 0);
    return (total / grades?.length / 25)?.toFixed(2); // Convert to 4.0 scale
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Academic Performance</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={onViewDetails}
        >
          View All Grades
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Target" size={24} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">{calculateGPA(grades)}</p>
          <p className="text-sm text-muted-foreground">Current GPA</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="BookOpen" size={24} className="text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">{grades?.length || 0}</p>
          <p className="text-sm text-muted-foreground">Courses</p>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Icon name="Award" size={24} className="text-success" />
          </div>
          <p className="text-2xl font-bold text-foreground">
            {grades?.filter(g => g?.percentage >= 90)?.length || 0}
          </p>
          <p className="text-sm text-muted-foreground">A Grades</p>
        </div>
      </div>
      <div className="space-y-3">
        <h4 className="text-base font-medium text-foreground mb-3">Recent Grades</h4>
        {grades?.slice(0, 5)?.map((grade, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon 
                name={getGradeIcon(grade?.percentage)} 
                size={16} 
                className={getGradeColor(grade?.percentage)} 
              />
              <div>
                <p className="text-sm font-medium text-foreground">{grade?.subject}</p>
                <p className="text-xs text-muted-foreground">{grade?.assignment}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-bold ${getGradeColor(grade?.percentage)}`}>
                {grade?.percentage}%
              </p>
              <p className="text-xs text-muted-foreground">{grade?.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GradesSummary;