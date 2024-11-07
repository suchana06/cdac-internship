
import img3 from "../Assets/contribute image.png";
import "../Css/Abc.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
export default function Datapre() {
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
  
  const user = () => {
    window.location.href = "/user";
  };
  const contributer = () => {
    window.location.href = "/contributer";
  };
  return (
    <>
      <div className="div0">
        <div className="div2">
          <div>
            <h1 id="label1">
              {" "}
              Choose any role from below according to your purpose{" "}
            </h1>
            <p>
              [either you want to add files to our database or find something
              that you needed]
            </p>
            <button type="button" className="button" onClick={user}>
              I want to find something
            </button>
            <button type="button" className="button1" onClick={contributer}>
              I am here to contribute
            </button>
          </div>
        </div>
        <div className="div3">
          <img src={img3} alt="contributor_image"/>
        </div>
      </div>
    </>
  );
}
