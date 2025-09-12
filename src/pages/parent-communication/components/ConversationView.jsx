import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConversationView = ({ thread, onClose, onSendMessage }) => {
  const [replyText, setReplyText] = useState('');
  const [attachments, setAttachments] = useState([]);

  const handleSendMessage = () => {
    if (replyText?.trim() || attachments?.length > 0) {
      onSendMessage({
        threadId: thread?.id,
        message: replyText,
        attachments: attachments
      });
      setReplyText('');
      setAttachments([]);
    }
  };

  const handleFileAttachment = (event) => {
    const files = Array.from(event?.target?.files);
    setAttachments(prev => [...prev, ...files]);
  };

  const removeAttachment = (index) => {
    setAttachments(prev => prev?.filter((_, i) => i !== index));
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getPriorityBadge = (priority) => {
    if (priority === 'urgent') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
          <Icon name="AlertCircle" size={12} className="mr-1" />
          Urgent
        </span>
      );
    }
    if (priority === 'high') {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
          <Icon name="AlertTriangle" size={12} className="mr-1" />
          High Priority
        </span>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="ArrowLeft"
            iconSize={16}
            onClick={onClose}
            className="lg:hidden"
          />
          <Image
            src={thread?.senderAvatar}
            alt={thread?.senderName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-foreground">{thread?.senderName}</h3>
            <p className="text-sm text-muted-foreground capitalize">{thread?.senderType}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getPriorityBadge(thread?.priority)}
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            iconSize={16}
            onClick={onClose}
            className="hidden lg:flex"
          />
        </div>
      </div>
      {/* Subject */}
      <div className="p-4 border-b border-border bg-muted/30">
        <h4 className="font-medium text-foreground">{thread?.subject}</h4>
        {thread?.category && (
          <span className="inline-block mt-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
            {thread?.category}
          </span>
        )}
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {thread?.messages?.map((message, index) => (
          <div
            key={index}
            className={`flex ${message?.sender === 'parent' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[70%] ${
              message?.sender === 'parent' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground'
            } rounded-lg p-3`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  {message?.sender === 'parent' ? 'You' : thread?.senderName}
                </span>
                <span className={`text-xs ${
                  message?.sender === 'parent' ?'text-primary-foreground/70' :'text-muted-foreground'
                }`}>
                  {formatMessageTime(message?.timestamp)}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
              {message?.attachments && message?.attachments?.length > 0 && (
                <div className="mt-2 space-y-1">
                  {message?.attachments?.map((attachment, attachIndex) => (
                    <div key={attachIndex} className="flex items-center space-x-2 text-xs">
                      <Icon name="Paperclip" size={12} />
                      <span>{attachment?.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Reply Section */}
      <div className="border-t border-border p-4">
        {attachments?.length > 0 && (
          <div className="mb-3 space-y-2">
            {attachments?.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="File" size={16} />
                  <span className="text-sm">{file?.name}</span>
                </div>
                <Button
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

        <div className="flex space-x-2">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && !e?.shiftKey && handleSendMessage()}
            />
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileAttachment}
            className="hidden"
            id="file-attachment"
          />
          <Button
            variant="outline"
            size="sm"
            iconName="Paperclip"
            iconSize={16}
            onClick={() => document.getElementById('file-attachment')?.click()}
          />
          <Button
            variant="default"
            size="sm"
            iconName="Send"
            iconSize={16}
            onClick={handleSendMessage}
            disabled={!replyText?.trim() && attachments?.length === 0}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;