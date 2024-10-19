import { motion } from 'framer-motion';

const ThankYouPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center items-center bg-green-50"
    >
      <h1 className="text-4xl font-bold text-green-600">Thank You!</h1>
      <p className="mt-4 text-lg">You have successfully registered with us.</p>
    </motion.div>
  );
};

export default ThankYouPage;
