import React, { useEffect, useState } from "react";
import { RiMailFill, RiLockPasswordFill } from "react-icons/ri";
import "../Css/login.css";
import img from "../Assets/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { jwtDecode as jwt_decode } from "jwt-decode";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide both email and password.");
      return;
    }
    const data = { email, password };
    try {
      const response = await axios.post(
        "http://localhost:5000/temp_route/login",
        data
      );
      const token = response.data.token;
      // Save the token to local storage
      localStorage.setItem("token", token);
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role;
      const userid = decodedToken.id;
      console.log(userid);
      if (userRole === "datapreuser") {
        navigate("/datapre-user");
      }else if(userRole === "traininguser"){
        navigate("/traininguser")
      }else if(userRole === "testinguser"){
        navigate("/testinguser")
      }else if(userRole === "reportuser"){
        navigate("/reportuser")
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.response &&
        error.response.data.error === "Super Admin is not active"
      ) {
        alert("Super Admin is not active. Please contact support.");
      } else {
        alert("An error occurred while logging in: " + error.message);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="main">
      <div className="img">
        <img src={img} alt="Signup" />
      </div>
      <div className="registration-form-container">
        <form className="registration-form">
          <div className="input-group">
            <RiMailFill className="input-icon" />
            <input
              type="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              placeholder="Email"
              className="underlined-input"
            />
          </div>
          <div className="input-group">
            <RiLockPasswordFill className="input-icon" />
            <input
              type={passwordVisible ? "text" : "password"}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              placeholder="Password"
              className="underlined-input"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </span>
          </div>
          <div
            className="button-group"
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={handleLogin}
              className="admin-button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
