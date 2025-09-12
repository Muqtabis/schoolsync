import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import WelcomeSection from './components/WelcomeSection';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock credentials for authentication
  const mockCredentials = {
    admin: { email: 'admin@schoolsync.edu', password: 'admin123' },
    teacher: { email: 'teacher@schoolsync.edu', password: 'teacher123' },
    student: { email: 'student@schoolsync.edu', password: 'student123' },
    parent: { email: 'parent@schoolsync.edu', password: 'parent123' }
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const { email, password, role } = formData;
      const validCredentials = mockCredentials?.[role];

      if (email === validCredentials?.email && password === validCredentials?.password) {
        // Store user data in localStorage
        const userData = {
          id: Math.random()?.toString(36)?.substr(2, 9),
          name: `${role?.charAt(0)?.toUpperCase() + role?.slice(1)} User`,
          email: email,
          role: role,
          loginTime: new Date()?.toISOString()
        };
        
        localStorage.setItem('schoolsync_user', JSON.stringify(userData));
        localStorage.setItem('schoolsync_token', 'mock_jwt_token_' + Date.now());

        // Navigate to appropriate dashboard
        const dashboardRoutes = {
          admin: '/admin-dashboard',
          teacher: '/teacher-dashboard',
          student: '/student-portal',
          parent: '/parent-communication'
        };

        navigate(dashboardRoutes?.[role] || '/admin-dashboard');
      } else {
        setError('Invalid email or password. Please check your credentials and try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-lg p-8">
          <WelcomeSection />
          
          <LoginForm
            onSubmit={handleLogin}
            loading={loading}
            error={error}
          />
          
          <TrustSignals />
        </div>
        
        <div className="text-center mt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date()?.getFullYear()} SchoolSync. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;