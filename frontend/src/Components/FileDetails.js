import React, { useState } from 'react';
import '../Css/FileDetails.css';
import './Visual.js';
import Visual from './Visual';
const FileDetails = ({ data }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { filename, filepath, gender, agegroup, tags } = data;
  const handleDownload = () => {
    // Create an anchor element
    const anchor = document.createElement('a');
    anchor.href = filepath;
    anchor.download = filename;
    anchor.click();
  };
  const visualize=()=>{
  setShowSearch(true);
  }
  return (
    <>
    <div className="file-details">
      <h3><strong>Filename:</strong> {filename}</h3>
      <h3><strong>Gender:</strong> {gender}</h3>
      <h3><strong>Agegroup:</strong> {agegroup}</h3>
      <h3><strong>Tagname:</strong> {tags}</h3>
     <div className="buts">
     <button className='but1' onClick={handleDownload}>Download the File</button>
      <button className='but1' onClick={visualize}>Listen and visualize the audio</button>
     </div>
    </div>
    {showSearch ? (
        <Visual audioUrl={`http://localhost:80/uploads/${filename}`} initialZoom={1}/>
      ) : null}
    </>
  );
};

export default FileDetails;
