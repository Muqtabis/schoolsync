import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ComposeMessageModal = ({ isOpen, onClose, onSendMessage }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    category: '',
    priority: 'normal',
    message: ''
  });
  const [attachments, setAttachments] = useState([]);

  const recipientOptions = [
    { value: 'math-teacher', label: 'Ms. Johnson - Math Teacher' },
    { value: 'english-teacher', label: 'Mr. Smith - English Teacher' },
    { value: 'science-teacher', label: 'Dr. Brown - Science Teacher' },
    { value: 'principal', label: 'Mrs. Davis - Principal' },
    { value: 'counselor', label: 'Ms. Wilson - School Counselor' },
    { value: 'nurse', label: 'Nurse Martinez - School Nurse' }
  ];

  const categoryOptions = [
    { value: 'academic', label: 'Academic Progress' },
    { value: 'attendance', label: 'Attendance' },
    { value: 'behavior', label: 'Behavior' },
    { value: 'health', label: 'Health & Safety' },
    { value: 'administrative', label: 'Administrative' },
    { value: 'other', label: 'Other' }
  ];

  const priorityOptions = [
    { value: 'normal', label: 'Normal' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileAttachment = (event) => {
    const files = Array.from(event?.target?.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev?.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (formData?.recipient && formData?.subject && formData?.message) {
      onSendMessage({
        ...formData,
        attachments: attachments,
        timestamp: new Date()?.toISOString()
      });
      
      // Reset form
      setFormData({
        recipient: '',
        subject: '',
        category: '',
        priority: 'normal',
        message: ''
      });
      setAttachments([]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Compose Message</h2>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={20}
            onClick={onClose}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Recipient"
              placeholder="Select recipient"
              options={recipientOptions}
              value={formData?.recipient}
              onChange={(value) => handleInputChange('recipient', value)}
              required
              searchable
            />

            <Select
              label="Category"
              placeholder="Select category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Subject"
                type="text"
                placeholder="Enter message subject"
                value={formData?.subject}
                onChange={(e) => handleInputChange('subject', e?.target?.value)}
                required
              />
            </div>

            <Select
              label="Priority"
              options={priorityOptions}
              value={formData?.priority}
              onChange={(value) => handleInputChange('priority', value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Message *
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              placeholder="Type your message here..."
              value={formData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
              required
            />
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Attachments
            </label>
            
            {attachments?.length > 0 && (
              <div className="mb-3 space-y-2">
                {attachments?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="File" size={16} />
                      <span className="text-sm">{file?.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file?.size / 1024)?.toFixed(1)} KB)
                      </span>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      iconName="X"
                      iconSize={14}
                      onClick={() => removeAttachment(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            <input
              type="file"
              multiple
              onChange={handleFileAttachment}
              className="hidden"
              id="message-attachments"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            />
            
            <Button
              type="button"
              variant="outline"
              iconName="Paperclip"
              iconPosition="left"
              onClick={() => document.getElementById('message-attachments')?.click()}
            >
              Add Attachments
            </Button>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              iconName="Send"
              iconPosition="left"
              disabled={!formData?.recipient || !formData?.subject || !formData?.message}
            >
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComposeMessageModal;