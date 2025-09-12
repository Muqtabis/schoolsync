import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ClassRoster = ({ 
  students, 
  selectedStudents, 
  onAttendanceUpdate, 
  onStudentSelection,
  selectedDate,
  selectedClass,
  selectedPeriod 
}) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const handleStudentSelect = (studentId, isSelected) => {
    const updatedSelection = isSelected
      ? [...selectedStudents, studentId]
      : selectedStudents?.filter(id => id !== studentId);
    onStudentSelection(updatedSelection);
  };

  const handleSelectAll = () => {
    const allStudentIds = students?.map(s => s?.id) || [];
    const areAllSelected = selectedStudents?.length === students?.length;
    onStudentSelection(areAllSelected ? [] : allStudentIds);
  };

  const getStatusColor = (status) => {
    const colors = {
      present: 'bg-green-100 text-green-800 border-green-200',
      absent: 'bg-red-100 text-red-800 border-red-200',
      tardy: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      excused: 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors?.[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status) => {
    const icons = {
      present: 'Check',
      absent: 'X',
      tardy: 'Clock',
      excused: 'CheckCircle'
    };
    return icons?.[status] || 'User';
  };

  const StudentCard = ({ student }) => (
    <div 
      className={`bg-card border rounded-lg p-4 hover:shadow-md transition-all duration-200 ${
        selectedStudents?.includes(student?.id) 
          ? 'border-blue-500 bg-blue-50' :'border-border'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Checkbox
            checked={selectedStudents?.includes(student?.id)}
            onChange={(checked) => handleStudentSelect(student?.id, checked)}
          />
          <div className="relative">
            <img
              src={student?.photo}
              alt={student?.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              onError={(e) => {
                e.target.src = '/public/assets/images/no_image.png';
              }}
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center ${getStatusColor(student?.status)}`}>
              <Icon name={getStatusIcon(student?.status)} size={10} />
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(student?.status)}`}>
          {student?.status?.toUpperCase()}
        </div>
      </div>

      <div className="mb-3">
        <h4 className="font-semibold text-foreground">{student?.name}</h4>
        <p className="text-sm text-muted-foreground">{student?.studentId}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          size="sm"
          variant={student?.status === 'present' ? 'solid' : 'outline'}
          className={`${student?.status === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}`}
          onClick={() => onAttendanceUpdate(student?.id, 'present')}
        >
          <Icon name="Check" size={14} className="mr-1" />
          Present
        </Button>
        <Button
          size="sm"
          variant={student?.status === 'absent' ? 'solid' : 'outline'}
          className={`${student?.status === 'absent' ? 'bg-red-600 hover:bg-red-700' : ''}`}
          onClick={() => onAttendanceUpdate(student?.id, 'absent')}
        >
          <Icon name="X" size={14} className="mr-1" />
          Absent
        </Button>
        <Button
          size="sm"
          variant={student?.status === 'tardy' ? 'solid' : 'outline'}
          className={`${student?.status === 'tardy' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
          onClick={() => onAttendanceUpdate(student?.id, 'tardy')}
        >
          <Icon name="Clock" size={14} className="mr-1" />
          Tardy
        </Button>
        <Button
          size="sm"
          variant={student?.status === 'excused' ? 'solid' : 'outline'}
          className={`${student?.status === 'excused' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
          onClick={() => onAttendanceUpdate(student?.id, 'excused')}
        >
          <Icon name="CheckCircle" size={14} className="mr-1" />
          Excused
        </Button>
      </div>
    </div>
  );

  const StudentRow = ({ student }) => (
    <div 
      className={`bg-card border-b border-border p-4 hover:bg-gray-50 transition-colors duration-150 ${
        selectedStudents?.includes(student?.id) ? 'bg-blue-50' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={selectedStudents?.includes(student?.id)}
            onChange={(checked) => handleStudentSelect(student?.id, checked)}
          />
          <div className="flex items-center space-x-3">
            <img
              src={student?.photo}
              alt={student?.name}
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
              onError={(e) => {
                e.target.src = '/public/assets/images/no_image.png';
              }}
            />
            <div>
              <h4 className="font-semibold text-foreground">{student?.name}</h4>
              <p className="text-sm text-muted-foreground">{student?.studentId}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(student?.status)}`}>
            <Icon name={getStatusIcon(student?.status)} size={14} className="mr-1 inline" />
            {student?.status?.toUpperCase()}
          </div>
          
          <div className="flex space-x-1">
            <Button
              size="sm"
              variant={student?.status === 'present' ? 'solid' : 'outline'}
              className={`${student?.status === 'present' ? 'bg-green-600 hover:bg-green-700' : ''}`}
              onClick={() => onAttendanceUpdate(student?.id, 'present')}
            >
              <Icon name="Check" size={14} />
            </Button>
            <Button
              size="sm"
              variant={student?.status === 'absent' ? 'solid' : 'outline'}
              className={`${student?.status === 'absent' ? 'bg-red-600 hover:bg-red-700' : ''}`}
              onClick={() => onAttendanceUpdate(student?.id, 'absent')}
            >
              <Icon name="X" size={14} />
            </Button>
            <Button
              size="sm"
              variant={student?.status === 'tardy' ? 'solid' : 'outline'}
              className={`${student?.status === 'tardy' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}`}
              onClick={() => onAttendanceUpdate(student?.id, 'tardy')}
            >
              <Icon name="Clock" size={14} />
            </Button>
            <Button
              size="sm"
              variant={student?.status === 'excused' ? 'solid' : 'outline'}
              className={`${student?.status === 'excused' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={() => onAttendanceUpdate(student?.id, 'excused')}
            >
              <Icon name="CheckCircle" size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Class Roster - {selectedClass} (Period {selectedPeriod})
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {students?.length} students • {selectedStudents?.length} selected
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              size="sm"
              variant="outline"
              onClick={handleSelectAll}
            >
              <Checkbox 
                checked={selectedStudents?.length === students?.length && students?.length > 0}
                onChange={handleSelectAll}
                className="mr-2"
              />
              Select All
            </Button>
            
            <div className="flex border border-border rounded-md">
              <button
                className={`px-3 py-1 text-sm font-medium ${
                  viewMode === 'grid' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                className={`px-3 py-1 text-sm font-medium border-l border-border ${
                  viewMode === 'list' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setViewMode('list')}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Status Legend */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Present</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-muted-foreground">Absent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-muted-foreground">Tardy</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-muted-foreground">Excused</span>
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {students?.map((student) => (
              <StudentCard key={student?.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="space-y-1 -mx-4">
            {students?.map((student) => (
              <StudentRow key={student?.id} student={student} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassRoster;