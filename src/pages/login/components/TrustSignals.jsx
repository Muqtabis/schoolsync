import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustBadges = [
    {
      icon: 'Shield',
      title: 'Data Protection',
      description: 'FERPA Compliant'
    },
    {
      icon: 'Lock',
      title: 'Secure Access',
      description: 'SSL Encrypted'
    },
    {
      icon: 'Award',
      title: 'Certified Platform',
      description: 'Education Standards'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <div className="text-center mb-4">
        <p className="text-xs text-muted-foreground">
          Trusted by 500+ educational institutions
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {trustBadges?.map((badge, index) => (
          <div key={index} className="text-center">
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon name={badge?.icon} size={16} className="text-accent" />
            </div>
            <h4 className="text-xs font-medium text-foreground mb-1">
              {badge?.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {badge?.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustSignals;