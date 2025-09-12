import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="GraduationCap" size={32} color="white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        Welcome to SchoolSync
      </h1>
      
      <p className="text-muted-foreground text-lg mb-6">
        Your comprehensive school management platform
      </p>
      
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-foreground mb-2">
          Demo Credentials
        </h3>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <p className="font-medium text-foreground">Admin:</p>
            <p className="text-muted-foreground">admin@schoolsync.edu</p>
            <p className="text-muted-foreground">admin123</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Teacher:</p>
            <p className="text-muted-foreground">teacher@schoolsync.edu</p>
            <p className="text-muted-foreground">teacher123</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Student:</p>
            <p className="text-muted-foreground">student@schoolsync.edu</p>
            <p className="text-muted-foreground">student123</p>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground">Parent:</p>
            <p className="text-muted-foreground">parent@schoolsync.edu</p>
            <p className="text-muted-foreground">parent123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;