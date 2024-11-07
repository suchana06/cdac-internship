import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  RiUserFill,
  RiMailFill,
  RiLockPasswordFill,
  RiPhoneFill,
} from "react-icons/ri";
import "../Css/Update.css";
import image from "../Assets/login.png";

function InputGroup({ icon, name, placeholder, type, value, handleChange }) {
  return (
    <div className="input-group">
      {icon}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="underlined-input"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}

function UpdateDataPreUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "", // Updated to match backend property name
  });

  useEffect(() => {
    // Fetch user data based on ID when the component mounts
    axios
      .get(`http://localhost:5000/userRoutes/update/${id}`)
      .then((response) => {
        const user = response.data;
        setUserData({
          name: user.name,
          email: user.email,
          password: user.password,
          phoneNumber: user.phoneno, // Updated to match backend property name
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new user object with updated data
    const updatedUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phoneno: userData.phoneNumber, // Updated to match backend property name
    };

    // Send a PUT request to update the user data
    axios
      .put(`http://localhost:5000/userRoutes/update/${id}`, updatedUser)
      .then((response) => {
        console.log("User updated:", response.data);
        alert("User updated successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div className="main">
      <div>
        <div className="registration-form-container">
          <form className="registration-form" onSubmit={handleSubmit}>
            <InputGroup
              icon={<RiUserFill className="input-icon" />}
              name="name"
              placeholder="Name"
              type="text"
              value={userData.name}
              handleChange={handleChange}
            />
            <InputGroup
              icon={<RiMailFill className="input-icon" />}
              name="email"
              placeholder="Email"
              type="email"
              value={userData.email}
              handleChange={handleChange}
            />
            <InputGroup
              icon={<RiLockPasswordFill className="input-icon" />}
              name="password"
              placeholder="Password"
              type="password"
              value={userData.password}
              handleChange={handleChange}
            />
            <InputGroup
              icon={<RiPhoneFill className="input-icon" />}
              name="phoneNumber"
              placeholder="Phone Number"
              type="tel"
              value={userData.phoneNumber}
              handleChange={handleChange}
            />
            <button type="submit" className="submit-button">
              Update User
            </button>
          </form>
        </div>
      </div>
      <div className="img">
        <img src={image} alt="login" />
      </div>
    </div>
  );
}

export default UpdateDataPreUser;
