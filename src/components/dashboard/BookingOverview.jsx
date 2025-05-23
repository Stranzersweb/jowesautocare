import { motion } from 'framer-motion';
import { 
  IoCalendarOutline, 
  IoCarSport, 
  IoTimeOutline,
  IoPersonOutline,
  IoCashOutline,
  IoCheckmarkCircle,
  IoHourglassOutline,
  IoPlayOutline,
  IoCloseCircle
} from 'react-icons/io5';
import { format } from 'date-fns';

const BookingOverview = ({ todayBookings, upcomingAppointments }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <IoCheckmarkCircle className="text-green-500" />;
      case 'in-progress': return <IoPlayOutline className="text-blue-500" />;
      case 'scheduled': return <IoHourglassOutline className="text-yellow-500" />;
      case 'cancelled': return <IoCloseCircle className="text-red-500" />;
      default: return <IoTimeOutline className="text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      completed: 'bg-green-100 text-green-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      scheduled: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const getSourceBadge = (source) => {
    const styles = {
      chatbot: 'bg-purple-100 text-purple-800',
      phone: 'bg-blue-100 text-blue-800',
      'walk-in': 'bg-green-100 text-green-800'
    };
    return styles[source] || 'bg-gray-100 text-gray-800';
  };

  const todayRevenue = todayBookings
    .filter(booking => booking.status === 'completed')
    .reduce((sum, booking) => sum + booking.price, 0);

  const statusCounts = todayBookings.reduce((acc, booking) => {
    acc[booking.status] = (acc[booking.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <IoCalendarOutline className="text-blue-600" />
          Today's Operations
        </h2>
        <div className="text-sm font-medium text-green-600">
          ${todayRevenue.toLocaleString()} earned
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="text-lg font-bold text-blue-600">
            {statusCounts.completed || 0}
          </div>
          <div className="text-xs text-blue-600">Completed</div>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <div className="text-lg font-bold text-yellow-600">
            {statusCounts['in-progress'] || 0}
          </div>
          <div className="text-xs text-yellow-600">In Progress</div>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="text-lg font-bold text-green-600">
            {statusCounts.scheduled || 0}
          </div>
          <div className="text-xs text-green-600">Scheduled</div>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-lg font-bold text-gray-600">
            {todayBookings.length}
          </div>
          <div className="text-xs text-gray-600">Total</div>
        </div>
      </div>

      {/* Today's Bookings */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Today's Schedule</h3>
        <div className="space-y-3 max-h-48 overflow-y-auto">
          {todayBookings.length > 0 ? (
            todayBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(booking.status)}
                  <div>
                    <div className="font-medium text-gray-900">{booking.customer}</div>
                    <div className="text-sm text-gray-600">
                      {booking.service} - {booking.vehicle}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(booking.scheduledDate), 'HH:mm')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getSourceBadge(booking.source)
                  }`}>
                    {booking.source}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusBadge(booking.status)
                  }`}>
                    {booking.status.replace('-', ' ')}
                  </span>
                  <div className="text-sm font-medium text-green-600">
                    ${booking.price}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <IoCalendarOutline size={32} className="mx-auto mb-2 opacity-50" />
              <p>No bookings scheduled for today</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Upcoming Appointments</h3>
        <div className="space-y-2">
          {upcomingAppointments.slice(0, 5).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <IoCarSport className="text-blue-500" size={16} />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.customer}
                  </div>
                  <div className="text-xs text-gray-600">
                    {appointment.service}
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                {format(new Date(appointment.scheduledDate), 'MMM dd, HH:mm')}
              </div>
            </div>
          ))}
          
          {upcomingAppointments.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No upcoming appointments
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BookingOverview;