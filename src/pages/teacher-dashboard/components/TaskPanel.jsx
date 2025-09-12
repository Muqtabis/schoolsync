import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskPanel = ({ tasks, onTaskAction }) => {
  const getTaskIcon = (type) => {
    switch (type) {
      case 'grading':
        return 'FileCheck';
      case 'communication':
        return 'MessageCircle';
      case 'administrative':
        return 'AlertCircle';
      default:
        return 'CheckSquare';
    }
  };

  const getTaskColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-error bg-error/5';
      case 'medium':
        return 'border-l-warning bg-warning/5';
      case 'low':
        return 'border-l-success bg-success/5';
      default:
        return 'border-l-muted bg-muted/5';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'High Priority';
      case 'medium':
        return 'Medium Priority';
      case 'low':
        return 'Low Priority';
      default:
        return 'Normal';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Pending Tasks</h2>
        <div className="flex items-center space-x-1 bg-primary/10 px-2 py-1 rounded-md">
          <Icon name="Clock" size={14} className="text-primary" />
          <span className="text-sm font-medium text-primary">{tasks?.length} pending</span>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {tasks?.map((task) => (
          <div
            key={task?.id}
            className={`border-l-4 rounded-r-lg p-4 transition-colors duration-200 hover:bg-muted/50 ${getTaskColor(task?.priority)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="mt-1">
                  <Icon name={getTaskIcon(task?.type)} size={18} className="text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground mb-1">{task?.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{task?.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" size={12} />
                      <span>{task?.dueDate}</span>
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task?.priority === 'high' ? 'bg-error/10 text-error' :
                      task?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                    }`}>
                      {getPriorityText(task?.priority)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="ExternalLink"
                onClick={() => onTaskAction(task?.id, task?.type)}
                className="ml-2 flex-shrink-0"
              />
            </div>
          </div>
        ))}
      </div>
      {tasks?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <p className="text-muted-foreground">All tasks completed! Great work.</p>
        </div>
      )}
    </div>
  );
};

export default TaskPanel;