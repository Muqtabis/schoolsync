import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const CourseCatalog = ({ 
  searchTerm, 
  filters, 
  selectedCourses = [], 
  onCourseSelect, 
  viewMode = 'grid' 
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Mock course data
  const mockCourses = [
    {
      id: 'MATH101',
      name: 'Algebra I',
      description: 'Fundamental algebraic concepts and problem-solving techniques',
      department: 'Mathematics',
      teacher: 'Dr. Emily Johnson',
      teacherId: 'T001',
      teacherAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      semester: 'Fall 2024',
      credits: 3,
      capacity: 30,
      enrolled: 28,
      status: 'active',
      schedule: 'MWF 9:00-10:00 AM',
      room: 'Math Lab 101',
      prerequisites: ['Pre-Algebra'],
      grade: '9-10'
    },
    {
      id: 'ENG201',
      name: 'English Literature',
      description: 'Study of classic and contemporary literary works',
      department: 'English',
      teacher: 'Prof. Michael Brown',
      teacherId: 'T002',
      teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      semester: 'Fall 2024',
      credits: 4,
      capacity: 25,
      enrolled: 23,
      status: 'active',
      schedule: 'TTH 10:30-12:00 PM',
      room: 'English Hall 205',
      prerequisites: ['English I'],
      grade: '11-12'
    },
    {
      id: 'SCI301',
      name: 'Advanced Chemistry',
      description: 'Advanced concepts in organic and inorganic chemistry',
      department: 'Science',
      teacher: 'Dr. Sarah Davis',
      teacherId: 'T003',
      teacherAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      semester: 'Fall 2024',
      credits: 4,
      capacity: 20,
      enrolled: 18,
      status: 'active',
      schedule: 'MWF 1:00-2:30 PM',
      room: 'Science Lab 301',
      prerequisites: ['Chemistry I', 'Chemistry II'],
      grade: '11-12'
    },
    {
      id: 'HIST101',
      name: 'World History',
      description: 'Survey of major world civilizations and events',
      department: 'History',
      teacher: 'Prof. James Wilson',
      teacherId: 'T004',
      teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      semester: 'Fall 2024',
      credits: 3,
      capacity: 35,
      enrolled: 32,
      status: 'active',
      schedule: 'TTH 8:00-9:30 AM',
      room: 'History Hall 102',
      prerequisites: [],
      grade: '9-10'
    },
    {
      id: 'ART201',
      name: 'Digital Art & Design',
      description: 'Introduction to digital art tools and design principles',
      department: 'Arts',
      teacher: 'Ms. Lisa Garcia',
      teacherId: 'T005',
      teacherAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      semester: 'Fall 2024',
      credits: 2,
      capacity: 15,
      enrolled: 12,
      status: 'active',
      schedule: 'MWF 2:00-3:00 PM',
      room: 'Art Studio 201',
      prerequisites: ['Art Fundamentals'],
      grade: '10-12'
    },
    {
      id: 'PE101',
      name: 'Physical Education',
      description: 'Fitness, health, and recreational activities',
      department: 'Physical Education',
      teacher: 'Coach Robert Taylor',
      teacherId: 'T006',
      teacherAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      semester: 'Fall 2024',
      credits: 1,
      capacity: 40,
      enrolled: 38,
      status: 'active',
      schedule: 'Daily 11:00-12:00 PM',
      room: 'Gymnasium',
      prerequisites: [],
      grade: '9-12'
    }
  ];

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return mockCourses?.filter(course => {
      const matchesSearch = !searchTerm || 
        course?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        course?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        course?.teacher?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        course?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase());

      const matchesDepartment = !filters?.department || course?.department === filters?.department;
      const matchesSemester = !filters?.semester || course?.semester === filters?.semester;
      const matchesStatus = !filters?.status || course?.status === filters?.status;
      
      let matchesCapacity = true;
      if (filters?.capacity) {
        const utilizationRate = (course?.enrolled / course?.capacity) * 100;
        switch (filters?.capacity) {
          case 'full':
            matchesCapacity = utilizationRate >= 90;
            break;
          case 'near-full':
            matchesCapacity = utilizationRate >= 75 && utilizationRate < 90;
            break;
          case 'available':
            matchesCapacity = utilizationRate < 75;
            break;
        }
      }

      return matchesSearch && matchesDepartment && matchesSemester && matchesStatus && matchesCapacity;
    });
  }, [searchTerm, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses?.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const paginatedCourses = filteredCourses?.slice(startIndex, startIndex + coursesPerPage);

  const handleCourseToggle = (courseId) => {
    const isSelected = selectedCourses?.includes(courseId);
    const newSelection = isSelected 
      ? selectedCourses?.filter(id => id !== courseId)
      : [...selectedCourses, courseId];
    
    onCourseSelect?.(newSelection);
  };

  const handleSelectAll = () => {
    const allIds = paginatedCourses?.map(course => course?.id);
    const allSelected = allIds?.every(id => selectedCourses?.includes(id));
    
    if (allSelected) {
      const newSelection = selectedCourses?.filter(id => !allIds?.includes(id));
      onCourseSelect?.(newSelection);
    } else {
      const newSelection = [...new Set([...selectedCourses, ...allIds])];
      onCourseSelect?.(newSelection);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCapacityColor = (enrolled, capacity) => {
    const rate = (enrolled / capacity) * 100;
    if (rate >= 90) return 'text-red-600';
    if (rate >= 75) return 'text-amber-600';
    return 'text-green-600';
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-card border border-border rounded-lg">
        {/* List Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Checkbox
                checked={paginatedCourses?.every(course => selectedCourses?.includes(course?.id))}
                indeterminate={paginatedCourses?.some(course => selectedCourses?.includes(course?.id)) && !paginatedCourses?.every(course => selectedCourses?.includes(course?.id))}
                onCheckedChange={handleSelectAll}
                label="Select All"
              />
              <span className="text-sm text-muted-foreground">
                {filteredCourses?.length} courses found
              </span>
            </div>
          </div>
        </div>

        {/* List Content */}
        <div className="divide-y divide-border">
          {paginatedCourses?.map((course) => (
            <div key={course?.id} className="p-4 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedCourses?.includes(course?.id)}
                    onCheckedChange={() => handleCourseToggle(course?.id)}
                  />
                  
                  <div>
                    <div className="flex items-center space-x-3">
                      <h3 className="font-semibold text-foreground">{course?.name}</h3>
                      <span className="text-sm text-muted-foreground">({course?.id})</span>
                      <span className={`px-2 py-1 text-xs border rounded-full ${getStatusBadgeColor(course?.status)}`}>
                        {course?.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                      <span>{course?.department}</span>
                      <span>•</span>
                      <span>{course?.teacher}</span>
                      <span>•</span>
                      <span>{course?.schedule}</span>
                      <span>•</span>
                      <span className={getCapacityColor(course?.enrolled, course?.capacity)}>
                        {course?.enrolled}/{course?.capacity} enrolled
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-center">
                    <div className="text-sm font-medium text-foreground">{course?.credits}</div>
                    <div className="text-xs text-muted-foreground">Credits</div>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="sm" iconName="Eye" iconSize={16} />
                    <Button variant="ghost" size="sm" iconName="Edit" iconSize={16} />
                    <Button variant="ghost" size="sm" iconName="Calendar" iconSize={16} />
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
            checked={paginatedCourses?.every(course => selectedCourses?.includes(course?.id))}
            indeterminate={paginatedCourses?.some(course => selectedCourses?.includes(course?.id)) && !paginatedCourses?.every(course => selectedCourses?.includes(course?.id))}
            onCheckedChange={handleSelectAll}
            label="Select All"
          />
          <span className="text-sm text-muted-foreground">
            {filteredCourses?.length} courses found
          </span>
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedCourses?.map((course) => (
          <div key={course?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <Checkbox
                checked={selectedCourses?.includes(course?.id)}
                onCheckedChange={() => handleCourseToggle(course?.id)}
              />
              <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconSize={16} />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground text-lg">{course?.name}</h3>
                <p className="text-sm text-muted-foreground">{course?.id}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {course?.description}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Department:</span>
                  <span className="font-medium">{course?.department}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Credits:</span>
                  <span className="font-medium">{course?.credits}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className={`px-2 py-1 text-xs border rounded-full ${getStatusBadgeColor(course?.status)}`}>
                    {course?.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Enrollment:</span>
                  <span className={`font-medium ${getCapacityColor(course?.enrolled, course?.capacity)}`}>
                    {course?.enrolled}/{course?.capacity}
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-secondary">
                    <img 
                      src={course?.teacherAvatar} 
                      alt={course?.teacher}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{course?.teacher}</div>
                    <div className="text-xs text-muted-foreground">Instructor</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4 space-y-1">
                <div className="flex items-center text-sm">
                  <Icon name="Clock" size={14} className="mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{course?.schedule}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Icon name="MapPin" size={14} className="mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">{course?.room}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Icon name="Users" size={14} className="mr-2 text-muted-foreground" />
                  <span className="text-muted-foreground">Grade {course?.grade}</span>
                </div>
              </div>

              {course?.prerequisites?.length > 0 && (
                <div className="border-t border-border pt-4">
                  <div className="text-xs font-medium text-foreground mb-1">Prerequisites:</div>
                  <div className="flex flex-wrap gap-1">
                    {course?.prerequisites?.map((prereq, index) => (
                      <span key={index} className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded">
                        {prereq}
                      </span>
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
              <Button variant="outline" size="sm" iconName="Calendar" iconSize={14} />
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

export default CourseCatalog;