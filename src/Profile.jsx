import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

export const Profile = () => {
  const email = sessionStorage.getItem("email");
  const [userData,setUserData] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://demo-practice.onrender.com/userdata/${email}`);
        setUserData(response.data);
        sessionStorage.setItem('userDetails', JSON.stringify(response.data));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  },[])

  useEffect(() => {
    if(!email){
      navigate('/login');
    }
  })

  const handleLogout = ()=>{
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("userDetails");
    navigate("/login");
  }
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.put(`https://demo-practice.onrender.com/edit/${userData.email}`, {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password
      });

      if (response.status === 200) {
        console.log('Profile updated:', response.data);
        setSuccessMessage('Profile updated successfully!');
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
            value={userData.first_name || ''}
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
            value={userData.last_name || ''}
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
            value={userData.email || ''}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password(Optional)</label>
          <input
            type="password"
            id="password"
            name="password"
            value={userData.password || ''}
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};
