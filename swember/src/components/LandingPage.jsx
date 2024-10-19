import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-50">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-gray-800"
      >
        Welcome to Swember : Dating App!
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
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-12"
      >
        <p>Countdown: 1000+ users registered</p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
