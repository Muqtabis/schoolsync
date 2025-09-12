import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LibraryWidget = ({ borrowedBooks, onViewLibrary, onRenewBook }) => {
  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: `${Math.abs(diffDays)} days overdue`, color: 'text-error' };
    if (diffDays === 0) return { text: 'Due today', color: 'text-warning' };
    if (diffDays <= 3) return { text: `Due in ${diffDays} days`, color: 'text-warning' };
    return { text: `Due in ${diffDays} days`, color: 'text-muted-foreground' };
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Library Books</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="BookOpen"
          iconPosition="right"
          onClick={onViewLibrary}
        >
          Browse Library
        </Button>
      </div>
      {borrowedBooks && borrowedBooks?.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Book" size={24} className="text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">{borrowedBooks?.length}</p>
              <p className="text-sm text-muted-foreground">Books Borrowed</p>
            </div>
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Icon name="Clock" size={24} className="text-warning" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {borrowedBooks?.filter(book => {
                  const daysUntilDue = getDaysUntilDue(book?.dueDate);
                  return daysUntilDue?.color === 'text-warning' || daysUntilDue?.color === 'text-error';
                })?.length}
              </p>
              <p className="text-sm text-muted-foreground">Due Soon</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-base font-medium text-foreground">Currently Borrowed</h4>
            {borrowedBooks?.map((book, index) => {
              const dueStatus = getDaysUntilDue(book?.dueDate);
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-12 bg-primary/20 rounded flex items-center justify-center">
                      <Icon name="Book" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{book?.title}</p>
                      <p className="text-xs text-muted-foreground">by {book?.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${dueStatus?.color}`}>
                      {dueStatus?.text}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="RefreshCw"
                      iconPosition="left"
                      onClick={() => onRenewBook(book)}
                      className="mt-1"
                    >
                      Renew
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">No books currently borrowed</p>
          <Button
            variant="outline"
            size="sm"
            iconName="Search"
            iconPosition="left"
            onClick={onViewLibrary}
          >
            Browse Books
          </Button>
        </div>
      )}
    </div>
  );
};

export default LibraryWidget;