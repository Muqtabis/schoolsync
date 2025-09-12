import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StudentDirectory from './components/StudentDirectory';
import StudentToolbar from './components/StudentToolbar';
import StudentFilters from './components/StudentFilters';
import StudentStatistics from './components/StudentStatistics';
import BulkOperations from './components/BulkOperations';

const StudentManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    gradeLevel: '',
    enrollmentStatus: '',
    academicPerformance: ''
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // grid or list

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

  const handleStudentSelect = (studentIds) => {
    setSelectedStudents(studentIds);
  };

  const handleBulkOperation = (operation) => {
    console.log('Bulk operation:', operation, 'on students:', selectedStudents);
    // Handle bulk operations like bulk enrollment, report generation, etc.
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
              <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
              <p className="text-muted-foreground mt-1">
                Comprehensive tools for managing student records, enrollment, and academic profiles
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString()}
            </div>
          </div>

          {/* Student Statistics */}
          <StudentStatistics />

          {/* Toolbar and Filters */}
          <div className="space-y-4">
            <StudentToolbar 
              onSearch={handleSearch}
              selectedCount={selectedStudents?.length}
              onBulkOperation={handleBulkOperation}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
            
            <StudentFilters 
              filters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
            
            {selectedStudents?.length > 0 && (
              <BulkOperations 
                selectedCount={selectedStudents?.length}
                onBulkOperation={handleBulkOperation}
                onClearSelection={() => setSelectedStudents([])}
              />
            )}
          </div>

          {/* Student Directory */}
          <StudentDirectory 
            searchTerm={searchTerm}
            filters={selectedFilters}
            selectedStudents={selectedStudents}
            onStudentSelect={handleStudentSelect}
            viewMode={viewMode}
          />
        </div>
      </main>
    </div>
  );
};

export default StudentManagement;