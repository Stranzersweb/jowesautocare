import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  IoLockClosedOutline, 
  IoPersonOutline, 
  IoEyeOutline, 
  IoEyeOffOutline,
  IoStatsChart
} from 'react-icons/io5';

const AdminLogin = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Demo credentials - In production, this would be secure authentication
    if (credentials.username === 'admin' && credentials.password === 'demo123') {
      setTimeout(() => {
        onLogin(true);
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setError('Invalid credentials. Use admin/demo123 for demo.');
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <IoStatsChart className="text-white" size={24} />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Management Dashboard
          </h1>
          <p className="text-gray-600">
            Jower's Auto Service Admin Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoPersonOutline className="text-gray-400" size={20} />
              </div>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoLockClosedOutline className="text-gray-400" size={20} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="text-gray-400 hover:text-gray-600" size={20} />
                ) : (
                  <IoEyeOutline className="text-gray-400 hover:text-gray-600" size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !credentials.username || !credentials.password}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h3 className="font-semibold text-amber-800 text-sm mb-2">Demo Access</h3>
          <div className="text-amber-700 text-sm space-y-1">
            <p><strong>Username:</strong> admin</p>
            <p><strong>Password:</strong> demo123</p>
            <p className="text-xs mt-2 text-amber-600">
              This is a demonstration dashboard with simulated data.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          © 2025 Jower's Auto Service. All rights reserved.
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;