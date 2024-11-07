import React from "react";
import img from "../Assets/home.png";
import img1 from '../Assets/sonic.png'
import "../Css/Home.css";
function Home() {
  return (
    <>
      <div className="mCon">
        <div className="div1">
          <div>
            <img src={img1} alt="poster" id="img1" />
            <h3>
              SONIC helps you to find your desired audio. Explore numerous audio
              data from all over the world. You can even contribute by your own.
              Choose your role and start exploring.
            </h3>
          </div>
        </div>

        <div className="h-image">
          <img src={img} alt="home_image" />
        </div>
      </div>
    </>
  );
}

export default Home;
