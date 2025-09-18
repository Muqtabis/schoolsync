import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from 'components/ScrollToTop'
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AdminDashboard from './pages/admin-dashboard';
import GradeManagement from './pages/grade-management';
import Login from './pages/login';
import StudentPortal from './pages/student-portal';
import ParentCommunication from './pages/parent-communication';
import TeacherDashboard from './pages/teacher-dashboard';
import StudentManagement from './pages/student-management';
import CourseManagement from './pages/course-management';
import AttendanceTracking from './pages/attendance-tracking';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/grade-management" element={<GradeManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-portal" element={<StudentPortal />} />
        <Route path="/parent-communication" element={<ParentCommunication />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-management" element={<StudentManagement />} />
        <Route path="/course-management" element={<CourseManagement />} />
        <Route path="/attendance-tracking" element={<AttendanceTracking />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;