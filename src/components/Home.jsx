import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

export const Home = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://demo-practice.onrender.com/userdata/${email}`);
        setUserData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <header className="navbar">
        <div className="navbar-brand">MSG Global Solutions</div>
        <nav className="navbar-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/profile" className="nav-link">Profile</Link>
          <span>Welcome {userData.first_name}</span>
          <span onClick={handleLogout} className="logout-button" style={{ marginTop: "0px"}}>Logout</span>
        </nav>
      </header>

      <div className="home-container">
        <section className="welcome-section">
          <h1 className="welcome-title">Welcome to Our IT Solutions Company</h1>
          <p className="welcome-description">
            Providing innovative solutions to help your business grow in the
            digital age. Our expertise in software development, IT consulting,
            and cloud services ensures that you are always a step ahead.
          </p>
          <Link to="/profile" className="update-link">Update Your Details</Link>
        </section>

        <section className="services-section">
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
        </section>
      </div>
    </div>
  );
};
