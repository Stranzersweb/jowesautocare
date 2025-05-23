import { motion } from 'framer-motion';
import { 
  IoChatbubbleEllipses, 
  IoTrendingUp, 
  IoPersonOutline,
  IoTimeOutline,
  IoHappyOutline,
  IoSadOutline,
  IoRemoveOutline
} from 'react-icons/io5';
import { format } from 'date-fns';

const ChatAnalytics = ({ analytics, recentChats }) => {
  const { 
    totalConversations, 
    conversionRate, 
    averageMessageCount, 
    topTopics, 
    satisfactionBreakdown 
  } = analytics;

  const getSatisfactionIcon = (satisfaction) => {
    switch (satisfaction) {
      case 'positive': return <IoHappyOutline className="text-green-500" />;
      case 'negative': return <IoSadOutline className="text-red-500" />;
      default: return <IoRemoveOutline className="text-yellow-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getLeadQualityBadge = (quality) => {
    const styles = {
      high: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-red-100 text-red-800'
    };
    return styles[quality] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <IoChatbubbleEllipses className="text-blue-600" />
          Chat Analytics
        </h2>
        <div className="text-sm text-gray-500">
          Last 7 days
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{totalConversations}</div>
          <div className="text-sm text-blue-600">Total Chats</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{conversionRate}%</div>
          <div className="text-sm text-green-600">Conversion Rate</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">{averageMessageCount}</div>
          <div className="text-sm text-purple-600">Avg Messages</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">
            {satisfactionBreakdown.positive}
          </div>
          <div className="text-sm text-orange-600">Happy Customers</div>
        </div>
      </div>

      {/* Top Topics */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Top Chat Topics</h3>
        <div className="space-y-2">
          {topTopics.map((topic, index) => (
            <div key={topic.topic} className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-700">{topic.topic}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${(topic.count / totalConversations) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-600 w-8">
                  {topic.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Conversations */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Recent Conversations</h3>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {recentChats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <IoPersonOutline className="text-white" size={16} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{chat.customer}</div>
                  <div className="text-sm text-gray-600">{chat.topic}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getStatusBadge(chat.status)
                }`}>
                  {chat.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getLeadQualityBadge(chat.leadQuality)
                }`}>
                  {chat.leadQuality}
                </span>
                {getSatisfactionIcon(chat.satisfaction)}
                <div className="text-xs text-gray-500">
                  {format(chat.timestamp, 'HH:mm')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatAnalytics;