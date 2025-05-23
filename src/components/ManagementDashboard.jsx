import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  IoStatsChart, 
  IoChatbubbleEllipses, 
  IoCalendarOutline,
  IoCarSport,
  IoCashOutline,
  IoTrendingUp,
  IoTimeOutline,
  IoPeopleOutline,
  IoCheckmarkCircle,
  IoWarningOutline,
  IoRefresh,
  IoLogOutOutline,
  IoHomeOutline
} from 'react-icons/io5';
import mockDataService from '../utils/mockDataService';
import DashboardStats from './dashboard/DashboardStats';
import ChatAnalytics from './dashboard/ChatAnalytics';
import BookingOverview from './dashboard/BookingOverview';
import RevenueChart from './dashboard/RevenueChart';
import RecentActivity from './dashboard/RecentActivity';
import LiveChatMonitor from './dashboard/LiveChatMonitor';

const ManagementDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(mockDataService.getData());
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribe = mockDataService.subscribe((newData) => {
      setData(newData);
      setLastUpdate(new Date());
    });

    // Start live updates for demo
    mockDataService.startLiveUpdates();

    return unsubscribe;
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(mockDataService.getData());
      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const handleLogout = () => {
    // In a real app, you'd clear authentication tokens here
    navigate('/admin/login');
    window.location.reload(); // Force reload to reset auth state
  };

  const handleGoHome = () => {
    navigate('/');
  };

  const todayBookings = mockDataService.getTodayBookings();
  const recentChats = mockDataService.getRecentChats(8);
  const chatAnalytics = mockDataService.getChatAnalytics();
  const upcomingAppointments = mockDataService.getUpcomingAppointments();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <IoStatsChart className="text-blue-600" />
              Management Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Real-time insights for Jower's Auto Service
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
            <button
              onClick={handleGoHome}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <IoHomeOutline />
              View Website
            </button>
            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              <IoRefresh className={isLoading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <IoLogOutOutline />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <DashboardStats stats={data.todayStats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Chat Analytics - Takes 2 columns */}
        <div className="lg:col-span-2">
          <ChatAnalytics 
            analytics={chatAnalytics} 
            recentChats={recentChats}
          />
        </div>

        {/* Live Chat Monitor */}
        <div className="lg:col-span-1">
          <LiveChatMonitor conversations={recentChats} />
        </div>
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Today's Bookings */}
        <BookingOverview 
          todayBookings={todayBookings}
          upcomingAppointments={upcomingAppointments}
        />

        {/* Revenue Chart */}
        <RevenueChart dailyMetrics={data.dailyMetrics} />
      </div>

      {/* Recent Activity */}
      <RecentActivity 
        conversations={recentChats}
        bookings={todayBookings}
      />

      {/* Demo Notice */}
      <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <div className="flex items-start gap-3">
          <IoWarningOutline className="text-amber-600 mt-0.5" size={20} />
          <div>
            <h3 className="font-semibold text-amber-800">Demo Mode Active</h3>
            <p className="text-amber-700 text-sm mt-1">
              This dashboard is displaying simulated data for demonstration purposes. 
              In production, this would show real customer interactions, bookings, and business metrics.
              <br /><br />
              <strong>Demo Features:</strong>
              <br />• Real-time chat monitoring and analytics
              <br />• Booking management and scheduling overview
              <br />• Revenue tracking and performance metrics
              <br />• Customer satisfaction and conversion tracking
              <br />• Live activity feed with chat → booking conversions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementDashboard;