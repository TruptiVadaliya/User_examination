import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h3>Welcome, {user?.firstName} {user?.lastName}</h3>
      <button className="btn btn-danger me-2 mt-3" onClick={logout}>Logout</button>
      <button className="btn btn-outline-secondary mt-3" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default HomePage;