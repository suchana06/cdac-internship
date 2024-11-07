import React, { useState } from "react";
import {
  RiUserFill,
  RiMailFill,
  RiLockPasswordFill,
  RiPhoneFill,
  RiEyeFill,
  RiEyeCloseFill,
} from "react-icons/ri";
import * as Yup from "yup";
import axios from 'axios';
import image from "../Assets/login.png";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  phoneno: Yup.string().required("Phone Number is required"),
  user: Yup.string().required("User role is required"),
});

function InputGroup({
  icon,
  field,
  placeholder,
  type,
  onChange,
  value,
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="input-group">
      {icon}
      <input
        type={showPassword ? "text" : type}
        name={field.name}
        placeholder={placeholder}
        className="underlined-input"
        onChange={onChange}
        value={value}
      />
      {type === "password" && (
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
        </button>
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}

function CreateUserForSuper() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    user: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneno: "",
    user: "",
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
      .then(() => setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })))
      .catch((err) => setErrors((prevErrors) => ({ ...prevErrors, [name]: err.message })));
  };

  const handleSubmit = () => {
    validationSchema.validate(formData, { abortEarly: false })
      .then(() => {
        const token = localStorage.getItem("token");
        axios.post("http://localhost:5000/userRoutes/super_register", formData, {
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
            user: "",
          });
          setErrors({
            name: "",
            email: "",
            password: "",
            phoneno: "",
            user: "",
          });
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error registering user:", error.response.data);
            setErrors((prevErrors) => ({ ...prevErrors, email: error.response.data.error }));
            alert(`Error: ${error.response.data.error}`);
          } else if (error.request) {
            console.error("Error making the request:", error.request);
          } else {
            console.error("General error:", error.message);
          }
        });
      })
      .catch((err) => {
        const validationErrors = {};
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      });
  };

  return (
    <div className="main">
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
        <div className="input-group">
          <select
            name="user"
            className="underlined-input"
            onChange={handleChange}
            value={formData.user}
          >
            <option value="">Select User Role</option>
            <option value="datapreuser">Datapre User</option>
            <option value="traininguser">Training User</option>
            <option value="testinguser">Testing User</option>
            <option value="reportuser">Report User</option>
          </select>
          {errors.user && <div className="error">{errors.user}</div>}
        </div>
        <button
          type="button"
          className="submit-button"
          onClick={handleSubmit}
        >
          Create User
        </button>
      </div>
      <div className="img">
        <img src={image} alt="MyImage" />
      </div>
    </div>
  );
}

export default CreateUserForSuper;