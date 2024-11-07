import { useNavigate } from "react-router-dom";
import React, { useState,useEffect } from "react";
import {
  RiUserFill,
  RiMailFill,
  RiLockPasswordFill,
  RiPhoneFill,
} from "react-icons/ri";
import "../Css/CreateUser.css";
import image from "../Assets/login.png";
import axios from "axios";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneno: Yup.string().required("Phone Number is required"),
});

function InputGroup({ icon, field, placeholder, type, onChange, value, error }) {
  return (
    <div className="input-group">
      {icon}
      <input
        type={type}
        name={field.name}
        placeholder={placeholder}
        className="underlined-input"
        onChange={onChange}
        value={value}
      />
      {error && <div className="error" style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

function CreateUser() {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      // Check if a token is present in local storage
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        // Redirect to the login page if no token is found
        navigate("/login");
      }
    };
    // Run the check on each render
    checkToken();
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field using Yup schema
    validationSchema
      .validateAt(name, { [name]: value })
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.message }));
  };

  const handleSubmit = () => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/userRoutes/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("User registered:", response.data);
        alert("User created successfully");
        setFormData({
          name: "",
          email: "",
          password: "",
          phoneno: "",
        });
        setErrors({
          name: "",
          email: "",
          password: "",
          phoneno: "",
        });
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error registering user:", error.response.data);
          setErrors({ ...errors, email: error.response.data.error });
          alert(`Error: ${error.response.data.error}`);
        } else if (error.request) {
          console.error("Error making the request:", error.request);
        } else {
          console.error("General error:", error.message);
        }
      });
  };

  return (
    <div className="main">
      <div>
        <div className="registration-form-container">
          <InputGroup
            icon={<RiUserFill className="input-icon" />}
            field={{ name: "name" }}
            placeholder="Name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            error={errors.name}
          />
          <InputGroup
            icon={<RiMailFill className="input-icon" />}
            field={{ name: "email" }}
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            error={errors.email}
          />
          <InputGroup
            icon={<RiLockPasswordFill className="input-icon" />}
            field={{ name: "password" }}
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            error={errors.password}
          />
          <InputGroup
            icon={<RiPhoneFill className="input-icon" />}
            field={{ name: "phoneno" }}
            placeholder="Phone Number"
            type="tel"
            onChange={handleChange}
            value={formData.phoneno}
            error={errors.phoneno}
          />

          <button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
          >
            Create User
          </button>
        </div>
      </div>
      <div className="img">
        <img src={image} alt="MyImage" />
      </div>
    </div>
  );
}

export default CreateUser;
