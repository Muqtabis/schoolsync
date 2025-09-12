import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CourseCard from './components/CourseCard';
import AssignmentCard from './components/AssignmentCard';
import GradesSummary from './components/GradesSummary';
import AnnouncementCard from './components/AnnouncementCard';
import ScheduleWidget from './components/ScheduleWidget';
import LibraryWidget from './components/LibraryWidget';
import CafeteriaWidget from './components/CafeteriaWidget';

const StudentPortal = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Mock user data
  useEffect(() => {
    const mockUser = {
      id: 1,
      name: "Alex Johnson",
      role: "student",
      email: "alex.johnson@schoolsync.edu",
      studentId: "STU2024001",
      grade: "10th Grade",
      section: "A",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    };
    setUser(mockUser);
  }, []);

  // Mock courses data
  const mockCourses = [
    {
      id: 1,
      name: "Advanced Mathematics",
      teacher: "Dr. Sarah Wilson",
      icon: "Calculator",
      color: "bg-primary",
      currentGrade: 92,
      nextClass: "Today, 10:00 AM",
      room: "Math-101",
      attendance: 95,
      pendingAssignments: 2
    },
    {
      id: 2,
      name: "English Literature",
      teacher: "Prof. Michael Brown",
      icon: "BookOpen",
      color: "bg-accent",
      currentGrade: 88,
      nextClass: "Tomorrow, 9:00 AM",
      room: "Eng-205",
      attendance: 92,
      pendingAssignments: 1
    },
    {
      id: 3,
      name: "Physics",
      teacher: "Dr. Emily Davis",
      icon: "Zap",
      color: "bg-warning",
      currentGrade: 85,
      nextClass: "Today, 2:00 PM",
      room: "Phy-301",
      attendance: 88,
      pendingAssignments: 3
    },
    {
      id: 4,
      name: "Chemistry",
      teacher: "Prof. Robert Lee",
      icon: "Flask",
      color: "bg-success",
      currentGrade: 90,
      nextClass: "Tomorrow, 11:00 AM",
      room: "Chem-201",
      attendance: 94,
      pendingAssignments: 0
    }
  ];

  // Mock assignments data
  const mockAssignments = [
    {
      id: 1,
      title: "Calculus Problem Set 5",
      subject: "Advanced Mathematics",
      description: "Complete problems 1-20 from Chapter 8, focusing on integration techniques and applications.",
      dueDate: "2025-01-15",
      priority: "high",
      status: "pending",
      estimatedTime: "2-3 hours",
      grade: null
    },
    {
      id: 2,
      title: "Shakespeare Essay Analysis",
      subject: "English Literature",
      description: "Write a 1000-word analysis of themes in Hamlet, focusing on revenge and madness.",
      dueDate: "2025-01-18",
      priority: "medium",
      status: "pending",
      estimatedTime: "3-4 hours",
      grade: null
    },
    {
      id: 3,
      title: "Lab Report: Pendulum Motion",
      subject: "Physics",
      description: "Complete lab report on simple harmonic motion experiment conducted in class.",
      dueDate: "2025-01-12",
      priority: "high",
      status: "overdue",
      estimatedTime: "1-2 hours",
      grade: null
    },
    {
      id: 4,
      title: "Chemical Bonding Quiz",
      subject: "Chemistry",
      description: "Online quiz covering ionic, covalent, and metallic bonding concepts.",
      dueDate: "2025-01-20",
      priority: "low",
      status: "pending",
      estimatedTime: "30 minutes",
      grade: null
    },
    {
      id: 5,
      title: "Trigonometry Assignment",
      subject: "Advanced Mathematics",
      description: "Solve trigonometric equations and graph functions from Chapter 6.",
      dueDate: "2025-01-10",
      priority: "medium",
      status: "submitted",
      estimatedTime: "2 hours",
      grade: 94
    }
  ];

  // Mock grades data
  const mockGrades = [
    { subject: "Advanced Mathematics", assignment: "Midterm Exam", percentage: 92, date: "Jan 8, 2025" },
    { subject: "English Literature", assignment: "Poetry Analysis", percentage: 88, date: "Jan 7, 2025" },
    { subject: "Physics", assignment: "Lab Quiz 3", percentage: 85, date: "Jan 6, 2025" },
    { subject: "Chemistry", assignment: "Periodic Table Test", percentage: 90, date: "Jan 5, 2025" },
    { subject: "Advanced Mathematics", assignment: "Calculus Quiz", percentage: 94, date: "Jan 4, 2025" }
  ];

  // Mock announcements data
  const mockAnnouncements = [
    {
      id: 1,
      title: "Winter Break Schedule Update",
      content: "Please note that winter break has been extended by one day. Classes will resume on January 15th instead of January 14th.",
      author: "Principal Johnson",
      date: "2025-01-10",
      priority: "important",
      category: "Academic"
    },
    {
      id: 2,
      title: "Science Fair Registration Open",
      content: "Registration for the annual science fair is now open. Submit your project proposals by January 20th.",
      author: "Dr. Emily Davis",
      date: "2025-01-09",
      priority: "normal",
      category: "Events"
    },
    {
      id: 3,
      title: "Library System Maintenance",
      content: "The library system will be under maintenance this weekend. Online resources may be temporarily unavailable.",
      author: "Library Staff",
      date: "2025-01-08",
      priority: "normal",
      category: "System"
    }
  ];

  // Mock schedule data
  const mockSchedule = [
    {
      day: "Monday",
      classes: [
        { subject: "Advanced Mathematics", startTime: "08:00", endTime: "09:30", room: "Math-101", teacher: "Dr. Sarah Wilson" },
        { subject: "English Literature", startTime: "09:45", endTime: "11:15", room: "Eng-205", teacher: "Prof. Michael Brown" },
        { subject: "Physics", startTime: "11:30", endTime: "13:00", room: "Phy-301", teacher: "Dr. Emily Davis" },
        { subject: "Chemistry", startTime: "14:00", endTime: "15:30", room: "Chem-201", teacher: "Prof. Robert Lee" }
      ]
    }
  ];

  // Mock library data
  const mockBorrowedBooks = [
    {
      id: 1,
      title: "Advanced Calculus",
      author: "James Stewart",
      dueDate: "2025-01-20",
      renewals: 1
    },
    {
      id: 2,
      title: "Hamlet",
      author: "William Shakespeare",
      dueDate: "2025-01-15",
      renewals: 0
    },
    {
      id: 3,
      title: "Physics Principles",
      author: "David Halliday",
      dueDate: "2025-01-25",
      renewals: 0
    }
  ];

  // Mock cafeteria data
  const mockWeeklyMenu = [
    {
      day: "Monday",
      date: "January 13, 2025",
      meals: [
        {
          type: "breakfast",
          price: "4.50",
          servingTime: "7:00 AM - 9:00 AM",
          availability: "25",
          items: [
            { name: "Scrambled Eggs", calories: 180, dietary: "vegetarian" },
            { name: "Whole Wheat Toast", calories: 120, dietary: "vegan" },
            { name: "Fresh Fruit Bowl", calories: 80, dietary: "vegan" }
          ]
        },
        {
          type: "lunch",
          price: "6.75",
          servingTime: "11:30 AM - 1:30 PM",
          availability: "45",
          items: [
            { name: "Grilled Chicken Sandwich", calories: 420 },
            { name: "Garden Salad", calories: 150, dietary: "vegetarian" },
            { name: "Sweet Potato Fries", calories: 200, dietary: "vegan" }
          ]
        }
      ]
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    setUser(null);
    // Redirect to login
    window.location.href = '/login';
  };

  const handleViewCourseDetails = (course) => {
    console.log('Viewing course details:', course);
    // Navigate to course details page
  };

  const handleSubmitAssignment = (assignment) => {
    console.log('Submitting assignment:', assignment);
    // Open assignment submission modal
  };

  const handleViewAssignment = (assignment) => {
    console.log('Viewing assignment:', assignment);
    // Navigate to assignment details page
  };

  const handleViewAllGrades = () => {
    console.log('Viewing all grades');
    // Navigate to grades page
  };

  const handleViewFullSchedule = () => {
    console.log('Viewing full schedule');
    // Navigate to schedule page
  };

  const handleViewLibrary = () => {
    console.log('Viewing library');
    // Navigate to library page
  };

  const handleRenewBook = (book) => {
    console.log('Renewing book:', book);
    // Handle book renewal
  };

  const handleOrderMeal = (meal) => {
    console.log('Ordering meal:', meal);
    // Handle meal ordering
  };

  const handleViewFullMenu = () => {
    console.log('Viewing full menu');
    // Navigate to cafeteria page
  };

  const handleMessageTeacher = () => {
    console.log('Opening teacher communication');
    // Navigate to messages page
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'assignments', label: 'Assignments', icon: 'FileText' },
    { id: 'grades', label: 'Grades', icon: 'Star' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' }
  ];

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
        <div className="p-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {user?.name?.split(' ')?.[0] || 'Student'}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here's what's happening with your studies today.
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={handleMessageTeacher}
                >
                  Message Teacher
                </Button>
                <Button
                  variant="default"
                  iconName="Upload"
                  iconPosition="left"
                  onClick={() => handleSubmitAssignment(mockAssignments?.[0])}
                >
                  Submit Assignment
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{mockCourses?.length}</p>
                  <p className="text-sm text-muted-foreground">Active Courses</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockAssignments?.filter(a => a?.status === 'pending')?.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {(mockGrades?.reduce((sum, g) => sum + g?.percentage, 0) / mockGrades?.length)?.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average Grade</p>
                </div>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {(mockCourses?.reduce((sum, c) => sum + c?.attendance, 0) / mockCourses?.length)?.toFixed(0)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Current Courses */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Current Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockCourses?.map((course) => (
                      <CourseCard
                        key={course?.id}
                        course={course}
                        onViewDetails={handleViewCourseDetails}
                        onSubmitAssignment={handleSubmitAssignment}
                      />
                    ))}
                  </div>
                </div>

                {/* Recent Assignments */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6">Recent Assignments</h2>
                  <div className="space-y-4">
                    {mockAssignments?.slice(0, 3)?.map((assignment) => (
                      <AssignmentCard
                        key={assignment?.id}
                        assignment={assignment}
                        onSubmit={handleSubmitAssignment}
                        onView={handleViewAssignment}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-8">
                <GradesSummary grades={mockGrades} onViewDetails={handleViewAllGrades} />
                <ScheduleWidget schedule={mockSchedule} onViewFullSchedule={handleViewFullSchedule} />
                
                {/* Announcements */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Recent Announcements</h3>
                  <div className="space-y-4">
                    {mockAnnouncements?.slice(0, 3)?.map((announcement) => (
                      <AnnouncementCard key={announcement?.id} announcement={announcement} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'assignments' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-foreground">All Assignments</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" iconName="Filter">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm" iconName="SortDesc">
                        Sort
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {mockAssignments?.map((assignment) => (
                      <AssignmentCard
                        key={assignment?.id}
                        assignment={assignment}
                        onSubmit={handleSubmitAssignment}
                        onView={handleViewAssignment}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <LibraryWidget 
                  borrowedBooks={mockBorrowedBooks}
                  onViewLibrary={handleViewLibrary}
                  onRenewBook={handleRenewBook}
                />
                <CafeteriaWidget
                  weeklyMenu={mockWeeklyMenu}
                  onOrderMeal={handleOrderMeal}
                  onViewFullMenu={handleViewFullMenu}
                />
              </div>
            </div>
          )}

          {activeTab === 'grades' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <GradesSummary grades={mockGrades} onViewDetails={handleViewAllGrades} />
              </div>
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Grade Distribution</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">A (90-100%)</span>
                      <span className="text-sm font-medium text-foreground">
                        {mockGrades?.filter(g => g?.percentage >= 90)?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">B (80-89%)</span>
                      <span className="text-sm font-medium text-foreground">
                        {mockGrades?.filter(g => g?.percentage >= 80 && g?.percentage < 90)?.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">C (70-79%)</span>
                      <span className="text-sm font-medium text-foreground">
                        {mockGrades?.filter(g => g?.percentage >= 70 && g?.percentage < 80)?.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ScheduleWidget schedule={mockSchedule} onViewFullSchedule={handleViewFullSchedule} />
              <div className="space-y-6">
                <LibraryWidget 
                  borrowedBooks={mockBorrowedBooks}
                  onViewLibrary={handleViewLibrary}
                  onRenewBook={handleRenewBook}
                />
                <CafeteriaWidget
                  weeklyMenu={mockWeeklyMenu}
                  onOrderMeal={handleOrderMeal}
                  onViewFullMenu={handleViewFullMenu}
                />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;