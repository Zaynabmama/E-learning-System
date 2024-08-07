import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', credentials);
      console.log('Login successful:', response.data);
  
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
  
      if (role === 'admin') {
        navigate('/admin');
      } else {
        setError('You are not authorized to access the admin panel');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
      }
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      setError('Please check your username and password.');
    }
  };
  

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLoginSubmit} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
