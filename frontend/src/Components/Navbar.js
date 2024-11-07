import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import statement for jwt-decode

import "../Css/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [tokenValid, setTokenValid] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [logout, setLogout] = useState(false); // State to handle logout

  // Decode the token
  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;

  // Define allowedRoles within the component
  const allowedRoles = ["datapre", "training", "testing", "report", "super"];

  useEffect(() => {
    const checkTokenExpiration = async () => {
      if (!token || !decodedToken) {
        setTokenValid(false);
        return;
      }

      const expirationTime = new Date(decodedToken.exp * 1000).getTime();
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        try {
          await updateLogoutTime();
        } catch (error) {
          console.error("Failed to update logout time", error);
        }

        localStorage.removeItem("token");
        setTokenValid(false);
        setShowAlert(true);
        navigate("/login");
      } else {
        setTokenValid(true);
        setShowAlert(false);
      }
    };

    checkTokenExpiration();

    const tokenExpirationCheckInterval = setInterval(() => {
      checkTokenExpiration();
    }, 60000);

    return () => {
      clearInterval(tokenExpirationCheckInterval);
    };
  }, [token, decodedToken, navigate]);

  const updateLogoutTime = async () => {
    try {
      if (token && decodedToken) {
        await axios.post("http://localhost:5000/userRoutes/logouttime", null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Failed to update logout time", error);
    }
  };

  const handleLogout = async () => {
    try {
      await updateLogoutTime();
      localStorage.removeItem("token");
      setLogout(true); // Set logout state to true
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Your session has expired. Please log in again.
        </div>
      )}
      <nav className="navbar">
        <label id="label">SONIC</label>
        <ul className="nav-Links">
          <li className="navig">
            <a href="/">Home</a>
          </li>
          <li className="navig">
            <a href="/about">About us</a>
          </li>
          {decodedToken && allowedRoles.includes(decodedToken.role) && (
            <li className="navig">
              <a href="/dashboard">Dashboard</a>
            </li>
          )}
          {token && tokenValid ? (
            <li className="navig">
              <a href="/login" onClick={handleLogout}>
                <u id="logout">Logout</u>
              </a>
              {logout && <a href="/login"></a>}
            </li>
          ) : (
            <li className="navig">
              <a href="/login">Login</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;