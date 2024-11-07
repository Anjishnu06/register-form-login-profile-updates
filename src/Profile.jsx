import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

export const Profile = () => {
  // Retrieve initial user data from localStorage
  const storedUserData = JSON.parse(sessionStorage.getItem("userDetails")) || {};
  const formUserData = JSON.parse(sessionStorage.getItem("formData")) || {};
  const [userData, setUserData] = useState(storedUserData);
  const [formData, setFormData] = useState(formUserData);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sessionID = sessionStorage.getItem("sessionID");
  const navigate = useNavigate();

  useEffect(() => {
    if(!sessionID){
      navigate('/login');
    }
  })

  const handleLogout = ()=>{
     // Clear session data
    sessionStorage.removeItem("sessionID");
    sessionStorage.removeItem("userDetails");

  // Redirect to login page
    navigate("/login");
  }
  // Handle changes in form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission for updating user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // Update user details with PATCH request
      const response = await axios.put(`https://demo-practice.onrender.com/edit/${formData.email}`, {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
      });

      if (response.status === 200) {
        // Update localStorage with the new user data
        sessionStorage.setItem('userDetails', JSON.stringify(response.data));

        // Set success message and update state
        setSuccessMessage('Profile updated successfully!');
        setUserData(response.data);
      }
    } catch (err) {
      setErrorMessage('An error occurred while updating the profile.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            readOnly
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password(Optional)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password || ''}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
        <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </form>
    </div>
  );
};
