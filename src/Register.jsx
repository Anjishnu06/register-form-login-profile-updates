import React, { useState } from "react";
import "./Register.css"; // Import the CSS file
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError,setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [passwordMatches, setPasswordMatches] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    // Check if passwords match
    if (formData.password !== confirmPassword) {
      setIsLoading(false);
      // setPasswordMatches(false);
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        "https://demo-practice.onrender.com/register",
        formData
      );
      if (response.status === 200) {
        setSuccessMessage("User registered successfully!");
        console.log("User registered:", response.data);
        // setIsLoading(false);
        // sessionStorage.setItem("sessionID", true);
        // console.log(sessionStorage.getItem("sessionID"));
        // sessionStorage.setItem("userDetails", JSON.stringify(response.data));
        // sessionStorage.setItem("formData", JSON.stringify(formData));
        // console.log(JSON.parse(sessionStorage.getItem("formData")));
        setSuccessMessage("User registered successfully!");
        navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);

      if (err.response) {
        console.log("Server error:", err.response.data.detail[0].msg);
        setError(err.response.data.detail[0].msg);
      } else {  
        console.log("Network error:", err.message);
        setError("Network error. Please try again.");
      }
    }
  };

  const handleEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData({ ...formData, email: e.target.value });
    if (emailRegex.test(e.target.value)) {
      setEmailError("");
    } else {
      setEmailError("Invalid email format. Please enter a valid email address.");
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
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
          <div className="input-group password-input">
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
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
          </div>
          <div className="input-group password-input">
            <label htmlFor="password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
            <span
              className="toggle-password-button"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </span>
          </div>
          <div className="input-group password-input">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={isConfirmPasswordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
            <span
              className="toggle-password-button"
              onClick={toggleConfirmPasswordVisibility}
            >
              {isConfirmPasswordVisible ? "Hide" : "Show"}
            </span>
          </div>
          {/* Add show functionality to passwords field */}
          {/* {!passwordMatches && <p style={{ color: 'red' }}>Passwords do not match. Please try again.</p>} */}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </button>
          <div className="login-option">
            <p>Already Registered?<Link to="/login" className="login-link">Login</Link></p>
          </div>
          {successMessage && <p style={{ color: "red" }}>{successMessage}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};
