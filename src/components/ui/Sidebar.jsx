import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle = () => {}, user = null }) => {
  const [expandedSections, setExpandedSections] = useState({});
  const location = useLocation();

  const navigationSections = [
    {
      title: 'Dashboard',
      items: [
        { path: '/admin-dashboard', label: 'Admin Dashboard', icon: 'LayoutDashboard', roles: ['admin'] },
        { path: '/teacher-dashboard', label: 'Teacher Dashboard', icon: 'BookOpen', roles: ['teacher', 'admin'] },
        { path: '/student-portal', label: 'Student Portal', icon: 'Users', roles: ['student', 'teacher', 'admin'] },
        { path: '/parent-communication', label: 'Parent Portal', icon: 'MessageCircle', roles: ['parent', 'teacher', 'admin'] }
      ]
    },
    {
      title: 'Academic Management',
      items: [
        { path: '/grade-management', label: 'Grade Management', icon: 'GraduationCap', roles: ['teacher', 'admin'] },
        { path: '/attendance', label: 'Attendance', icon: 'Calendar', roles: ['teacher', 'admin'] },
        { path: '/assignments', label: 'Assignments', icon: 'FileText', roles: ['teacher', 'admin'] },
        { path: '/schedule', label: 'Class Schedule', icon: 'Clock', roles: ['teacher', 'admin', 'student'] }
      ]
    },
    {
      title: 'Communication',
      items: [
        { path: '/messages', label: 'Messages', icon: 'Mail', roles: ['teacher', 'admin', 'parent'] },
        { path: '/announcements', label: 'Announcements', icon: 'Megaphone', roles: ['teacher', 'admin'] },
        { path: '/notifications', label: 'Notifications', icon: 'Bell', roles: ['teacher', 'admin', 'student', 'parent'] }
      ]
    },
    {
      title: 'Reports & Analytics',
      items: [
        { path: '/reports', label: 'Reports', icon: 'BarChart3', roles: ['admin', 'teacher'] },
        { path: '/analytics', label: 'Analytics', icon: 'TrendingUp', roles: ['admin'] },
        { path: '/progress', label: 'Student Progress', icon: 'Target', roles: ['teacher', 'admin', 'parent'] }
      ]
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleSection = (sectionTitle) => {
    if (isCollapsed) return;
    setExpandedSections(prev => ({
      ...prev,
      [sectionTitle]: !prev?.[sectionTitle]
    }));
  };

  const filterItemsByRole = (items) => {
    if (!user?.role) return items;
    return items?.filter(item => item?.roles?.includes(user?.role));
  };

  return (
    <aside className={`fixed left-0 top-16 bottom-0 z-40 bg-card border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold text-foreground">Navigation</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
            iconSize={16}
            onClick={onToggle}
            className={isCollapsed ? "mx-auto" : ""}
          />
        </div>

        {/* Navigation Content */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navigationSections?.map((section) => {
            const filteredItems = filterItemsByRole(section?.items);
            if (filteredItems?.length === 0) return null;

            const isExpanded = expandedSections?.[section?.title] !== false;

            return (
              <div key={section?.title} className="mb-6">
                {!isCollapsed && (
                  <button
                    onClick={() => toggleSection(section?.title)}
                    className="flex items-center justify-between w-full px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider hover:text-foreground transition-colors duration-200"
                  >
                    <span>{section?.title}</span>
                    <Icon 
                      name={isExpanded ? "ChevronDown" : "ChevronRight"} 
                      size={12} 
                    />
                  </button>
                )}
                {(isCollapsed || isExpanded) && (
                  <div className="space-y-1 px-2">
                    {filteredItems?.map((item) => (
                      <a
                        key={item?.path}
                        href={item?.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
                          isActive(item?.path)
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        title={isCollapsed ? item?.label : ''}
                      >
                        <Icon 
                          name={item?.icon} 
                          size={18} 
                          className={`flex-shrink-0 ${
                            isActive(item?.path) ? 'text-primary-foreground' : ''
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="truncate">{item?.label}</span>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Info */}
        {user && (
          <div className="border-t border-border p-4">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} color="white" />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize truncate">
                    {user?.role || 'Role'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;