import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MessageThread from './components/MessageThread';
import MessageFilters from './components/MessageFilters';
import ConversationView from './components/ConversationView';
import QuickAccessPanel from './components/QuickAccessPanel';
import ComposeMessageModal from './components/ComposeMessageModal';

const ParentCommunication = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [showConversation, setShowConversation] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [filters, setFilters] = useState({
    senderType: 'all',
    category: 'all',
    priority: 'all',
    status: 'all',
    search: ''
  });

  // Mock user data
  const currentUser = {
    id: 'parent-001',
    name: 'Sarah Johnson',
    role: 'parent',
    email: 'sarah.johnson@email.com',
    children: [
      { id: 'student-001', name: 'Emma Johnson', grade: '5th Grade' },
      { id: 'student-002', name: 'Liam Johnson', grade: '3rd Grade' }
    ]
  };

  // Mock message threads data
  const [messageThreads, setMessageThreads] = useState([
    {
      id: 'thread-001',
      senderName: 'Ms. Rodriguez',
      senderType: 'teacher',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      subject: 'Emma\'s Math Progress Update',
      lastMessage: 'Emma has shown excellent improvement in her multiplication tables this week...',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      unread: true,
      priority: 'normal',
      category: 'academic',
      hasAttachment: true,
      messages: [
        {
          sender: 'teacher',
          content: `Dear Mrs. Johnson,\n\nI wanted to update you on Emma's progress in mathematics. She has shown excellent improvement in her multiplication tables this week and is now consistently scoring above 90% on her daily practice sheets.\n\nI'm particularly impressed with her problem-solving approach and her willingness to help other students during group work.\n\nPlease let me know if you have any questions or would like to schedule a brief conference to discuss her continued progress.\n\nBest regards,\nMs. Rodriguez`,
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          attachments: [{ name: 'math_progress_report.pdf', size: 245760 }]
        }
      ]
    },
    {
      id: 'thread-002',
      senderName: 'Principal Davis',
      senderType: 'admin',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      subject: 'Upcoming Parent-Teacher Conferences',
      lastMessage: 'We are scheduling parent-teacher conferences for the week of January 15th...',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      unread: true,
      priority: 'high',
      category: 'administrative',
      hasAttachment: false,
      messages: [
        {
          sender: 'admin',
          content: `Dear Parents,\n\nWe are scheduling parent-teacher conferences for the week of January 15th. Please use the online scheduling system to book your preferred time slots.\n\nConferences will be available both in-person and virtually via video call. Each session is allocated 15 minutes per child.\n\nPlease book your appointments by January 10th to ensure availability.\n\nThank you,\nPrincipal Davis`,
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'thread-003',
      senderName: 'Mr. Thompson',
      senderType: 'teacher',
      senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      subject: 'Liam\'s Science Fair Project',
      lastMessage: 'Liam has chosen an excellent topic for his science fair project...',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      unread: false,
      priority: 'normal',
      category: 'academic',
      hasAttachment: false,
      messages: [
        {
          sender: 'teacher',
          content: `Hi Mrs. Johnson,\n\nLiam has chosen an excellent topic for his science fair project: "How Different Liquids Affect Plant Growth." He's very excited about it and has already started planning his experiment.\n\nThe project is due on January 20th, and I'll be available for guidance if needed. Please let me know if you have any questions about the requirements.\n\nBest,\nMr. Thompson`,
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
        },
        {
          sender: 'parent',
          content: `Thank you for the update! Liam is indeed very excited about this project. We'll make sure he has all the materials he needs.\n\nCould you please send me the detailed requirements document? I want to make sure we're covering all the necessary components.\n\nThanks again!`,
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ]
    },
    {
      id: 'thread-004',
      senderName: 'School Nurse Martinez',
      senderType: 'admin',
      senderAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      subject: 'Health Form Update Required',
      lastMessage: 'Please update Emma\'s emergency contact information in her health record...',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      unread: false,
      priority: 'urgent',
      category: 'health',
      hasAttachment: true,
      messages: [
        {
          sender: 'admin',
          content: `Dear Mrs. Johnson,\n\nWe need to update Emma's emergency contact information in her health record. The current contact number on file appears to be outdated.\n\nPlease complete the attached health form and return it by January 18th. This is required for all students as part of our safety protocols.\n\nIf you have any questions, please don't hesitate to contact the nurse's office.\n\nThank you,\nNurse Martinez`,
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          attachments: [{ name: 'health_form_update.pdf', size: 156432 }]
        }
      ]
    },
    {
      id: 'thread-005',senderName: 'SchoolSync System',senderType: 'school',senderAvatar: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=150&h=150&fit=crop&crop=face',subject: 'Weekly School Newsletter',lastMessage: 'This week\'s highlights include the upcoming science fair, winter concert...',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      unread: false,
      priority: 'normal',
      category: 'events',
      hasAttachment: false,
      messages: [
        {
          sender: 'school',
          content: `Dear Families,\n\nThis week's highlights include:\n\n• Science Fair preparations are underway - projects due January 20th\n• Winter Concert scheduled for January 25th at 7:00 PM\n• Early dismissal on January 22nd for teacher professional development\n• Cafeteria will be serving special themed lunches next week\n\nPlease mark your calendars and we look forward to seeing you at our upcoming events!\n\nBest regards,\nLincoln Elementary School`,
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        }
      ]
    }
  ]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const handleThreadClick = (thread) => {
    setSelectedThread(thread);
    setShowConversation(true);
    
    // Mark as read
    setMessageThreads(prev => 
      prev?.map(t => 
        t?.id === thread?.id ? { ...t, unread: false } : t
      )
    );
  };

  const handleCloseConversation = () => {
    setShowConversation(false);
    setSelectedThread(null);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      senderType: 'all',
      category: 'all',
      priority: 'all',
      status: 'all',
      search: ''
    });
  };

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'compose':
        setShowComposeModal(true);
        break;
      case 'schedule':
        // Handle schedule conference
        console.log('Schedule conference clicked');
        break;
      case 'reports':
        // Handle view reports
        console.log('View reports clicked');
        break;
      case 'events':
        // Handle school events
        console.log('School events clicked');
        break;
      default:
        break;
    }
  };

  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
    // Handle message sending logic here
  };

  const handleSendReply = (replyData) => {
    if (selectedThread) {
      const newMessage = {
        sender: 'parent',
        content: replyData?.message,
        timestamp: new Date(),
        attachments: replyData?.attachments
      };

      setMessageThreads(prev =>
        prev?.map(thread =>
          thread?.id === selectedThread?.id
            ? {
                ...thread,
                messages: [...(thread?.messages || []), newMessage],
                lastMessage: replyData?.message?.substring(0, 50) + '...',
                timestamp: new Date()
              }
            : thread
        )
      );

      // Update selected thread
      setSelectedThread(prev => ({
        ...prev,
        messages: [...(prev?.messages || []), newMessage]
      }));
    }
  };

  // Filter messages based on current filters
  const filteredThreads = messageThreads?.filter(thread => {
    if (filters?.senderType !== 'all' && thread?.senderType !== filters?.senderType) return false;
    if (filters?.category !== 'all' && thread?.category !== filters?.category) return false;
    if (filters?.priority !== 'all' && thread?.priority !== filters?.priority) return false;
    if (filters?.status !== 'all') {
      if (filters?.status === 'unread' && !thread?.unread) return false;
      if (filters?.status === 'read' && thread?.unread) return false;
    }
    if (filters?.search && !thread?.subject?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
        !thread?.senderName?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    
    return true;
  });

  const unreadCount = messageThreads?.filter(thread => thread?.unread)?.length;

  useEffect(() => {
    document.title = 'Parent Communication - SchoolSync';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header user={currentUser} onLogout={handleLogout} />
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={handleSidebarToggle}
        user={currentUser}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Parent Communication</h1>
                <p className="text-muted-foreground mt-1">
                  Stay connected with your children's teachers and school staff
                </p>
              </div>
              <div className="flex items-center space-x-3">
                {unreadCount > 0 && (
                  <div className="flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    <Icon name="Mail" size={16} />
                    <span className="text-sm font-medium">{unreadCount} unread</span>
                  </div>
                )}
                <Button
                  variant="default"
                  iconName="PenTool"
                  iconPosition="left"
                  onClick={() => setShowComposeModal(true)}
                >
                  Compose Message
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Messages Section */}
            <div className={`xl:col-span-3 ${showConversation ? 'hidden xl:grid xl:grid-cols-2 xl:gap-6' : ''}`}>
              {/* Message List */}
              <div className={showConversation ? 'xl:col-span-1' : ''}>
                <div className="bg-card rounded-lg border border-border overflow-hidden">
                  <MessageFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={handleClearFilters}
                  />
                  
                  <div className="h-[600px] overflow-y-auto">
                    {filteredThreads?.length > 0 ? (
                      filteredThreads?.map((thread) => (
                        <MessageThread
                          key={thread?.id}
                          thread={thread}
                          onThreadClick={handleThreadClick}
                          isSelected={selectedThread?.id === thread?.id}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center p-8">
                        <Icon name="Inbox" size={48} className="text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium text-foreground mb-2">No messages found</h3>
                        <p className="text-muted-foreground">
                          Try adjusting your filters or compose a new message
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Conversation View */}
              {showConversation && selectedThread && (
                <div className="xl:col-span-1">
                  <div className="bg-card rounded-lg border border-border h-[600px]">
                    <ConversationView
                      thread={selectedThread}
                      onClose={handleCloseConversation}
                      onSendMessage={handleSendReply}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Conversation Overlay */}
            {showConversation && selectedThread && (
              <div className="fixed inset-0 z-40 bg-background xl:hidden">
                <div className="h-full pt-16">
                  <ConversationView
                    thread={selectedThread}
                    onClose={handleCloseConversation}
                    onSendMessage={handleSendReply}
                  />
                </div>
              </div>
            )}

            {/* Quick Access Panel */}
            <div className={`xl:col-span-1 ${showConversation ? 'hidden xl:block' : ''}`}>
              <QuickAccessPanel onActionClick={handleQuickAction} />
            </div>
          </div>
        </div>
      </main>
      {/* Compose Message Modal */}
      <ComposeMessageModal
        isOpen={showComposeModal}
        onClose={() => setShowComposeModal(false)}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ParentCommunication;