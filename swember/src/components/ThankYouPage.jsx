import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ThankYouPage = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col justify-center items-center bg-green-50 p-6"
    >
      <motion.h1
        className="text-4xl font-bold text-green-600"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        Thank You!
      </motion.h1>
      <motion.p
        className="mt-4 text-lg text-center text-green-600 font-bold bg-green-100 rounded-lg p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        You have successfully registered with us.
      </motion.p>

      <motion.div
        className="mt-6 max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p className="text-gray-600 mb-4">
        Welcome to Swember, the ultimate dating app designed exclusively for college students! We are thrilled to have you join our vibrant community where connections are just a swipe away. Whether you are looking for friendship, romance, or just someone to share your college adventures with, Swember is here to help you find your perfect match right on campus.
        </p>
        <p className="text-gray-600 mb-4">
          Don’t forget to explore all our features. From personalized matchmaking to engaging events, we have everything you need to make the most out of your experience.
        </p>
        <p className="text-gray-600 mb-4">
          If you have any questions, feel free to reach out to our support team. We’re here to help you every step of the way!
        </p>
      </motion.div>

      <motion.button
        className="mt-8 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
        initial={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
      >
        Go to Home
      </motion.button>
    </motion.div>
  );
};

export default ThankYouPage;
