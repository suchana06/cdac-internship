import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar/sidebar";
import datapre from "../Assets/datapre.png";
import training from "../Assets/training.png";
import testing from "../Assets/testing.png";
import report from "../Assets/report.png";
import "../Css/SuperAdmin.css";
import { useNavigate } from "react-router-dom";
function SuperAdmin() {
  const navigate = useNavigate();
  // Check if token is present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If token is not present, navigate to login
      navigate("/login");
    }
  }, [navigate]);
  const [dataPreUserCount, setDataPreUserCount] = useState(null);
  const [ReportUserCount, setReportUserCount] = useState(null);
  const [TrainingUserCount, setTrainingUserCount] = useState(null);
  const [TestingUserCount, setTestingUserCount] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a 4-second delay before fetching data
        setTimeout(async () => {
          const userResponse = await axios.get(
            "http://localhost:5000/userRoutes/userDetails"
          );
          const filteredData1 = userResponse.data.filter(
            (user) => user.role === "datapreuser"
          );
          const filteredData2 = userResponse.data.filter(
            (user) => user.role === "reportuser"
          );
          const filteredData3 = userResponse.data.filter(
            (user) => user.role === "traininguser"
          );
          const filteredData4 = userResponse.data.filter(
            (user) => user.role === "testinguser"
          );
          setDataPreUserCount(filteredData1.length);
          setReportUserCount(filteredData2.length);
          setTrainingUserCount(filteredData3.length);
          setTestingUserCount(filteredData4.length);

          setLoading(false);
        }, 4000); // Delay of 4 seconds
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mainapp">
      <div className="AppGlass">
        <Sidebar />
        <div>
          <h2 className="heading"> ◤✧ 𝐒𝐮𝐩𝐞𝐫 𝐀𝐝𝐦𝐢𝐧 ✧◥</h2>
          <div className="MainCards">
            <div className="card">
              <img id="datapre" src={datapre} alt="" />
              <h2>𝕯𝖆𝖙𝖆 𝖕𝖗𝖊𝖕𝖆𝖗𝖆𝖙𝖎𝖔𝖓 𝖆𝖉𝖒𝖎𝖓</h2>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <p>{dataPreUserCount}</p>
              )}
              <h6>
                <b>Data Preperation User</b>
              </h6>
            </div>

            <div className="card">
              <img id="report" className="admin_img" src={report} alt="" />
              <h2>𝕽𝖊𝖕𝖔𝖗𝖙 𝖆𝖉𝖒𝖎𝖓</h2>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <p>{ReportUserCount}</p>
              )}
              <h6>
                <b>Report User</b>
              </h6>
            </div>

            <div className="card">
              <img id="training" src={training} alt="" />
              <h2>𝕿𝖗𝖆𝖎𝖓𝖎𝖓𝖌 𝖆𝖉𝖒𝖎𝖓</h2>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <p>{TrainingUserCount}</p>
              )}
              <h6>
                <b>Training User</b>
              </h6>
            </div>

            <div className="card">
              <img id="testing" src={testing} alt="" />
              <h2>𝕿𝖊𝖘𝖙𝖎𝖓𝖌 𝕬𝖉𝖒𝖎𝖓</h2>
              {loading ? (
                <div className="loading-spinner"></div>
              ) : (
                <p>{TestingUserCount}</p>
              )}
              <h6>
                <b>Testing User</b>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdmin;
