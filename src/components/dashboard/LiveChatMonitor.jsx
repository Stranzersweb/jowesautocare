import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  IoRadioOutline, 
  IoChatbubbleEllipses, 
  IoPersonOutline,
  IoTimeOutline,
  IoPulseOutline,
  IoEyeOutline,
  IoCheckmarkCircle,
  IoWarningOutline
} from 'react-icons/io5';
import { format, formatDistanceToNow } from 'date-fns';

const LiveChatMonitor = ({ conversations }) => {
  const [activeChats, setActiveChats] = useState([]);
  const [isOnline, setIsOnline] = useState(true);
  const [lastActivity, setLastActivity] = useState(new Date());

  useEffect(() => {
    // Filter active conversations
    const active = conversations.filter(conv => conv.status === 'active');
    setActiveChats(active);
    
    // Simulate real-time activity
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLastActivity(new Date());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [conversations]);

  const getChatPriority = (conv) => {
    if (conv.leadQuality === 'high' && !conv.converted) return 'high';
    if (conv.messageCount > 10) return 'medium';
    return 'low';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getResponseTime = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / (1000 * 60)); // minutes
    
    if (diff < 1) return { time: '<1m', status: 'excellent' };
    if (diff < 3) return { time: `${diff}m`, status: 'good' };
    if (diff < 5) return { time: `${diff}m`, status: 'warning' };
    return { time: `${diff}m`, status: 'critical' };
  };

  const getResponseStatus = (status) => {
    const styles = {
      excellent: 'text-green-600',
      good: 'text-blue-600',
      warning: 'text-yellow-600',
      critical: 'text-red-600'
    };
    return styles[status] || styles.good;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <div className="relative">
            <IoRadioOutline className="text-blue-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>
          Live Chat Monitor
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            isOnline ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span className="text-sm text-gray-600">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <IoChatbubbleEllipses className="text-blue-600" size={16} />
            <span className="text-sm text-blue-600">Active Chats</span>
          </div>
          <div className="text-xl font-bold text-blue-600 mt-1">
            {activeChats.length}
          </div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <IoTimeOutline className="text-green-600" size={16} />
            <span className="text-sm text-green-600">Avg Response</span>
          </div>
          <div className="text-xl font-bold text-green-600 mt-1">
            2.3m
          </div>
        </div>
      </div>

      {/* Active Conversations */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <IoPulseOutline className="text-red-500" />
          Active Conversations
        </h3>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {activeChats.length > 0 ? (
              activeChats.map((chat) => {
                const priority = getChatPriority(chat);
                const response = getResponseTime(chat.timestamp);
                
                return (
                  <motion.div
                    key={chat.id}
                    className={`p-3 rounded-lg border-l-4 ${getPriorityColor(priority)}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                          <IoPersonOutline className="text-white" size={12} />
                        </div>
                        <span className="font-medium text-gray-900 text-sm">
                          {chat.customer}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${
                          getResponseStatus(response.status)
                        }`}>
                          {response.time}
                        </span>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <IoEyeOutline size={14} className="text-gray-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      {chat.topic}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {chat.messageCount} messages
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full capitalize ${
                          priority === 'high' ? 'bg-red-100 text-red-700' :
                          priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {priority}
                        </span>
                        {chat.leadQuality === 'high' && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                            Hot Lead
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div 
                className="text-center py-8 text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <IoChatbubbleEllipses size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No active chats</p>
                <p className="text-xs mt-1">Waiting for customers...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Buttons */}
        {activeChats.length > 0 && (
          <div className="flex gap-2 pt-3 border-t border-gray-100">
            <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
              <IoEyeOutline size={14} />
              View All
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
              <IoCheckmarkCircle size={14} />
              Mark Read
            </button>
          </div>
        )}
      </div>

      {/* Performance Indicators */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-sm font-medium text-gray-700 mb-2">Performance</div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Response Time</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full w-3/4" />
              </div>
              <span className="text-xs text-green-600">Good</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Customer Satisfaction</span>
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full w-5/6" />
              </div>
              <span className="text-xs text-blue-600">Excellent</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LiveChatMonitor;