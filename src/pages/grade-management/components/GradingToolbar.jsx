import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const GradingToolbar = ({ 
  onBulkGrade, 
  onCalculateFinalGrades, 
  onPublishGrades,
  selectedStudents,
  onStudentSelectionChange,
  students,
  assignments 
}) => {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkGradeData, setBulkGradeData] = useState({
    assignmentId: '',
    score: '',
    applyToAll: false
  });
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [publishSettings, setPublishSettings] = useState({
    notifyStudents: true,
    notifyParents: true,
    includeComments: true
  });

  const assignmentOptions = assignments?.map(a => ({
    value: a?.id,
    label: `${a?.title} (${a?.points} pts)`
  }));

  const handleBulkGrade = () => {
    if (!bulkGradeData?.assignmentId || !bulkGradeData?.score) return;
    
    const studentsToGrade = bulkGradeData?.applyToAll ? students : selectedStudents;
    onBulkGrade(bulkGradeData?.assignmentId, bulkGradeData?.score, studentsToGrade);
    
    setIsBulkModalOpen(false);
    setBulkGradeData({ assignmentId: '', score: '', applyToAll: false });
  };

  const handlePublishGrades = () => {
    onPublishGrades(publishSettings);
    setIsPublishModalOpen(false);
  };

  const getSelectedCount = () => {
    return selectedStudents?.length;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Selection Info */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={selectedStudents?.length === students?.length}
              onChange={(e) => {
                if (e?.target?.checked) {
                  onStudentSelectionChange(students?.map(s => s?.id));
                } else {
                  onStudentSelectionChange([]);
                }
              }}
            />
            <span className="text-sm text-muted-foreground">
              {getSelectedCount() > 0 
                ? `${getSelectedCount()} student${getSelectedCount() > 1 ? 's' : ''} selected`
                : 'Select students for bulk actions'
              }
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Calculator"
            iconPosition="left"
            onClick={onCalculateFinalGrades}
          >
            Calculate Finals
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={() => setIsBulkModalOpen(true)}
            disabled={getSelectedCount() === 0}
          >
            Bulk Grade
          </Button>
          
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            iconPosition="left"
            onClick={() => setIsPublishModalOpen(true)}
          >
            Publish Grades
          </Button>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Quick Actions:</span>
          <Button
            variant="ghost"
            size="xs"
            iconName="Download"
            iconPosition="left"
          >
            Export CSV
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Upload"
            iconPosition="left"
          >
            Import Grades
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Copy"
            iconPosition="left"
          >
            Copy Grades
          </Button>
          <Button
            variant="ghost"
            size="xs"
            iconName="Trash2"
            iconPosition="left"
          >
            Clear Grades
          </Button>
        </div>
      </div>
      {/* Bulk Grade Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg border border-border w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Bulk Grade Assignment</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsBulkModalOpen(false)}
                />
              </div>

              <div className="space-y-4">
                <Select
                  label="Select Assignment"
                  options={assignmentOptions}
                  value={bulkGradeData?.assignmentId}
                  onChange={(value) => setBulkGradeData(prev => ({ ...prev, assignmentId: value }))}
                  required
                />

                <Input
                  label="Grade Score"
                  type="number"
                  value={bulkGradeData?.score}
                  onChange={(e) => setBulkGradeData(prev => ({ ...prev, score: e?.target?.value }))}
                  placeholder="Enter score"
                  min="0"
                  max="100"
                  required
                />

                <Checkbox
                  label="Apply to all students (ignore selection)"
                  checked={bulkGradeData?.applyToAll}
                  onChange={(e) => setBulkGradeData(prev => ({ ...prev, applyToAll: e?.target?.checked }))}
                />

                <div className="text-sm text-muted-foreground">
                  This will apply the grade to {bulkGradeData?.applyToAll ? students?.length : getSelectedCount()} student{(bulkGradeData?.applyToAll ? students?.length : getSelectedCount()) > 1 ? 's' : ''}.
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsBulkModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleBulkGrade}
                  disabled={!bulkGradeData?.assignmentId || !bulkGradeData?.score}
                >
                  Apply Grades
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Publish Grades Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-card rounded-lg border border-border w-full max-w-md mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Publish Grades</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsPublishModalOpen(false)}
                />
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Publishing Grades</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This will make grades visible to students and parents. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Checkbox
                    label="Send notification to students"
                    description="Students will receive an email about new grades"
                    checked={publishSettings?.notifyStudents}
                    onChange={(e) => setPublishSettings(prev => ({ ...prev, notifyStudents: e?.target?.checked }))}
                  />

                  <Checkbox
                    label="Send notification to parents"
                    description="Parents will receive an email about their child's grades"
                    checked={publishSettings?.notifyParents}
                    onChange={(e) => setPublishSettings(prev => ({ ...prev, notifyParents: e?.target?.checked }))}
                  />

                  <Checkbox
                    label="Include teacher comments"
                    description="Include any comments you've added to assignments"
                    checked={publishSettings?.includeComments}
                    onChange={(e) => setPublishSettings(prev => ({ ...prev, includeComments: e?.target?.checked }))}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsPublishModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handlePublishGrades}
                >
                  Publish Grades
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GradingToolbar;