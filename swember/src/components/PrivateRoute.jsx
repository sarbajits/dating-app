import PropTypes from 'prop-types'; // Import PropTypes
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Import the session check

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Adding PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes for children
};

export default PrivateRoute;
