import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import GradebookSpreadsheet from './components/GradebookSpreadsheet';
import AssignmentManager from './components/AssignmentManager';
import GradeAnalytics from './components/GradeAnalytics';
import GradingToolbar from './components/GradingToolbar';
import Icon from '../../components/AppIcon';


const GradeManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('gradebook');
  const [selectedPeriod, setSelectedPeriod] = useState('q1');
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Mock user data
  const currentUser = {
    id: 'teacher_001',
    name: 'Sarah Johnson',
    role: 'teacher',
    email: 'sarah.johnson@schoolsync.edu'
  };

  // Mock students data
  const [students] = useState([
    {
      id: 'student_001',
      name: 'Emma Thompson',
      studentId: 'ST2024001',
      email: 'emma.thompson@student.schoolsync.edu',
      grade: '10th',
      section: 'A'
    },
    {
      id: 'student_002',
      name: 'Michael Chen',
      studentId: 'ST2024002',
      email: 'michael.chen@student.schoolsync.edu',
      grade: '10th',
      section: 'A'
    },
    {
      id: 'student_003',
      name: 'Sophia Rodriguez',
      studentId: 'ST2024003',
      email: 'sophia.rodriguez@student.schoolsync.edu',
      grade: '10th',
      section: 'A'
    },
    {
      id: 'student_004',
      name: 'James Wilson',
      studentId: 'ST2024004',
      email: 'james.wilson@student.schoolsync.edu',
      grade: '10th',
      section: 'A'
    },
    {
      id: 'student_005',
      name: 'Olivia Davis',
      studentId: 'ST2024005',
      email: 'olivia.davis@student.schoolsync.edu',
      grade: '10th',
      section: 'A'
    },
    {
      id: 'student_006',
      name: 'Alexander Brown',
      studentId: 'ST2024006',
      email: 'alexander.brown@student.schoolsync.edu',
      grade: '10th',
      section: 'A'
    }
  ]);

  // Mock assignments data
  const [assignments, setAssignments] = useState([
    {
      id: 'assign_001',
      title: 'Algebra Quiz 1',
      description: 'Basic algebraic equations and problem solving',
      category: 'quiz',
      points: 50,
      dueDate: '2024-09-15',
      isExtraCredit: false,
      allowLateSubmission: true,
      latePenalty: 10,
      createdAt: '2024-09-01T10:00:00Z'
    },
    {
      id: 'assign_002',
      title: 'Geometry Homework',
      description: 'Chapter 3 exercises on triangles and angles',
      category: 'homework',
      points: 25,
      dueDate: '2024-09-18',
      isExtraCredit: false,
      allowLateSubmission: true,
      latePenalty: 5,
      createdAt: '2024-09-05T14:30:00Z'
    },
    {
      id: 'assign_003',
      title: 'Midterm Exam',
      description: 'Comprehensive exam covering chapters 1-5',
      category: 'exam',
      points: 100,
      dueDate: '2024-09-25',
      isExtraCredit: false,
      allowLateSubmission: false,
      latePenalty: 0,
      createdAt: '2024-09-08T09:00:00Z'
    },
    {
      id: 'assign_004',
      title: 'Statistics Project',
      description: 'Data collection and analysis project',
      category: 'project',
      points: 75,
      dueDate: '2024-09-30',
      isExtraCredit: false,
      allowLateSubmission: true,
      latePenalty: 15,
      createdAt: '2024-09-10T11:15:00Z'
    },
    {
      id: 'assign_005',
      title: 'Extra Credit Problem Set',
      description: 'Advanced calculus problems for extra credit',
      category: 'extra_credit',
      points: 20,
      dueDate: '2024-10-05',
      isExtraCredit: true,
      allowLateSubmission: true,
      latePenalty: 0,
      createdAt: '2024-09-12T16:45:00Z'
    }
  ]);

  // Mock grades data
  const [grades, setGrades] = useState([
    { id: 'grade_001', studentId: 'student_001', assignmentId: 'assign_001', score: '92', submittedAt: '2024-09-15T14:30:00Z' },
    { id: 'grade_002', studentId: 'student_001', assignmentId: 'assign_002', score: '88', submittedAt: '2024-09-18T16:20:00Z' },
    { id: 'grade_003', studentId: 'student_001', assignmentId: 'assign_003', score: '95', submittedAt: '2024-09-25T10:45:00Z' },
    { id: 'grade_004', studentId: 'student_002', assignmentId: 'assign_001', score: '85', submittedAt: '2024-09-15T15:10:00Z' },
    { id: 'grade_005', studentId: 'student_002', assignmentId: 'assign_002', score: '90', submittedAt: '2024-09-18T17:30:00Z' },
    { id: 'grade_006', studentId: 'student_002', assignmentId: 'assign_003', score: '87', submittedAt: '2024-09-25T11:20:00Z' },
    { id: 'grade_007', studentId: 'student_003', assignmentId: 'assign_001', score: '78', submittedAt: '2024-09-15T13:45:00Z' },
    { id: 'grade_008', studentId: 'student_003', assignmentId: 'assign_002', score: '82', submittedAt: '2024-09-18T18:15:00Z' },
    { id: 'grade_009', studentId: 'student_004', assignmentId: 'assign_001', score: '94', submittedAt: '2024-09-15T14:00:00Z' },
    { id: 'grade_010', studentId: 'student_004', assignmentId: 'assign_002', score: '91', submittedAt: '2024-09-18T16:45:00Z' },
    { id: 'grade_011', studentId: 'student_005', assignmentId: 'assign_001', score: '89', submittedAt: '2024-09-15T15:30:00Z' },
    { id: 'grade_012', studentId: 'student_006', assignmentId: 'assign_001', score: '76', submittedAt: '2024-09-15T16:00:00Z' }
  ]);

  const tabs = [
    { id: 'gradebook', label: 'Gradebook', icon: 'Grid3x3' },
    { id: 'assignments', label: 'Assignments', icon: 'FileText' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleGradeUpdate = (studentId, assignmentId, score) => {
    const existingGradeIndex = grades?.findIndex(
      g => g?.studentId === studentId && g?.assignmentId === assignmentId
    );

    if (existingGradeIndex >= 0) {
      const updatedGrades = [...grades];
      updatedGrades[existingGradeIndex] = {
        ...updatedGrades?.[existingGradeIndex],
        score: score,
        submittedAt: new Date()?.toISOString()
      };
      setGrades(updatedGrades);
    } else {
      const newGrade = {
        id: `grade_${Date.now()}`,
        studentId,
        assignmentId,
        score,
        submittedAt: new Date()?.toISOString()
      };
      setGrades([...grades, newGrade]);
    }
  };

  const handleAddAssignment = (assignmentData) => {
    setAssignments([...assignments, assignmentData]);
  };

  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(assignments?.map(a => 
      a?.id === updatedAssignment?.id ? updatedAssignment : a
    ));
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments(assignments?.filter(a => a?.id !== assignmentId));
    setGrades(grades?.filter(g => g?.assignmentId !== assignmentId));
  };

  const handleBulkGrade = (assignmentId, score, studentsToGrade) => {
    const newGrades = studentsToGrade?.map(student => {
      const existingGradeIndex = grades?.findIndex(
        g => g?.studentId === student?.id && g?.assignmentId === assignmentId
      );

      if (existingGradeIndex >= 0) {
        return null; // Skip existing grades
      }

      return {
        id: `grade_${Date.now()}_${student?.id}`,
        studentId: student?.id,
        assignmentId,
        score,
        submittedAt: new Date()?.toISOString()
      };
    })?.filter(Boolean);

    setGrades([...grades, ...newGrades]);
  };

  const handleCalculateFinalGrades = () => {
    console.log('Calculating final grades...');
    // Implement final grade calculation logic
  };

  const handlePublishGrades = (settings) => {
    console.log('Publishing grades with settings:', settings);
    // Implement grade publishing logic
  };

  const handleStudentSelectionChange = (studentIds) => {
    setSelectedStudents(studentIds);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        user={currentUser}
      />
      <main className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Grade Management</h1>
                <p className="text-muted-foreground">
                  Manage grades, assignments, and track student performance
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground">
                  Class: Mathematics 10A • Period: {selectedPeriod?.toUpperCase()}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    {tab?.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'gradebook' && (
              <>
                <GradingToolbar
                  onBulkGrade={handleBulkGrade}
                  onCalculateFinalGrades={handleCalculateFinalGrades}
                  onPublishGrades={handlePublishGrades}
                  selectedStudents={students?.filter(s => selectedStudents?.includes(s?.id))}
                  onStudentSelectionChange={handleStudentSelectionChange}
                  students={students}
                  assignments={assignments}
                />
                <GradebookSpreadsheet
                  students={students}
                  assignments={assignments}
                  grades={grades}
                  onGradeUpdate={handleGradeUpdate}
                  onAddAssignment={() => setActiveTab('assignments')}
                  selectedPeriod={selectedPeriod}
                  onPeriodChange={setSelectedPeriod}
                />
              </>
            )}

            {activeTab === 'assignments' && (
              <AssignmentManager
                assignments={assignments}
                onAddAssignment={handleAddAssignment}
                onUpdateAssignment={handleUpdateAssignment}
                onDeleteAssignment={handleDeleteAssignment}
              />
            )}

            {activeTab === 'analytics' && (
              <GradeAnalytics
                students={students}
                assignments={assignments}
                grades={grades}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default GradeManagement;