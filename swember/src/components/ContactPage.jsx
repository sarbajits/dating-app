import { FaFacebook, FaLinkedin, FaInstagram, FaXTwitter, FaRegEnvelope } from 'react-icons/fa6';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        We would love to hear from you! Connect with us on social media or reach out via email.
      </p>

      {/* Social Media Links */}
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://www.facebook.com/people/Swember/61567892744685/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-gray-600 hover:text-blue-600" size={32} />
        </a>
        <a href="https://www.linkedin.com/in/swemberindia/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-gray-600 hover:text-blue-800" size={32} />
        </a>
        <a href="https://www.instagram.com/swemberindia/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-gray-600 hover:text-pink-500" size={32} />
        </a>
        <a href="https://x.com/swemberindia" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-gray-600 hover:text-black" size={32} />
        </a>
        <a href="mailto:contact@swember.in" target="_blank" rel="noopener noreferrer">
          <FaRegEnvelope className="text-gray-600 hover:text-black" size={32} />
        </a>
      </div>

      {/* Contact Email */}
      <div className="text-center text-gray-600">
        <p>Have questions or feedback? Email us at:</p>
        <a href="mailto:contact@swember.in" className="text-blue-500 hover:underline">contact@swember.in</a>
      </div>
    </div>
  );
};

export default ContactPage;
