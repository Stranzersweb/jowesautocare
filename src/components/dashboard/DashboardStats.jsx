import { motion } from 'framer-motion';
import { 
  IoChatbubbleEllipses, 
  IoPeopleOutline,
  IoCalendarOutline,
  IoCashOutline,
  IoTrendingUp,
  IoTimeOutline,
  IoCheckmarkCircle,
  IoCarSport
} from 'react-icons/io5';

const DashboardStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Chats Today',
      value: stats.totalChats,
      change: '+15%',
      changeType: 'positive',
      icon: IoChatbubbleEllipses,
      color: 'blue',
      subtitle: `${stats.activeChats} active now`
    },
    {
      title: 'New Leads',
      value: stats.newLeads,
      change: '+23%',
      changeType: 'positive',
      icon: IoPeopleOutline,
      color: 'green',
      subtitle: `${stats.conversions} converted`
    },
    {
      title: 'Today\'s Services',
      value: stats.completedServices,
      change: '+8%',
      changeType: 'positive',
      icon: IoCarSport,
      color: 'purple',
      subtitle: `${stats.inProgressServices} in progress`
    },
    {
      title: 'Daily Revenue',
      value: `$${stats.dailyRevenue.toLocaleString()}`,
      change: '+12%',
      changeType: 'positive',
      icon: IoCashOutline,
      color: 'emerald',
      subtitle: `${stats.scheduledServices} scheduled`
    },
    {
      title: 'Avg Response Time',
      value: stats.chatResponseTime,
      change: '-18%',
      changeType: 'positive',
      icon: IoTimeOutline,
      color: 'indigo',
      subtitle: 'Target: <3 min'
    },
    {
      title: 'Customer Rating',
      value: stats.averageRating,
      change: '+0.2',
      changeType: 'positive',
      icon: IoCheckmarkCircle,
      color: 'yellow',
      subtitle: 'Out of 5.0'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-500 text-blue-500',
      green: 'bg-green-500 text-green-500',
      purple: 'bg-purple-500 text-purple-500',
      emerald: 'bg-emerald-500 text-emerald-500',
      indigo: 'bg-indigo-500 text-indigo-500',
      yellow: 'bg-yellow-500 text-yellow-500'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        
        return (
          <motion.div
            key={stat.title}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${colorClasses.split(' ')[0]} bg-opacity-10`}>
                <IconComponent className={colorClasses.split(' ')[1]} size={20} />
              </div>
              <div className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardStats;