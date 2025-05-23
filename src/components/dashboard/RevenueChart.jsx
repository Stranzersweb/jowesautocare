import { motion } from 'framer-motion';
import { 
  IoCashOutline, 
  IoTrendingUp, 
  IoStatsChart
} from 'react-icons/io5';
import { format } from 'date-fns';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueChart = ({ dailyMetrics }) => {
  const chartLabels = dailyMetrics.map(metric => format(metric.date, 'MMM dd'));
  const revenueData = dailyMetrics.map(metric => metric.revenue);
  const bookingsData = dailyMetrics.map(metric => metric.bookings);
  const chatData = dailyMetrics.map(metric => metric.chatInteractions);

  const totalRevenue = revenueData.reduce((sum, value) => sum + value, 0);
  const totalBookings = bookingsData.reduce((sum, value) => sum + value, 0);
  const avgDailyRevenue = Math.round(totalRevenue / revenueData.length);
  const conversionRate = ((totalBookings / chatData.reduce((sum, value) => sum + value, 0)) * 100).toFixed(1);

  const revenueChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Daily Revenue',
        data: revenueData,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }
    ]
  };

  const activityChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Bookings',
        data: bookingsData,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1
      },
      {
        label: 'Chat Interactions',
        data: chatData,
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgb(168, 85, 247)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          },
          color: '#6B7280'
        }
      }
    }
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <IoCashOutline className="text-green-600" />
          Revenue & Activity Trends
        </h2>
        <div className="flex items-center gap-2 text-sm text-green-600">
          <IoTrendingUp />
          <span>+12% this week</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-green-600">Total Revenue (7d)</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">
            ${avgDailyRevenue.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600">Avg Daily Revenue</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {conversionRate}%
          </div>
          <div className="text-sm text-purple-600">Chat → Booking</div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Daily Revenue</h3>
        <div className="h-48">
          <Line data={revenueChartData} options={chartOptions} />
        </div>
      </div>

      {/* Activity Chart */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Daily Activity</h3>
        <div className="h-48">
          <Bar data={activityChartData} options={chartOptions} />
        </div>
      </div>
    </motion.div>
  );
};

export default RevenueChart;