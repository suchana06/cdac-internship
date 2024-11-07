// Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/sidebar";
import UserInformation from "../Components/UserInformation";
import { useNavigate } from "react-router-dom";
import { jwtDecode as jwt_decode } from "jwt-decode";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();


  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const adminRole = decodedToken.role;

      if (adminRole === "super") {
        navigate("/superadmin");
        return; 
      }
      
      const response = await axios.get("http://localhost:5000/userRoutes/userDetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const matchingUsers = response.data.filter(user => user.role === `${adminRole}user`);
      setUserData(matchingUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    // Fetch user data initially
    fetchUserData();
  }, []);

  return (
    <div className="mainapp">
      <div className="AppGlass">
        <div>
          <Sidebar />
        </div>
        <div>
          {userData ? (
            <UserInformation users={userData} fetchData={fetchUserData} />
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
