import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GradebookSpreadsheet = ({ 
  students, 
  assignments, 
  grades, 
  onGradeUpdate, 
  onAddAssignment,
  selectedPeriod,
  onPeriodChange 
}) => {
  const [editingCell, setEditingCell] = useState(null);
  const [tempGrade, setTempGrade] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const gradingPeriods = [
    { value: 'q1', label: 'Quarter 1' },
    { value: 'q2', label: 'Quarter 2' },
    { value: 'q3', label: 'Quarter 3' },
    { value: 'q4', label: 'Quarter 4' },
    { value: 'semester1', label: 'Semester 1' },
    { value: 'semester2', label: 'Semester 2' },
    { value: 'year', label: 'Full Year' }
  ];

  const handleCellClick = (studentId, assignmentId) => {
    setEditingCell(`${studentId}-${assignmentId}`);
    const currentGrade = grades?.find(g => g?.studentId === studentId && g?.assignmentId === assignmentId);
    setTempGrade(currentGrade ? currentGrade?.score : '');
  };

  const handleGradeSubmit = (studentId, assignmentId) => {
    if (tempGrade !== '') {
      onGradeUpdate(studentId, assignmentId, tempGrade);
    }
    setEditingCell(null);
    setTempGrade('');
  };

  const handleKeyPress = (e, studentId, assignmentId) => {
    if (e?.key === 'Enter') {
      handleGradeSubmit(studentId, assignmentId);
    } else if (e?.key === 'Escape') {
      setEditingCell(null);
      setTempGrade('');
    }
  };

  const getGradeForCell = (studentId, assignmentId) => {
    const grade = grades?.find(g => g?.studentId === studentId && g?.assignmentId === assignmentId);
    return grade ? grade?.score : '';
  };

  const calculateStudentAverage = (studentId) => {
    const studentGrades = grades?.filter(g => g?.studentId === studentId);
    if (studentGrades?.length === 0) return 0;
    
    const total = studentGrades?.reduce((sum, grade) => sum + parseFloat(grade?.score || 0), 0);
    return (total / studentGrades?.length)?.toFixed(1);
  };

  const getGradeColor = (score) => {
    const numScore = parseFloat(score);
    if (numScore >= 90) return 'text-success';
    if (numScore >= 80) return 'text-primary';
    if (numScore >= 70) return 'text-warning';
    if (numScore >= 60) return 'text-orange-500';
    return 'text-error';
  };

  const sortStudents = (students) => {
    if (!sortConfig?.key) return students;
    
    return [...students]?.sort((a, b) => {
      let aValue, bValue;
      
      if (sortConfig?.key === 'average') {
        aValue = parseFloat(calculateStudentAverage(a?.id));
        bValue = parseFloat(calculateStudentAverage(b?.id));
      } else {
        aValue = a?.[sortConfig?.key];
        bValue = b?.[sortConfig?.key];
      }
      
      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedStudents = sortStudents(students);

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Select
              label="Grading Period"
              options={gradingPeriods}
              value={selectedPeriod}
              onChange={onPeriodChange}
              className="w-48"
            />
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              size="sm"
            >
              Export Grades
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              size="sm"
            >
              Import Grades
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddAssignment}
            >
              Add Assignment
            </Button>
          </div>
        </div>
      </div>
      {/* Spreadsheet Container */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="sticky left-0 z-10 bg-muted px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    Student Name
                    <Icon 
                      name={sortConfig?.key === 'name' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={16} 
                    />
                  </button>
                </th>
                {assignments?.map((assignment) => (
                  <th key={assignment?.id} className="px-3 py-3 text-center min-w-24">
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-xs font-medium text-foreground truncate max-w-20" title={assignment?.title}>
                        {assignment?.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {assignment?.points}pts
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment?.category === 'exam' ? 'bg-error/10 text-error' :
                        assignment?.category === 'quiz' ? 'bg-warning/10 text-warning' :
                        assignment?.category === 'homework'? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
                      }`}>
                        {assignment?.category}
                      </span>
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleSort('average')}
                    className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    Average
                    <Icon 
                      name={sortConfig?.key === 'average' && sortConfig?.direction === 'desc' ? 'ChevronDown' : 'ChevronUp'} 
                      size={16} 
                    />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents?.map((student, index) => (
                <tr key={student?.id} className={`border-b border-border hover:bg-muted/50 ${
                  index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                }`}>
                  <td className="sticky left-0 z-10 bg-inherit px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-primary-foreground">
                          {student?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{student?.name}</p>
                        <p className="text-xs text-muted-foreground">ID: {student?.studentId}</p>
                      </div>
                    </div>
                  </td>
                  {assignments?.map((assignment) => {
                    const cellKey = `${student?.id}-${assignment?.id}`;
                    const isEditing = editingCell === cellKey;
                    const grade = getGradeForCell(student?.id, assignment?.id);
                    
                    return (
                      <td key={assignment?.id} className="px-3 py-3 text-center">
                        {isEditing ? (
                          <Input
                            type="text"
                            value={tempGrade}
                            onChange={(e) => setTempGrade(e?.target?.value)}
                            onBlur={() => handleGradeSubmit(student?.id, assignment?.id)}
                            onKeyDown={(e) => handleKeyPress(e, student?.id, assignment?.id)}
                            className="w-16 text-center text-sm"
                            autoFocus
                          />
                        ) : (
                          <button
                            onClick={() => handleCellClick(student?.id, assignment?.id)}
                            className={`w-16 h-8 rounded border border-border hover:border-primary transition-colors ${
                              grade ? getGradeColor(grade) : 'text-muted-foreground'
                            } ${grade ? 'bg-background' : 'bg-muted/30'}`}
                          >
                            <span className="text-sm font-medium">
                              {grade || '-'}
                            </span>
                          </button>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-sm font-semibold ${getGradeColor(calculateStudentAverage(student?.id))}`}>
                        {calculateStudentAverage(student?.id)}%
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {parseFloat(calculateStudentAverage(student?.id)) >= 90 ? 'A' :
                         parseFloat(calculateStudentAverage(student?.id)) >= 80 ? 'B' :
                         parseFloat(calculateStudentAverage(student?.id)) >= 70 ? 'C' :
                         parseFloat(calculateStudentAverage(student?.id)) >= 60 ? 'D' : 'F'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Footer Summary */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>Total Students: {students?.length}</span>
            <span>Total Assignments: {assignments?.length}</span>
            <span>Completion Rate: {Math.round((grades?.length / (students?.length * assignments?.length)) * 100)}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button variant="default" size="sm">
              Publish Grades
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradebookSpreadsheet;