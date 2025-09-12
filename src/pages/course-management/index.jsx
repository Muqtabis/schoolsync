import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CourseCatalog from './components/CourseCatalog';
import CourseToolbar from './components/CourseToolbar';
import CourseFilters from './components/CourseFilters';
import SchedulingPanel from './components/SchedulingPanel';
import CourseAnalytics from './components/CourseAnalytics';

const CourseManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    department: '',
    semester: '',
    status: '',
    capacity: ''
  });
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [showScheduling, setShowScheduling] = useState(false);

  // Mock admin user data
  const adminUser = {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "admin",
    email: "sarah.mitchell@schoolsync.edu",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleCourseSelect = (courseIds) => {
    setSelectedCourses(courseIds);
  };

  const handleBulkOperation = (operation) => {
    console.log('Bulk operation:', operation, 'on courses:', selectedCourses);
    // Handle bulk operations like scheduling, teacher assignment, etc.
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={adminUser} onLogout={handleLogout} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        user={adminUser} 
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Course Management</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive curriculum oversight and class scheduling capabilities
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowScheduling(!showScheduling)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  showScheduling 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                {showScheduling ? 'Hide' : 'Show'} Scheduling
              </button>
              <div className="text-sm text-muted-foreground">
                Last updated: {new Date()?.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Course Analytics */}
          <CourseAnalytics />

          {/* Main Content Layout */}
          <div className={`grid ${showScheduling ? 'grid-cols-1 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
            {/* Course Management Section */}
            <div className={`${showScheduling ? 'xl:col-span-2' : 'col-span-1'} space-y-6`}>
              {/* Toolbar and Filters */}
              <div className="space-y-4">
                <CourseToolbar 
                  onSearch={handleSearch}
                  selectedCount={selectedCourses?.length}
                  onBulkOperation={handleBulkOperation}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />
                
                <CourseFilters 
                  filters={selectedFilters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Course Catalog */}
              <CourseCatalog 
                searchTerm={searchTerm}
                filters={selectedFilters}
                selectedCourses={selectedCourses}
                onCourseSelect={handleCourseSelect}
                viewMode={viewMode}
              />
            </div>

            {/* Scheduling Panel */}
            {showScheduling && (
              <div className="xl:col-span-1">
                <SchedulingPanel 
                  selectedCourses={selectedCourses}
                  onScheduleUpdate={handleBulkOperation}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseManagement;