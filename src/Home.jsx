import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  // const sessionID = sessionStorage.getItem("sessionID");
  const navigate = useNavigate();

  // useEffect(() => {
  //   if(!sessionID){
  //     navigate('/login');
  //   }
  // }, [])

  const handleLogout = ()=>{
    // Clear session data
  //  sessionStorage.removeItem("sessionID");
  //  sessionStorage.removeItem("userDetails");

 // Redirect to login page
   navigate("/login");
 }

  return (
    <div>
      Welcome to Home
      <Link to="/profile">Update Details</Link>
      <div className="logout-button">
          <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
