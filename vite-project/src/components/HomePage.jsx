import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Logout function: clears session and redirects to login
  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  // Toggle light/dark mode by toggling body class
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.body.className = newTheme ? 'dark-mode' : 'light-mode';
  };

  return (
    <div className={`container mt-5 ${isDarkMode ? 'text-light bg-dark' : 'text-dark bg-light'}`}>
      <h3>Welcome, {user?.firstName} {user?.lastName}</h3>

      {/* Dashboard Statistics */}
      <div className="mt-4">
        <h5>Dashboard Statistics</h5>
        <p>Total Users: 100</p>
        <p>Active Sessions: 25</p>
      </div>

      {/* Notifications */}
      <div className="mt-4">
        <h5>Notifications</h5>
        <ul>
          <li>You have 3 new messages.</li>
          <li>Your profile was viewed 5 times today.</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => navigate('/profile')}>
          Update Profile
        </button>
        <button className="btn btn-danger me-2" onClick={logout}>
          Logout
        </button>
        <button className="btn btn-secondary" onClick={toggleTheme}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default HomePage;
