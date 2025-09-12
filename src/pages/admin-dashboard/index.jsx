import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricsCard from './components/MetricsCard';
import ActivityPanel from './components/ActivityPanel';
import QuickActions from './components/QuickActions';
import RealTimeUpdates from './components/RealTimeUpdates';
import PerformanceCharts from './components/PerformanceCharts';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock admin user data
  const adminUser = {
    id: 1,
    name: "Dr. Sarah Mitchell",
    role: "admin",
    email: "sarah.mitchell@schoolsync.edu",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  };

  // Mock metrics data
  const metricsData = [
    {
      title: "Total Students",
      value: "1,450",
      change: "+5.2% from last month",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Active Teachers",
      value: "58",
      change: "+2 new hires",
      changeType: "increase",
      icon: "BookOpen",
      color: "success"
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "-1.3% from last week",
      changeType: "decrease",
      icon: "Calendar",
      color: "warning"
    },
    {
      title: "Monthly Revenue",
      value: "$670K",
      change: "+8.1% from last month",
      changeType: "increase",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Pending Approvals",
      value: "12",
      change: "3 urgent items",
      changeType: "neutral",
      icon: "AlertCircle",
      color: "error"
    },
    {
      title: "System Health",
      value: "99.8%",
      change: "All systems operational",
      changeType: "neutral",
      icon: "Activity",
      color: "success"
    }
  ];

  const handleLogout = () => {
    // Handle logout logic
    window.location.href = '/login';
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back, {adminUser?.name}. Here's what's happening at SchoolSync today.
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date()?.toLocaleString()}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <QuickActions />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Panel - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ActivityPanel />
            </div>

            {/* Real-time Updates - Takes 1 column */}
            <div className="lg:col-span-1">
              <RealTimeUpdates />
            </div>
          </div>

          {/* Performance Charts */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-4">Performance Analytics</h2>
            <PerformanceCharts />
          </div>

          {/* Additional Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Today's Schedule</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Staff Meeting</span>
                  <span className="text-foreground">9:00 AM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Parent Calls</span>
                  <span className="text-foreground">2:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Budget Review</span>
                  <span className="text-foreground">4:30 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Quick Stats</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Classes Today</span>
                  <span className="text-foreground">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Absent Students</span>
                  <span className="text-foreground">84</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Late Arrivals</span>
                  <span className="text-foreground">12</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">System Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Database</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-foreground">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Payment Gateway</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-foreground">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Backup System</span>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-foreground">Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">Recent Actions</h3>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Last Login:</span>
                  <span className="text-foreground ml-1">Today 8:30 AM</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Reports Generated:</span>
                  <span className="text-foreground ml-1">3</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Approvals Made:</span>
                  <span className="text-foreground ml-1">7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;