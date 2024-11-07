import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RiMailFill, RiLockPasswordFill } from "react-icons/ri";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import "../Css/Update.css";

const validationSchema = Yup.object().shape({
  newMail: Yup.string()
    .email("Invalid email")
    .required("New Email is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function InputGroup({ icon, field, placeholder, type }) {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="input-group">
      {icon}
      <Field
        type={
          type === "password" ? (showPassword ? "text" : "password") : "text"
        }
        name={field.name}
        placeholder={placeholder}
        className="underlined-input"
      />
      {type === "password" && (
        <button
          type="button"
          className="eye-button"
          onClick={PasswordVisibility}
        >
          {showPassword ? "👁️" : "👁️‍🗨️"}
        </button>
      )}
      <ErrorMessage
        name={field.name}
        component="div"
        className="error"
        style={{ color: "red" }}
      />
    </div>
  );
}

const UpdateSuper = () => {
  const navigate = useNavigate();
  const initialValues = {
    newMail: "",
    newPassword: "",
  };

  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef();

  const handleManageProfile = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    } else {
      setModalOpen(true);
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalOpen]);

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const { newMail, newPassword } = values;

      if (!newPassword) {
        alert("Password is required");
        return;
      }

      setSubmitting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No token found. Please log in.");
        navigate("/login");
        return;
      }
      console.log("Token:", token);

      const response = await axios.put(
        "http://localhost:5000/adminroute/updateSuper",
        { newMail, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Super Admin updated:", response.data);
      alert("Super Admin updated successfully");

      resetForm();
      setModalOpen(false);
      // Remove token from local storage
      localStorage.removeItem("token");
      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Error updating super admin:", error);
      alert("Error updating super admin. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button className="manage-profile-button" onClick={handleManageProfile}>
        Update Super
      </button>

      {modalOpen &&
        ReactDOM.createPortal(
          <div className="update-super-container open">
            <div className="main" ref={modalRef}>
              <div className="registration-form-container">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {() => (
                    <Form className="registration-form">
                      <InputGroup
                        icon={<RiMailFill className="input-icon" />}
                        field={{ name: "newMail" }}
                        placeholder="New Email"
                        type="email"
                      />
                      <InputGroup
                        icon={<RiLockPasswordFill className="input-icon" />}
                        field={{ name: "newPassword" }}
                        placeholder="New Password"
                        type="password"
                      />
                      <button type="submit" className="submit-button">
                        Update Super Admin
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>,
          document.getElementById("portal")
        )}
    </div>
  );
};

export default UpdateSuper;