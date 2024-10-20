import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(0);
  const [registrationCount, setRegistrationCount] = useState(0);

  // Fetch the visitor count from the API
  const fetchVisitorCount = async () => {
    const response = await fetch('https://swember.in/get_visitors_count.php'); // Adjust the path as necessary
    const data = await response.json();
    if (data.status === 'success') {
      setVisitorCount(data.data);
    } else {
      console.error('Error fetching visitor count:', data.message);
    }
  };

  // Fetch the registration count from your existing users API
  const fetchRegistrationCount = async () => {
    const response = await fetch('https://swember.in/get_users.php'); // Your existing endpoint for users
    const data = await response.json();
    if (data.status === 'success') {
      setRegistrationCount(data.data.length); // Assuming data contains an array of users
    } else {
      console.error('Error fetching registration count:', data.message);
    }
  };

  useEffect(() => {
    fetchVisitorCount();
    fetchRegistrationCount();
    // Optionally, set an interval to refresh the counts every minute
    const interval = setInterval(() => {
      fetchVisitorCount();
      fetchRegistrationCount();
    }, 100); // 
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Countdown animation variant
  const countAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 300 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-gray-800"
      >
        Welcome to Swember: Dating App!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="mt-4 text-xl text-gray-600"
      >
        We are coming soon in 2025. Join us by pre-registering now!
      </motion.p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg"
        onClick={() => navigate('/pre-register')}
      >
        Pre-Register
      </motion.button>

      <div className="mt-12 flex space-x-8">
        <motion.div
          initial="initial"
          animate="animate"
          variants={countAnimation}
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-32"
        >
          <p className="text-sm font-bold text-gray-700">Visitors</p>
          <p className="text-3xl font-bold text-blue-600">{visitorCount}</p>
        </motion.div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={countAnimation}
          className="flex flex-col items-center bg-white shadow-lg rounded-lg p-4 w-32"
        >
          <p className="text-sm font-bold text-gray-700">Registered Users</p>
          <p className="text-3xl font-bold text-blue-600">{registrationCount}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
