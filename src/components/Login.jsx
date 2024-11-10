import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://demo-practice.onrender.com/login",
        formData
      );

      sessionStorage.setItem("email", formData.email);
      
      if (response.status === 200) {
        console.log("User logged in:", response.data);
        setIsLoading(false);
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); 
  };

  return (
    <div className="login-box">
      <div className="logo">
        <img
          src="https://www.msg-global.com/images/logo_msg_global_RGB.svg"
          alt="MSG Logo"
        />
      </div>
      <h1>Login to MSG Account</h1>
      <p>Enter your credentials to access your account</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              type="button"
              onClick={togglePasswordVisibility}
              className="toggle-password-login-button"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </span>
          </div>
        </div>
        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="register-option">
          <p>Don't have an account? <Link className="register-link" to="/">Register</Link></p>
        </div>
        {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      </form>
    </div>
  );
};
