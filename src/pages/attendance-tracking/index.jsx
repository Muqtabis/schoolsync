import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClassRoster from './components/ClassRoster';
import AttendanceControls from './components/AttendanceControls';
import AttendanceStatistics from './components/AttendanceStatistics';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import AttendanceAnalytics from './components/AttendanceAnalytics';
import NotificationPanel from './components/NotificationPanel';

const AttendanceTracking = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedClass, setSelectedClass] = useState('7A');
  const [selectedPeriod, setSelectedPeriod] = useState('1');
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState(generateMockAttendanceData());

  // Mock teacher user data
  const teacherUser = {
    id: 1,
    name: "Ms. Jennifer Clark",
    role: "teacher",
    email: "jennifer.clark@schoolsync.edu",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  };

  function generateMockAttendanceData() {
    const students = [
      { id: 1, name: "Emma Thompson", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", studentId: "STU001", status: "present" },
      { id: 2, name: "Liam Johnson", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face", studentId: "STU002", status: "absent" },
      { id: 3, name: "Olivia Davis", photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", studentId: "STU003", status: "present" },
      { id: 4, name: "Noah Wilson", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", studentId: "STU004", status: "tardy" },
      { id: 5, name: "Sophia Brown", photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", studentId: "STU005", status: "present" },
      { id: 6, name: "Mason Garcia", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", studentId: "STU006", status: "excused" },
      { id: 7, name: "Isabella Miller", photo: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face", studentId: "STU007", status: "present" },
      { id: 8, name: "Ethan Anderson", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", studentId: "STU008", status: "absent" },
      { id: 9, name: "Ava Martinez", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", studentId: "STU009", status: "present" },
      { id: 10, name: "James Taylor", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", studentId: "STU010", status: "present" }
    ];
    return students;
  }

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClassChange = (classId) => {
    setSelectedClass(classId);
    setSelectedStudents([]);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setSelectedStudents([]);
  };

  const handleAttendanceUpdate = (studentId, status) => {
    setAttendanceData(prev => 
      prev?.map(student => 
        student?.id === studentId 
          ? { ...student, status }
          : student
      )
    );
  };

  const handleBulkAttendanceUpdate = (status) => {
    if (selectedStudents?.length > 0) {
      setAttendanceData(prev => 
        prev?.map(student => 
          selectedStudents?.includes(student?.id)
            ? { ...student, status }
            : student
        )
      );
      setSelectedStudents([]);
    }
  };

  const handleMarkAllPresent = () => {
    setAttendanceData(prev => 
      prev?.map(student => ({ ...student, status: 'present' }))
    );
    setSelectedStudents([]);
  };

  const handleStudentSelection = (studentIds) => {
    setSelectedStudents(studentIds);
  };

  const attendanceStats = {
    present: attendanceData?.filter(s => s?.status === 'present')?.length || 0,
    absent: attendanceData?.filter(s => s?.status === 'absent')?.length || 0,
    tardy: attendanceData?.filter(s => s?.status === 'tardy')?.length || 0,
    excused: attendanceData?.filter(s => s?.status === 'excused')?.length || 0,
    total: attendanceData?.length || 0
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={teacherUser} onLogout={handleLogout} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={toggleSidebar} 
        user={teacherUser} 
      />
      <main className={`transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Attendance Tracking</h1>
              <p className="text-muted-foreground mt-1">
                Efficiently monitor student presence and generate attendance analytics
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(selectedDate)?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>

          {/* Attendance Controls */}
          <AttendanceControls
            selectedDate={selectedDate}
            selectedClass={selectedClass}
            selectedPeriod={selectedPeriod}
            onDateChange={handleDateChange}
            onClassChange={handleClassChange}
            onPeriodChange={handlePeriodChange}
          />

          {/* Statistics Overview */}
          <AttendanceStatistics stats={attendanceStats} />

          {/* Bulk Actions Toolbar */}
          <BulkActionsToolbar
            selectedStudents={selectedStudents}
            onBulkUpdate={handleBulkAttendanceUpdate}
            onMarkAllPresent={handleMarkAllPresent}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Class Roster - Takes 3 columns */}
            <div className="lg:col-span-3">
              <ClassRoster
                students={attendanceData}
                selectedStudents={selectedStudents}
                onAttendanceUpdate={handleAttendanceUpdate}
                onStudentSelection={handleStudentSelection}
                selectedDate={selectedDate}
                selectedClass={selectedClass}
                selectedPeriod={selectedPeriod}
              />
            </div>

            {/* Right Panel - Takes 1 column */}
            <div className="lg:col-span-1 space-y-6">
              <AttendanceAnalytics stats={attendanceStats} />
              <NotificationPanel attendanceData={attendanceData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AttendanceTracking;