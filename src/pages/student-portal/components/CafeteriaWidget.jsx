import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CafeteriaWidget = ({ weeklyMenu, onOrderMeal, onViewFullMenu }) => {
  const [selectedDay, setSelectedDay] = useState('today');

  const getTodayMenu = () => {
    const today = new Date()?.toLocaleDateString('en-US', { weekday: 'long' })?.toLowerCase();
    return weeklyMenu?.find(day => day?.day?.toLowerCase() === today) || weeklyMenu?.[0];
  };

  const getDietaryIcon = (type) => {
    switch (type) {
      case 'vegetarian': return 'Leaf';
      case 'vegan': return 'Sprout';
      case 'gluten-free': return 'Shield';
      default: return 'Utensils';
    }
  };

  const getDietaryColor = (type) => {
    switch (type) {
      case 'vegetarian': return 'text-success';
      case 'vegan': return 'text-accent';
      case 'gluten-free': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const todayMenu = getTodayMenu();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Cafeteria Menu</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="ChefHat"
          iconPosition="right"
          onClick={onViewFullMenu}
        >
          Full Menu
        </Button>
      </div>
      {todayMenu ? (
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                {todayMenu?.day}'s Menu
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{todayMenu?.date}</p>
          </div>

          <div className="space-y-4">
            {todayMenu?.meals?.map((meal, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold text-foreground capitalize">
                    {meal?.type}
                  </h4>
                  <span className="text-sm font-medium text-primary">${meal?.price}</span>
                </div>

                <div className="space-y-2 mb-4">
                  {meal?.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-foreground">{item?.name}</span>
                        {item?.dietary && (
                          <Icon 
                            name={getDietaryIcon(item?.dietary)} 
                            size={14} 
                            className={getDietaryColor(item?.dietary)} 
                          />
                        )}
                      </div>
                      {item?.calories && (
                        <span className="text-xs text-muted-foreground">
                          {item?.calories} cal
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {meal?.servingTime}
                      </span>
                    </div>
                    {meal?.availability && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {meal?.availability} left
                        </span>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="ShoppingCart"
                    iconPosition="left"
                    onClick={() => onOrderMeal(meal)}
                  >
                    Order
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Info" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Dietary Information</span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Leaf" size={12} className="text-success" />
                <span>Vegetarian</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Sprout" size={12} className="text-accent" />
                <span>Vegan</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={12} className="text-warning" />
                <span>Gluten-Free</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="ChefHat" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No menu available for today</p>
          <Button
            variant="outline"
            size="sm"
            iconName="Calendar"
            iconPosition="left"
            onClick={onViewFullMenu}
          >
            View Weekly Menu
          </Button>
        </div>
      )}
    </div>
  );
};

export default CafeteriaWidget;