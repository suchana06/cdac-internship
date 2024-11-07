import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Datapre from "./User/Datapre";
import Login from "./Components/Login";
import About from "./Components/About";
import Contributer from "./Components/Contributer";
import User from "./Components/User";
import DashBoard from "./Dashboard/Dashboard";
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
import SuperAdmin from "./Components/SupderAdmin";
import UpdateSuper from "./Update/Update_super";
import ForgotPasswordForm from "./Components/ForgotPasswordForm";
import TestingUser from "./Components/TestingUser";
import TrainingUser from "./Components/TrainingUser";
import ReportUser from "./Components/ReportUser";
import CreateUserForSuper from "./Components/CreateUserForSuper";

const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkToken = () => {
      const storedToken = localStorage.getItem("token");

      // Check if the token is not stored and the current location is not "/login", "/home", or "/about"
      if (!storedToken && !["/login", "/", "/about"].includes(window.location.pathname)) {
        navigate("/login");
      }
      if (storedToken && window.location.pathname === "/login") {
        navigate("/");
      }

    };
    checkToken();
  }, [navigate]);
  

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/datapre-user" element={<Datapre />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/user" element={<User />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contributer" element={<Contributer />} />
        <Route path="/updateuser/:id" element={<UpdateUser />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/updateSuper" element={<UpdateSuper />} />
        <Route path="/forgetpassword" element={<ForgotPasswordForm />} />
        <Route path="/testinguser" element={<TestingUser />} />
        <Route path="/traininguser" element={<TrainingUser />} />
        <Route path="/reportuser" element={<ReportUser />} />
        <Route path="/createusersuper" element={<CreateUserForSuper />} />
        <Route path='/error' element={<h1 style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> SORRY!!! no relevant data found.<button className='goback' onClick={()=>{navigate('/User')}}>Go back</button></h1>}> </Route>
      </Routes>
    </>
  );
};

export default App;
