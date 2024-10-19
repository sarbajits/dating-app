import { useState } from 'react';
import { motion } from 'framer-motion';

const PreRegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    age: '',
    city: '',
  });

  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    try {
      const response = await fetch('https://swember.in/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString(),
      });

      const text = await response.text();

      // Check if response is valid JSON before parsing
      try {
        const data = JSON.parse(text);

        if (data.status === 'success') {
          setShowFeedback(true);
        } else {
          setErrorMessage(data.message || 'Registration failed. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Invalid server response. Please contact support.',error);
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      setErrorMessage('Please provide feedback before submitting.');
      return;
    }

    try {
      const response = await fetch('https://swember.in/feedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ feedback, mobile: formData.mobile }).toString(),
      });

      const text = await response.text();

      // Check if response is valid JSON before parsing
      try {
        const data = JSON.parse(text);

        if (data.status === 'success') {
          window.location.href = '/thank-you'; // Redirect to thank you page
        } else {
          setErrorMessage('Feedback submission failed. Please try again.');
        }
      } catch (error) {
        setErrorMessage('Invalid server response. Please contact support.',error);
      }
    } catch (error) {
      setErrorMessage('An error occurred: ' + error.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50"
    >
      <form className="bg-white p-8 rounded shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6">Pre-Register</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="mb-4 p-2 w-full border rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          className="mb-4 p-2 w-full border rounded"
          value={formData.mobile}
          onChange={handleChange}
        />
        <select
          name="gender"
          className="mb-4 p-2 w-full border rounded"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          name="age"
          placeholder="Age"
          className="mb-4 p-2 w-full border rounded"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          className="mb-4 p-2 w-full border rounded"
          value={formData.city}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded shadow-lg"
        >
          Submit
        </button>
      </form>

      {showFeedback && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-2xl font-bold mb-4">We would love your feedback!</h3>
            <textarea
              className="p-2 border rounded w-full"
              placeholder="Your feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-400 text-white rounded"
                onClick={() => window.location.href = '/thank-you'}
              >
                Skip
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded shadow-lg"
                onClick={handleFeedbackSubmit}
              >
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PreRegistrationPage;
