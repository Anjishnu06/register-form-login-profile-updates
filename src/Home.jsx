import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <Link to="/" className="home-link">Home</Link>
        <Link to="/profile" className="profile-link">Profile</Link>
        <button className="logout-button-home" onClick={handleLogout}>Logout</button>
      </div>

      <div className="welcome-section">
        <h1 className="welcome-title">Welcome to Our IT Solutions Company</h1>
        <p className="welcome-description">
          Providing innovative solutions to help your business grow in the digital age. Our expertise in software development, IT consulting, and cloud services ensures that you are always a step ahead.
        </p>
        <Link to="/profile" className="update-link">Update Details</Link>
      </div>

      <div className="services-section">
        <h2 className="services-title">Our Services</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Software Development</h3>
            <p>Customized software solutions tailored to your business needs.</p>
          </div>
          <div className="service-card">
            <h3>IT Consulting</h3>
            <p>Expert advice to streamline your IT operations and drive growth.</p>
          </div>
          <div className="service-card">
            <h3>Cloud Services</h3>
            <p>Scalable cloud solutions to improve flexibility and reduce costs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
