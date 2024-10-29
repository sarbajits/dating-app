import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Users, Eye, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);

  const fetchVisitorCount = async () => {
    try {
      const response = await fetch('https://swember.in/get_visitors_count.php');
      const data = await response.json();
      if (data.status === 'success') {
        setVisitorCount(data.total_visitors);
      }
    } catch (error) {
      console.error('Error fetching visitor count:', error);
    }
  };

  const fetchRegistrationCount = async () => {
    try {
      const response = await fetch('https://swember.in/get_users_count.php');
      const data = await response.json();
      if (data.status === 'success') {
        setRegistrationCount(data.total_users);
      }
    } catch (error) {
      console.error('Error fetching registration count:', error);
    }
  };

  useEffect(() => {
    fetchVisitorCount();
    fetchRegistrationCount();
    const interval = setInterval(() => {
      fetchVisitorCount();
      fetchRegistrationCount();
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-rose-50">
      {/* Hero Section */}
      <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative inline-block"
          >
            <span className="px-4 py-1 text-sm font-medium text-purple-600 bg-purple-100 rounded-full">
              Coming Soon in 2025
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-4xl sm:text-6xl font-bold text-gray-900"
          >
            Find Your Perfect Match from your CAMPUS with
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-purple-600">
              Swember
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Join thousands of people who have already pre-registered for the next gen CAMPUS dating.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-shadow duration-300"
              onClick={() => navigate('/pre-register')}
            >
              Pre-Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-3xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <div className="flex items-center">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Eye className="h-6 w-6 text-rose-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Visitors</p>
                <h3 className="text-2xl font-bold text-gray-900">{visitorCount.toLocaleString()}</h3>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-lg">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pre-Registered Users</p>
                <h3 className="text-2xl font-bold text-gray-900">{registrationCount.toLocaleString()}</h3>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-1/2 h-1/2 rounded-full bg-gradient-to-b from-rose-200 to-rose-300 opacity-20 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-1/2 h-1/2 rounded-full bg-gradient-to-t from-purple-200 to-purple-300 opacity-20 blur-3xl" />
      </div>
    </div>
  );
};

export default LandingPage;