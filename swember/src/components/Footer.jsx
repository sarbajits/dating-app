import { FaFacebook, FaLinkedin, FaInstagram, FaXTwitter,FaRegEnvelope} from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-gray-100 p-6 text-center text-gray-600">
      {/* Links Section */}
      <div className="flex flex-wrap justify-center space-x-4 mb-6 text-sm">
        <a href="/contact" className="hover:underline">Contact Us</a>
        <a href="#" className="hover:underline">Terms and Conditions</a>
        <a href="#" className="hover:underline">Privacy Policy</a>
      </div>

      {/* Social Icons Section */}
      <div className="flex justify-center space-x-6 mb-6">
        <a href="https://www.facebook.com/people/Swember/61567892744685/" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-gray-600 hover:text-blue-600" size={24} />
        </a>
        <a href="https://www.linkedin.com/in/swemberindia/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-gray-600 hover:text-blue-800" size={24} />
        </a>
        <a href="https://www.instagram.com/swemberindia/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-gray-600 hover:text-pink-500" size={24} />
        </a>
        <a href="https://x.com/swemberindia" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className="text-gray-600 hover:text-black" size={24} />
        </a>
        <a href="mailto:contact@swember.in" target="_blank" rel="noopener noreferrer">
          <FaRegEnvelope className="text-gray-600 hover:text-black" size={24} />
        </a>
      </div>

      {/* Copyright Section */}
      <div className="text-sm text-gray-500">
        <p>&copy; 2024 Swember.in, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
