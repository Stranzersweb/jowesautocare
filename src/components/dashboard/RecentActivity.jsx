import { motion } from 'framer-motion';
import { 
  IoTimeOutline, 
  IoChatbubbleEllipses, 
  IoCalendarOutline,
  IoPersonOutline,
  IoCarSport,
  IoCashOutline
} from 'react-icons/io5';
import { format, formatDistanceToNow } from 'date-fns';

const RecentActivity = ({ conversations, bookings }) => {
  // Combine and sort activities by timestamp
  const activities = [
    ...conversations.slice(0, 5).map(conv => ({
      id: `chat-${conv.id}`,
      type: 'chat',
      title: `Chat with ${conv.customer}`,
      description: conv.topic,
      timestamp: conv.timestamp,
      icon: IoChatbubbleEllipses,
      color: 'blue',
      status: conv.status,
      metadata: {
        leadQuality: conv.leadQuality,
        converted: conv.converted,
        messageCount: conv.messageCount
      }
    })),
    ...bookings.slice(0, 5).map(booking => ({
      id: `booking-${booking.id}`,
      type: 'booking',
      title: `${booking.service} scheduled`,
      description: `${booking.customer} - ${booking.vehicle}`,
      timestamp: new Date(booking.scheduledDate),
      icon: IoCalendarOutline,
      color: 'green',
      status: booking.status,
      metadata: {
        price: booking.price,
        source: booking.source
      }
    }))
  ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);

  const getActivityIcon = (type, color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600'
    };
    return colors[color] || colors.blue;
  };

  const getStatusIndicator = (type, status, metadata) => {
    if (type === 'chat') {
      if (metadata.converted) {
        return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Converted</span>;
      }
      return <span className={`px-2 py-1 text-xs rounded-full ${
        status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
      }`}>{status}</span>;
    }
    
    if (type === 'booking') {
      const styles = {
        completed: 'bg-green-100 text-green-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        scheduled: 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800'
      };
      return (
        <span className={`px-2 py-1 text-xs rounded-full ${
          styles[status] || 'bg-gray-100 text-gray-800'
        }`}>
          {status.replace('-', ' ')}
        </span>
      );
    }
  };

  const getMetadataDisplay = (type, metadata) => {
    if (type === 'chat') {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{metadata.messageCount} messages</span>
          <span>•</span>
          <span className={`capitalize ${
            metadata.leadQuality === 'high' ? 'text-green-600' :
            metadata.leadQuality === 'medium' ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {metadata.leadQuality} quality
          </span>
        </div>
      );
    }
    
    if (type === 'booking') {
      return (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>${metadata.price}</span>
          <span>•</span>
          <span className="capitalize">{metadata.source}</span>
        </div>
      );
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <IoTimeOutline className="text-blue-600" />
          Recent Activity
        </h2>
        <div className="text-sm text-gray-500">
          Live feed
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          const iconClasses = getActivityIcon(activity.type, activity.color);
          
          return (
            <motion.div
              key={activity.id}
              className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`p-2 rounded-lg ${iconClasses} flex-shrink-0`}>
                <IconComponent size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-gray-900 truncate">
                    {activity.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {getStatusIndicator(activity.type, activity.status, activity.metadata)}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                
                <div className="flex items-center justify-between">
                  {getMetadataDisplay(activity.type, activity.metadata)}
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
        
        {activities.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <IoTimeOutline size={32} className="mx-auto mb-2 opacity-50" />
            <p>No recent activity</p>
          </div>
        )}
      </div>

      {/* Activity Summary */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-blue-600">
              {conversations.length}
            </div>
            <div className="text-sm text-gray-600">Chat Sessions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">
              {bookings.length}
            </div>
            <div className="text-sm text-gray-600">Bookings Today</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600">
              {Math.round((conversations.filter(c => c.converted).length / conversations.length) * 100) || 0}%
            </div>
            <div className="text-sm text-gray-600">Conversion Rate</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentActivity;