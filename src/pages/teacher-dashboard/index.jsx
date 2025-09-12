import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ClassCard from './components/ClassCard';
import TaskPanel from './components/TaskPanel';
import TodaySchedule from './components/TodaySchedule';
import CalendarWidget from './components/CalendarWidget';
import GradebookQuickAccess from './components/GradebookQuickAccess';
import QuickActions from './components/QuickActions';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [user] = useState({
    id: 1,
    name: "Sarah Johnson",
    role: "teacher",
    email: "sarah.johnson@schoolsync.edu"
  });

  // Mock data for classes
  const [classes] = useState([
    {
      id: 1,
      subject: "Mathematics",
      grade: "Grade 10",
      section: "A",
      enrolledStudents: 28,
      attendanceRate: 92,
      pendingAssignments: 3,
      upcomingDeadline: "Algebra Quiz - Dec 15, 2025"
    },
    {
      id: 2,
      subject: "Physics",
      grade: "Grade 11",
      section: "B",
      enrolledStudents: 24,
      attendanceRate: 87,
      pendingAssignments: 5,
      upcomingDeadline: "Lab Report - Dec 18, 2025"
    },
    {
      id: 3,
      subject: "Chemistry",
      grade: "Grade 12",
      section: "A",
      enrolledStudents: 22,
      attendanceRate: 95,
      pendingAssignments: 2,
      upcomingDeadline: null
    },
    {
      id: 4,
      subject: "Mathematics",
      grade: "Grade 9",
      section: "C",
      enrolledStudents: 30,
      attendanceRate: 78,
      pendingAssignments: 7,
      upcomingDeadline: "Geometry Test - Dec 20, 2025"
    }
  ]);

  // Mock data for pending tasks
  const [tasks] = useState([
    {
      id: 1,
      type: "grading",
      title: "Grade Physics Lab Reports",
      description: "24 lab reports submitted for Electromagnetic Induction experiment need grading",
      dueDate: "Dec 15, 2025",
      priority: "high"
    },
    {
      id: 2,
      type: "communication",
      title: "Parent Meeting Request",
      description: "Mrs. Anderson requested a meeting regarding her son's performance in Mathematics",
      dueDate: "Dec 16, 2025",
      priority: "medium"
    },
    {
      id: 3,
      type: "administrative",
      title: "Submit Quarterly Report",
      description: "Academic performance report for Grade 10-A due to administration",
      dueDate: "Dec 18, 2025",
      priority: "high"
    },
    {
      id: 4,
      type: "grading",
      title: "Review Chemistry Assignments",
      description: "22 assignments on Chemical Bonding submitted yesterday",
      dueDate: "Dec 17, 2025",
      priority: "medium"
    },
    {
      id: 5,
      type: "communication",
      title: "Send Progress Updates",
      description: "Monthly progress reports need to be sent to parents of Grade 9-C",
      dueDate: "Dec 19, 2025",
      priority: "low"
    }
  ]);

  // Mock data for today's schedule
  const [schedule] = useState([
    {
      id: 1,
      subject: "Mathematics",
      grade: "Grade 10",
      section: "A",
      startTime: "08:00",
      endTime: "08:45",
      classroom: "Room 201",
      studentCount: 28,
      notes: "Algebra Quiz"
    },
    {
      id: 2,
      subject: "Physics",
      grade: "Grade 11",
      section: "B",
      startTime: "09:00",
      endTime: "09:45",
      classroom: "Lab 1",
      studentCount: 24,
      notes: "Electromagnetic Induction"
    },
    {
      id: 3,
      subject: "Chemistry",
      grade: "Grade 12",
      section: "A",
      startTime: "10:30",
      endTime: "11:15",
      classroom: "Lab 2",
      studentCount: 22,
      notes: "Chemical Bonding"
    },
    {
      id: 4,
      subject: "Mathematics",
      grade: "Grade 9",
      section: "C",
      startTime: "13:00",
      endTime: "13:45",
      classroom: "Room 203",
      studentCount: 30,
      notes: "Geometry Basics"
    },
    {
      id: 5,
      subject: "Physics",
      grade: "Grade 11",
      section: "A",
      startTime: "14:00",
      endTime: "14:45",
      classroom: "Room 205",
      studentCount: 26,
      notes: "Problem Solving"
    }
  ]);

  // Mock data for calendar events
  const [events] = useState([
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: "2025-12-15",
      time: "14:00",
      type: "meeting"
    },
    {
      id: 2,
      title: "Physics Lab Report Due",
      date: "2025-12-18",
      type: "deadline"
    },
    {
      id: 3,
      title: "Staff Meeting",
      date: "2025-12-20",
      time: "15:30",
      type: "meeting"
    },
    {
      id: 4,
      title: "Winter Break Begins",
      date: "2025-12-22",
      type: "event"
    },
    {
      id: 5,
      title: "Quarterly Assessment",
      date: "2025-12-25",
      type: "deadline"
    }
  ]);

  // Mock data for recent submissions
  const [submissions] = useState([
    {
      id: 1,
      studentName: "Alex Thompson",
      assignmentTitle: "Electromagnetic Induction Lab Report",
      subject: "Physics",
      submittedAt: "2025-12-12T10:30:00Z",
      status: "pending",
      fileUrl: "#"
    },
    {
      id: 2,
      studentName: "Emma Davis",
      assignmentTitle: "Quadratic Equations Worksheet",
      subject: "Mathematics",
      submittedAt: "2025-12-12T09:15:00Z",
      status: "graded",
      grade: 87,
      fileUrl: "#"
    },
    {
      id: 3,
      studentName: "Michael Brown",
      assignmentTitle: "Chemical Bonding Assignment",
      subject: "Chemistry",
      submittedAt: "2025-12-11T16:45:00Z",
      status: "pending",
      fileUrl: "#"
    },
    {
      id: 4,
      studentName: "Sophie Wilson",
      assignmentTitle: "Geometry Problem Set",
      subject: "Mathematics",
      submittedAt: "2025-12-11T14:20:00Z",
      status: "late",
      fileUrl: "#"
    },
    {
      id: 5,
      studentName: "James Miller",
      assignmentTitle: "Physics Homework Chapter 12",
      subject: "Physics",
      submittedAt: "2025-12-10T18:30:00Z",
      status: "graded",
      grade: 92,
      fileUrl: "#"
    }
  ]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleTakeAttendance = (classId) => {
    console.log('Taking attendance for class:', classId);
    // Navigate to attendance page or open modal
  };

  const handlePostAnnouncement = (classId) => {
    console.log('Posting announcement for class:', classId);
    // Navigate to announcements page or open modal
  };

  const handleAccessGradebook = (classId) => {
    console.log('Accessing gradebook for class:', classId);
    navigate('/grade-management');
  };

  const handleTaskAction = (taskId, taskType) => {
    console.log('Handling task:', taskId, taskType);
    if (taskType === 'grading') {
      navigate('/grade-management');
    } else if (taskType === 'communication') {
      navigate('/parent-communication');
    }
  };

  const handleEventClick = (eventList) => {
    console.log('Calendar events clicked:', eventList);
    // Show event details modal or navigate to calendar page
  };

  const handleGradeSubmission = (submissionId) => {
    console.log('Grading submission:', submissionId);
    navigate('/grade-management');
  };

  const handleViewAllSubmissions = () => {
    navigate('/grade-management');
  };

  const handleQuickAction = (actionId) => {
    console.log('Quick action:', actionId);
    switch (actionId) {
      case 'attendance':
        // Navigate to attendance page
        break;
      case 'assignment':
        // Navigate to create assignment page
        break;
      case 'grade': navigate('/grade-management');
        break;
      case 'message': navigate('/parent-communication');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} onLogout={handleLogout} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        user={user}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6 space-y-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-border">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening in your classes today. You have {tasks?.filter(t => t?.priority === 'high')?.length} high-priority tasks pending.
            </p>
          </div>

          {/* Quick Actions */}
          <QuickActions onAction={handleQuickAction} />

          {/* Class Overview Grid */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Your Classes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {classes?.map((classData) => (
                <ClassCard
                  key={classData?.id}
                  classData={classData}
                  onTakeAttendance={handleTakeAttendance}
                  onPostAnnouncement={handlePostAnnouncement}
                  onAccessGradebook={handleAccessGradebook}
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Tasks and Schedule */}
            <div className="xl:col-span-2 space-y-6">
              <TaskPanel tasks={tasks} onTaskAction={handleTaskAction} />
              <TodaySchedule schedule={schedule} />
            </div>

            {/* Right Column - Calendar and Gradebook */}
            <div className="space-y-6">
              <CalendarWidget events={events} onEventClick={handleEventClick} />
              <GradebookQuickAccess
                submissions={submissions}
                onGradeSubmission={handleGradeSubmission}
                onViewAll={handleViewAllSubmissions}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;