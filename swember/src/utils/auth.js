// utils/auth.js

export const login = () => {
    sessionStorage.setItem('authToken', 'your-token'); // Store the session temporarily
  };
  
  export const logout = () => {
    sessionStorage.removeItem('authToken'); // Clear session on logout
  };
  
  export const isAuthenticated = () => {
    return sessionStorage.getItem('authToken') !== null; // Check if session exists
  };
  