import React, { useState } from 'react';
import './Register.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate an API call with 20s delay
    console.log(formData);
    const response = await axios.post('https://demo-practice.onrender.com/register', formData);
    if (response.status === 200) {
      console.log('User registered:', response.data);
      setIsLoading(false);
      navigate('/login');
    }
    else {
      setIsLoading(false);
      setSuccessMessage('An error occurred. Please try again.');
    };
  };

  const handleEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData({ ...formData, email: e.target.value });
    if (emailRegex.test(e.target.value)) {
      setError('');
    } else {
      setError('Invalid email format. Please enter a valid email address.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <div className="logo">
          <img
            src="https://www.msg-global.com/images/logo_msg_global_RGB.svg"
            alt="MSG Logo"
          />
        </div>
        <h1>Create a MSG Account</h1>
        <p>Enter your Credentials</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              id="name"
              name="firstName"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              id="name"
              name="lastName"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleEmail}
              required
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
        {successMessage && <p style={{ color: 'red' }}>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

