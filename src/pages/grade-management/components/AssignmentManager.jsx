import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AssignmentManager = ({ assignments, onAddAssignment, onUpdateAssignment, onDeleteAssignment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    points: '',
    dueDate: '',
    isExtraCredit: false,
    allowLateSubmission: true,
    latePenalty: '10'
  });

  const categoryOptions = [
    { value: 'homework', label: 'Homework' },
    { value: 'quiz', label: 'Quiz' },
    { value: 'exam', label: 'Exam' },
    { value: 'project', label: 'Project' },
    { value: 'participation', label: 'Participation' },
    { value: 'extra_credit', label: 'Extra Credit' }
  ];

  const handleOpenModal = (assignment = null) => {
    if (assignment) {
      setEditingAssignment(assignment);
      setFormData({
        title: assignment?.title,
        description: assignment?.description || '',
        category: assignment?.category,
        points: assignment?.points?.toString(),
        dueDate: assignment?.dueDate,
        isExtraCredit: assignment?.isExtraCredit || false,
        allowLateSubmission: assignment?.allowLateSubmission !== false,
        latePenalty: assignment?.latePenalty?.toString() || '10'
      });
    } else {
      setEditingAssignment(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        points: '',
        dueDate: '',
        isExtraCredit: false,
        allowLateSubmission: true,
        latePenalty: '10'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAssignment(null);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const assignmentData = {
      ...formData,
      points: parseInt(formData?.points),
      latePenalty: parseFloat(formData?.latePenalty),
      id: editingAssignment ? editingAssignment?.id : Date.now()?.toString(),
      createdAt: editingAssignment ? editingAssignment?.createdAt : new Date()?.toISOString()
    };

    if (editingAssignment) {
      onUpdateAssignment(assignmentData);
    } else {
      onAddAssignment(assignmentData);
    }
    
    handleCloseModal();
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'exam': return 'bg-error/10 text-error border-error/20';
      case 'quiz': return 'bg-warning/10 text-warning border-warning/20';
      case 'homework': return 'bg-primary/10 text-primary border-primary/20';
      case 'project': return 'bg-accent/10 text-accent border-accent/20';
      case 'participation': return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'extra_credit': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Assignment Management</h2>
          <p className="text-sm text-muted-foreground">Create and manage assignments for your classes</p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => handleOpenModal()}
        >
          New Assignment
        </Button>
      </div>
      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assignments?.map((assignment) => (
          <div key={assignment?.id} className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{assignment?.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(assignment?.category)}`}>
                    {assignment?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{assignment?.points} pts</span>
                  {assignment?.isExtraCredit && (
                    <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success border border-success/20">
                      Extra Credit
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Edit"
                  onClick={() => handleOpenModal(assignment)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onDeleteAssignment(assignment?.id)}
                />
              </div>
            </div>
            
            {assignment?.description && (
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {assignment?.description}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Icon name="Calendar" size={12} />
                <span>Due: {formatDate(assignment?.dueDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                {assignment?.allowLateSubmission && (
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={12} />
                    Late OK
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg border border-border w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={handleCloseModal}
                />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Assignment Title"
                    type="text"
                    value={formData?.title}
                    onChange={(e) => handleInputChange('title', e?.target?.value)}
                    placeholder="Enter assignment title"
                    required
                  />
                  
                  <Select
                    label="Category"
                    options={categoryOptions}
                    value={formData?.category}
                    onChange={(value) => handleInputChange('category', value)}
                    required
                  />
                </div>

                <Input
                  label="Description"
                  type="text"
                  value={formData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                  placeholder="Assignment description (optional)"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Points"
                    type="number"
                    value={formData?.points}
                    onChange={(e) => handleInputChange('points', e?.target?.value)}
                    placeholder="100"
                    min="1"
                    required
                  />
                  
                  <Input
                    label="Due Date"
                    type="date"
                    value={formData?.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e?.target?.value)}
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Checkbox
                    label="Extra Credit Assignment"
                    checked={formData?.isExtraCredit}
                    onChange={(e) => handleInputChange('isExtraCredit', e?.target?.checked)}
                  />
                  
                  <Checkbox
                    label="Allow Late Submissions"
                    checked={formData?.allowLateSubmission}
                    onChange={(e) => handleInputChange('allowLateSubmission', e?.target?.checked)}
                  />
                  
                  {formData?.allowLateSubmission && (
                    <Input
                      label="Late Penalty (%)"
                      type="number"
                      value={formData?.latePenalty}
                      onChange={(e) => handleInputChange('latePenalty', e?.target?.value)}
                      placeholder="10"
                      min="0"
                      max="100"
                    />
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManager;