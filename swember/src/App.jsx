import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import PreRegistrationPage from './components/PreRegistrationPage';
import ThankYouPage from './components/ThankYouPage';
import Footer from './components/Footer';
import AdminPage from './components/AdminPage'; // Import AdminPage
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import LoginPage from './components/LoginPage';

const App = () => {
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pre-register" element={<PreRegistrationPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } 
        /> {/* Protect the AdminPage route */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
