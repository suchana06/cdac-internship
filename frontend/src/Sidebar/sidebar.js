// Sidebar.js
import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { FaUser, FaListAlt } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";
import Update_Super from "../Update/Update_super";
import { jwtDecode as jwt_decode } from "jwt-decode";


function Sidebar() {
  const [show, setShow] = useState(false);
  const [role, setRole] = useState("");




  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    const decodedToken = jwt_decode(token);
    const adminRole = decodedToken.role;
    setRole(adminRole);
    console.log("Role is ", adminRole);
  }, []);

  const hitme = () => {
    setShow(!show);
  };

  return (
    <div className="Sidebar">
      <div className="menu">
        <div className="menuItem">
          <BiSolidDashboard className="icon" />
          <Link to="/dashboard" className="link">
            <span className="dashboard">𝐃𝐚𝐬𝐡𝐛𝐨𝐚𝐫𝐝</span>
          </Link>
        </div>
        <div className="menuItem">
          <FaUser className="icon" />
          <Link to={role === "super" ? "/createusersuper" : "/createuser"} className="link">
            <span>𝐀𝐝𝐝-𝐮𝐬𝐞𝐫</span>
          </Link>
        </div>
        {role === "super" && (
          <div className="menuItem">
            <FaListAlt className="icon" />
            <button className="MP link" onClick={hitme}>
              <span>𝗠𝗮𝗻𝗮𝗴𝗲 𝗣𝗿𝗼𝗳𝗶𝗹𝗲</span>
            </button>
            {show && <Update_Super />}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
