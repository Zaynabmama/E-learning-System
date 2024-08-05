import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const handleLoginSubmit = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/users/login', credentials);
      console.log('Login successful:', response.data);
    
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLoginSubmit} />
    </div>
  );
};

export default LoginPage;


