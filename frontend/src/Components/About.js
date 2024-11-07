import React from 'react';
// import './Home.css';
const About = () => {
  return (
    <div className="about-us">
      <h1 className='mainabout'>About Us</h1>
      <hr/>
      <p>
        Welcome to SONIC, a platform dedicated to the exploration and contribution of audio transcriptions. Whether you are here to contribute or discover, our platform strives to make the process seamless and rewarding.
      </p>

      <h2 className='mainabout'>For Contributors</h2>
      <hr/>
      <p>
        Are you passionate about making audio content accessible? We invite you to contribute to our growing repository. As a contributor, you have two convenient options:
      </p>
      <ol>
        <li>
          <strong>Upload a Single Audio File and Transcription:</strong>
          <ul>
            <li>Submit a single WAV file along with its corresponding transcription file (.txt).</li>
            <li>Provide additional details such as gender and age group through a simple form.</li>
          </ul>
        </li>
        <li>
          <strong>Upload a Zip File:</strong>
          <ul>
            <li>Package multiple WAV files with their respective transcription files (.txt).</li>
            <li>Include a CSV file containing details like file name, filepath, gender, age group, and transcription file name for each audio.</li>
          </ul>
        </li>
      </ol>
      
      <h2 className='mainabout'>For Users</h2>
      <hr/>
      <p>
        Are you searching for specific audio content? Our platform offers a user-friendly search feature to help you find what you need. Here's what you can do:
      </p>
      <ol>
        <li>
         <strong> Enter Search Criteria:</strong>
          <ul>
            <li>Specify the gender you are interested in.</li>
          </ul>
        </li>
        <li>
          <strong>Explore Search Results:</strong>
          <ul>
            <li>Access relevant audio files based on your search criteria.</li>
          </ul>
        </li>
        <li>
          <strong>Enjoy Additional Functionalities:</strong>
          <ul>
            <li>Download audio files for offline use.</li>
            <li>Visualize audio waveforms along with transcriptions.</li>
            <li>Utilize functionalities like zoom in/out, play/pause, and restart for an enhanced experience.</li>
          </ul>
        </li>
      </ol>

      <p>
        Thank you for being part of our community. Together, we can make audio content more accessible and inclusive. If you have any questions or suggestions, feel free to reach out to us. Happy exploring!
      </p>
    </div>
  );
};

export default About;
