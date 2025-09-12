import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ user = null, onLogout = () => {} }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: '/admin-dashboard', label: 'Admin', icon: 'Settings', roles: ['admin'] },
    { path: '/teacher-dashboard', label: 'Teaching', icon: 'BookOpen', roles: ['teacher', 'admin'] },
    { path: '/grade-management', label: 'Grades', icon: 'GraduationCap', roles: ['teacher', 'admin'] },
    { path: '/student-management', label: 'Students', icon: 'Users', roles: ['admin', 'teacher'] },
    { path: '/course-management', label: 'Courses', icon: 'Book', roles: ['admin', 'teacher'] },
    { path: '/student-portal', label: 'Portal', icon: 'UserCircle', roles: ['student', 'teacher', 'admin'] },
    { path: '/parent-communication', label: 'Parents', icon: 'MessageCircle', roles: ['parent', 'teacher', 'admin'] }
  ];

  const visibleItems = navigationItems?.filter(item => 
    !user?.role || item?.roles?.includes(user?.role)
  )?.slice(0, 4);

  const overflowItems = navigationItems?.filter(item => 
    !user?.role || item?.roles?.includes(user?.role)
  )?.slice(4);

  const isActive = (path) => location?.pathname === path;

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    setIsProfileOpen(false);
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">SchoolSync</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {visibleItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </a>
          ))}
          
          {overflowItems?.length > 0 && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreHorizontal"
                iconSize={16}
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                More
              </Button>
            </div>
          )}
        </nav>

        {/* User Profile & Mobile Menu */}
        <div className="flex items-center space-x-2">
          {/* User Profile */}
          {user && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleProfileToggle}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <span className="hidden md:block text-sm font-medium">
                  {user?.name || 'User'}
                </span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-dropdown z-50">
                  <div className="py-1">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
                    </div>
                    <a
                      href="/profile"
                      className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <Icon name="User" size={16} className="mr-2" />
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="flex items-center px-3 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-sm text-foreground hover:bg-muted"
                    >
                      <Icon name="LogOut" size={16} className="mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Menu"
            iconSize={20}
            onClick={handleMobileMenuToggle}
            className="lg:hidden"
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.filter(item => !user?.role || item?.roles?.includes(user?.role))?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </a>
              ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;