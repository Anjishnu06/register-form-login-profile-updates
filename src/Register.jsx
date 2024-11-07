import React, { useState } from 'react';
import './Register.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  // const [passwordMatches, setPasswordMatches] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(''); // Clear any existing error message
    setSuccessMessage(''); // Clear any existing success message
  
    // Check if passwords match
    if (formData.password !== confirmPassword) {
      setIsLoading(false);
      // setPasswordMatches(false);
      setError('Passwords do not match. Please try again.');
      return;
    }
  
    try {
      // Make API request
      const response = await axios.post('https://demo-practice.onrender.com/register', formData);
      
      // Handle successful response
      if (response.status === 200) {
        console.log('User registered:', response.data);
        setIsLoading(false);
        // Store the session ID in sessionStorage (or cookies)
        sessionStorage.setItem("sessionID", true);
        console.log(sessionStorage.getItem("sessionID"))
        // Optionally store user info if needed
        sessionStorage.setItem(
          "userDetails",
          JSON.stringify(response.data)
        );
        //store form Data in session
        sessionStorage.setItem("formData", JSON.stringify(formData));
        console.log(JSON.parse(sessionStorage.getItem("formData")));
        setSuccessMessage('User registered successfully!');
        navigate('/login');
      }
    } catch (err) {
      setIsLoading(false);
      
      if (err.response) {
        console.log('Server error:', err.response.data);
        
        if (err.response.status === 409) {
          setError('User already exists. Please try logging in.');
        } else {
          setError('An error occured. Please try again.');
        }
        
      } else if (err.request) {
        console.log('No response from server:', err.request);
        setError('Network error. Please check your internet connection and try again.');
        
      } else {
        console.log('Error:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    }
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              // id="name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="name">Last Name</label>
            <input
              type="text"
              // id="name"
              name="last_name"
              value={formData.last_name}
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
              disabled={isLoading}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          {/* {!passwordMatches && <p style={{ color: 'red' }}>Passwords do not match. Please try again.</p>} */}
          <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Register'}
        </button>
        {successMessage && <p style={{ color: 'red' }}>{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};


