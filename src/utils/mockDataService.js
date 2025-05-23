// Mock data service for demo purposes
import { format, subDays, addDays, startOfDay, endOfDay } from 'date-fns';

// Generate realistic demo data
const generateMockData = () => {
  const today = new Date();
  const services = [
    'Oil Change', 'Brake Repair', 'Tire Rotation', 'Engine Diagnostic', 
    'Transmission Service', 'Air Filter Replacement', 'Battery Replacement',
    'Cooling System Service', 'Alignment', 'Inspection'
  ];

  const customers = [
    'John Smith', 'Sarah Johnson', 'Mike Davis', 'Lisa Chen', 'Robert Wilson',
    'Emily Brown', 'David Martinez', 'Jessica Taylor', 'Christopher Lee', 'Amanda Garcia',
    'Matthew Anderson', 'Ashley Thompson', 'James Rodriguez', 'Melissa White', 'Daniel Harris'
  ];

  const chatTopics = [
    'Service pricing inquiry', 'Appointment scheduling', 'Service availability', 
    'Warranty questions', 'General information', 'Emergency service', 'Parts availability',
    'Service duration', 'Location directions', 'Payment methods'
  ];

  // Generate chat conversations
  const generateChatConversations = () => {
    const conversations = [];
    for (let i = 0; i < 25; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const topic = chatTopics[Math.floor(Math.random() * chatTopics.length)];
      const timestamp = new Date(today.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
      
      conversations.push({
        id: i + 1,
        customer: customer,
        topic: topic,
        timestamp: timestamp,
        status: Math.random() > 0.3 ? 'completed' : 'active',
        satisfaction: Math.random() > 0.2 ? 'positive' : Math.random() > 0.5 ? 'neutral' : 'negative',
        messageCount: Math.floor(Math.random() * 15) + 3,
        leadQuality: Math.random() > 0.4 ? 'high' : Math.random() > 0.5 ? 'medium' : 'low',
        converted: Math.random() > 0.6
      });
    }
    return conversations.sort((a, b) => b.timestamp - a.timestamp);
  };

  // Generate service bookings
  const generateBookings = () => {
    const bookings = [];
    const statuses = ['scheduled', 'in-progress', 'completed', 'cancelled'];
    
    for (let i = 0; i < 30; i++) {
      const customer = customers[Math.floor(Math.random() * customers.length)];
      const service = services[Math.floor(Math.random() * services.length)];
      const scheduledDate = new Date(today.getTime() + (Math.random() - 0.5) * 14 * 24 * 60 * 60 * 1000);
      const price = Math.floor(Math.random() * 400) + 50;
      
      bookings.push({
        id: i + 1,
        customer: customer,
        service: service,
        scheduledDate: scheduledDate,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        price: price,
        vehicle: `${Math.random() > 0.5 ? 'Toyota' : Math.random() > 0.5 ? 'Honda' : 'Ford'} ${Math.random() > 0.5 ? 'Camry' : Math.random() > 0.5 ? 'Accord' : 'F-150'}`,
        notes: Math.random() > 0.5 ? 'Customer requested early morning appointment' : '',
        source: Math.random() > 0.4 ? 'chatbot' : Math.random() > 0.5 ? 'phone' : 'walk-in'
      });
    }
    return bookings.sort((a, b) => a.scheduledDate - b.scheduledDate);
  };

  // Generate daily metrics
  const generateDailyMetrics = () => {
    const metrics = [];
    for (let i = 6; i >= 0; i--) {
      const date = subDays(today, i);
      metrics.push({
        date: date,
        chatInteractions: Math.floor(Math.random() * 15) + 5,
        bookings: Math.floor(Math.random() * 8) + 2,
        revenue: Math.floor(Math.random() * 2000) + 800,
        satisfaction: Math.random() * 0.3 + 0.7, // 70-100%
        conversionRate: Math.random() * 0.2 + 0.15 // 15-35%
      });
    }
    return metrics;
  };

  return {
    conversations: generateChatConversations(),
    bookings: generateBookings(),
    dailyMetrics: generateDailyMetrics(),
    todayStats: {
      totalChats: 12,
      activeChats: 3,
      newLeads: 8,
      conversions: 5,
      scheduledServices: 6,
      inProgressServices: 2,
      completedServices: 4,
      dailyRevenue: 1450,
      averageRating: 4.7,
      chatResponseTime: '2.3 min'
    }
  };
};

// Simulate real-time updates
class MockDataService {
  constructor() {
    this.data = generateMockData();
    this.listeners = [];
  }

  getData() {
    return this.data;
  }

  getTodayBookings() {
    const today = new Date();
    return this.data.bookings.filter(booking => {
      const bookingDate = new Date(booking.scheduledDate);
      return bookingDate.toDateString() === today.toDateString();
    });
  }

  getRecentChats(limit = 10) {
    return this.data.conversations.slice(0, limit);
  }

  getChatAnalytics() {
    const conversations = this.data.conversations;
    const total = conversations.length;
    const converted = conversations.filter(c => c.converted).length;
    const byTopic = conversations.reduce((acc, conv) => {
      acc[conv.topic] = (acc[conv.topic] || 0) + 1;
      return acc;
    }, {});

    return {
      totalConversations: total,
      conversionRate: ((converted / total) * 100).toFixed(1),
      averageMessageCount: (conversations.reduce((sum, c) => sum + c.messageCount, 0) / total).toFixed(1),
      topTopics: Object.entries(byTopic)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([topic, count]) => ({ topic, count })),
      satisfactionBreakdown: {
        positive: conversations.filter(c => c.satisfaction === 'positive').length,
        neutral: conversations.filter(c => c.satisfaction === 'neutral').length,
        negative: conversations.filter(c => c.satisfaction === 'negative').length
      }
    };
  }

  getUpcomingAppointments() {
    const now = new Date();
    return this.data.bookings
      .filter(booking => 
        booking.status === 'scheduled' && 
        new Date(booking.scheduledDate) > now
      )
      .slice(0, 10);
  }

  // Simulate adding new chat
  addChatConversation(conversation) {
    this.data.conversations.unshift({
      ...conversation,
      id: this.data.conversations.length + 1,
      timestamp: new Date()
    });
    this.notifyListeners();
  }

  // Simulate real-time updates
  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  notifyListeners() {
    this.listeners.forEach(callback => callback(this.data));
  }

  // Simulate live data updates
  startLiveUpdates() {
    setInterval(() => {
      // Randomly update some metrics
      if (Math.random() > 0.7) {
        this.data.todayStats.totalChats += 1;
        if (Math.random() > 0.6) {
          this.data.todayStats.newLeads += 1;
        }
        this.notifyListeners();
      }
    }, 10000); // Update every 10 seconds for demo
  }
}

export const mockDataService = new MockDataService();
export default mockDataService;