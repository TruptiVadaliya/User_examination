import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={
          isLoggedIn ? <Navigate to="/home" /> : <LoginPage />
        } />
        <Route path="/home" element={
          isLoggedIn ? <HomePage /> : <Navigate to="/login" />
        } />
      </Routes>
    </Router>
  );
}

export default App;