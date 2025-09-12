import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentDirectory = ({ 
  searchTerm, 
  filters, 
  selectedStudents = [], 
  onStudentSelect, 
  viewMode = 'grid' 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 12;

  // Mock student data
  const mockStudents = [
    {
      id: 'STU2024001',
      name: 'Emma Thompson',
      photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      email: 'emma.thompson@student.schoolsync.edu',
      grade: '10',
      enrollmentStatus: 'active',
      performance: 'excellent',
      attendance: '96%',
      guardian: 'Michael Thompson',
      guardianPhone: '+1 (555) 123-4567',
      lastActive: '2024-12-12',
      alerts: ['Honor Roll', 'Perfect Attendance']
    },
    {
      id: 'STU2024002',
      name: 'James Wilson',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      email: 'james.wilson@student.schoolsync.edu',
      grade: '11',
      enrollmentStatus: 'active',
      performance: 'good',
      attendance: '92%',
      guardian: 'Sarah Wilson',
      guardianPhone: '+1 (555) 234-5678',
      lastActive: '2024-12-12',
      alerts: []
    },
    {
      id: 'STU2024003',
      name: 'Sophia Garcia',
      photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      email: 'sophia.garcia@student.schoolsync.edu',
      grade: '9',
      enrollmentStatus: 'active',
      performance: 'excellent',
      attendance: '98%',
      guardian: 'Carlos Garcia',
      guardianPhone: '+1 (555) 345-6789',
      lastActive: '2024-12-12',
      alerts: ['Dean\'s List']
    },
    {
      id: 'STU2024004',
      name: 'Liam Johnson',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      email: 'liam.johnson@student.schoolsync.edu',
      grade: '12',
      enrollmentStatus: 'active',
      performance: 'satisfactory',
      attendance: '89%',
      guardian: 'Jennifer Johnson',
      guardianPhone: '+1 (555) 456-7890',
      lastActive: '2024-12-11',
      alerts: ['Attendance Concern']
    },
    {
      id: 'STU2024005',
      name: 'Olivia Brown',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      email: 'olivia.brown@student.schoolsync.edu',
      grade: '10',
      enrollmentStatus: 'active',
      performance: 'good',
      attendance: '94%',
      guardian: 'David Brown',
      guardianPhone: '+1 (555) 567-8901',
      lastActive: '2024-12-12',
      alerts: ['Student Council']
    },
    {
      id: 'STU2024006',
      name: 'Noah Davis',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      email: 'noah.davis@student.schoolsync.edu',
      grade: '11',
      enrollmentStatus: 'inactive',
      performance: 'needs_improvement',
      attendance: '78%',
      guardian: 'Lisa Davis',
      guardianPhone: '+1 (555) 678-9012',
      lastActive: '2024-12-08',
      alerts: ['Academic Warning', 'Attendance Issue']
    }
  ];

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return mockStudents?.filter(student => {
      const matchesSearch = !searchTerm || 
        student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesGrade = !filters?.gradeLevel || student?.grade === filters?.gradeLevel;
      const matchesStatus = !filters?.enrollmentStatus || student?.enrollmentStatus === filters?.enrollmentStatus;
      const matchesPerformance = !filters?.academicPerformance || student?.performance === filters?.academicPerformance;

      return matchesSearch && matchesGrade && matchesStatus && matchesPerformance;
    });
  }, [searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents?.length / studentsPerPage);
  const startIndex = (currentPage - 1) * studentsPerPage;
  const paginatedStudents = filteredStudents?.slice(startIndex, startIndex + studentsPerPage);

  const handleStudentToggle = (studentId) => {
    const isSelected = selectedStudents?.includes(studentId);
    const newSelection = isSelected 
      ? selectedStudents?.filter(id => id !== studentId)
      : [...selectedStudents, studentId];
    
    onStudentSelect?.(newSelection);
  };

  const handleSelectAll = () => {
    const allIds = paginatedStudents?.map(student => student?.id);
    const allSelected = allIds?.every(id => selectedStudents?.includes(id));
    
    if (allSelected) {
      // Unselect all on current page
      const newSelection = selectedStudents?.filter(id => !allIds?.includes(id));
      onStudentSelect?.(newSelection);
    } else {
      // Select all on current page
      const newSelection = [...new Set([...selectedStudents, ...allIds])];
      onStudentSelect?.(newSelection);
    }
  };

  const getPerformanceBadgeColor = (performance) => {
    switch (performance) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'satisfactory': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'needs_improvement': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'graduated': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg">
        {/* List Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={paginatedStudents?.every(student => selectedStudents?.includes(student?.id))}
                indeterminate={paginatedStudents?.some(student => selectedStudents?.includes(student?.id)) && !paginatedStudents?.every(student => selectedStudents?.includes(student?.id))}
                onCheckedChange={handleSelectAll}
                label="Select All"
              />
              <span className="text-sm text-muted-foreground">
                {filteredStudents?.length} students found
              </span>
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-border">
          {paginatedStudents?.map((student) => (
            <div key={student?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedStudents?.includes(student?.id)}
                    onCheckedChange={() => handleStudentToggle(student?.id)}
                  />
                  
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary">
                    <img 
                      src={student?.photo} 
                      alt={student?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground">{student?.name}</h3>
                      <span className="text-sm text-muted-foreground">({student?.id})</span>
                      <span className={`px-2 py-1 text-xs border rounded-full ${getStatusBadgeColor(student?.enrollmentStatus)}`}>
                        {student?.enrollmentStatus}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>Grade {student?.grade}</span>
                      <span>•</span>
                      <span>{student?.email}</span>
                      <span>•</span>
                      <span>Attendance: {student?.attendance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 text-xs border rounded-full ${getPerformanceBadgeColor(student?.performance)}`}>
                    {student?.performance?.replace('_', ' ')}
                  </span>
                  
                  {student?.alerts?.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Icon name="AlertTriangle" size={14} className="text-amber-500" />
                      <span className="text-xs text-muted-foreground">{student?.alerts?.length}</span>
                    </div>
                  )}

                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" iconSize={16} />
                    <Button variant="ghost" size="sm" iconName="Edit" iconSize={16} />
                    <Button variant="ghost" size="sm" iconName="MessageCircle" iconSize={16} />
                    <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  iconSize={16}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronRight"
                  iconSize={16}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Grid View
  return (
    <div className="space-y-6">
      {/* Grid Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Checkbox
            checked={paginatedStudents?.every(student => selectedStudents?.includes(student?.id))}
            indeterminate={paginatedStudents?.some(student => selectedStudents?.includes(student?.id)) && !paginatedStudents?.every(student => selectedStudents?.includes(student?.id))}
            onCheckedChange={handleSelectAll}
            label="Select All"
          />
          <span className="text-sm text-muted-foreground">
            {filteredStudents?.length} students found
          </span>
        </div>
      </div>

      {/* Student Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedStudents?.map((student) => (
          <div key={student?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Checkbox
                checked={selectedStudents?.includes(student?.id)}
                onCheckedChange={() => handleStudentToggle(student?.id)}
              />
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
            </div>

            <div className="text-center mb-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary mx-auto mb-3">
                <img 
                  src={student?.photo} 
                  alt={student?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground">{student?.name}</h3>
              <p className="text-sm text-muted-foreground">{student?.id}</p>
              <p className="text-xs text-muted-foreground mt-1">{student?.email}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Grade:</span>
                <span className="font-medium">{student?.grade}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                <span className={`px-2 py-1 text-xs border rounded-full ${getStatusBadgeColor(student?.enrollmentStatus)}`}>
                  {student?.enrollmentStatus}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Performance:</span>
                <span className={`px-2 py-1 text-xs border rounded-full ${getPerformanceBadgeColor(student?.performance)}`}>
                  {student?.performance?.replace('_', ' ')}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Attendance:</span>
                <span className="font-medium">{student?.attendance}</span>
              </div>

              <div className="border-t border-border pt-3">
                <div className="text-xs text-muted-foreground mb-1">Guardian:</div>
                <div className="text-sm font-medium">{student?.guardian}</div>
                <div className="text-xs text-muted-foreground">{student?.guardianPhone}</div>
              </div>

              {student?.alerts?.length > 0 && (
                <div className="border-t border-border pt-3">
                  <div className="flex items-center space-x-1 mb-2">
                    <Icon name="AlertTriangle" size={14} className="text-amber-500" />
                    <span className="text-xs font-medium text-foreground">Alerts</span>
                  </div>
                  <div className="space-y-1">
                    {student?.alerts?.map((alert, index) => (
                      <div key={index} className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded">
                        {alert}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
              <Button variant="outline" size="sm" iconName="Eye" iconSize={14} className="flex-1">
                View
              </Button>
              <Button variant="outline" size="sm" iconName="Edit" iconSize={14} className="flex-1">
                Edit
              </Button>
              <Button variant="outline" size="sm" iconName="MessageCircle" iconSize={14} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            iconSize={16}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          >
            Previous
          </Button>
          
          <span className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default StudentDirectory;