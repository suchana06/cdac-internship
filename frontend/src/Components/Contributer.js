import React, { useState } from "react";
import axios from "axios";
import "../Css/Contributer.css";

function Contributer() {
  const [selectedFileType, setSelectedFileType] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");
  const [customTag, setCustomTag] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [file, setFile] = useState(null);
  const [transcriptionFile, setTranscriptionFile] = useState(null);


  const handleTranscriptionFileChange = (event) => {
    const selectedTranscriptionFile = event.target.files[0];
    setTranscriptionFile(selectedTranscriptionFile);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    setCustomTag('');
  }; 

  const handleFileTypeChange = (event) => {
    const fileType = event.target.value;
    setSelectedFileType(fileType);
    setSelectedGender("");
    setSelectedAgeGroup("");
    setFile(null);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleAgeGroupChange = (event) => {
    setSelectedAgeGroup(event.target.value);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('transcriptionFile', transcriptionFile);
      formData.append('gender', selectedGender);
      formData.append('ageGroup', selectedAgeGroup);
      const tagsValue = selectedOption === 'Others' ? customTag : selectedOption;
      formData.append('tags', tagsValue);
      // console.log(formData);
      try {
        await axios.post('http://localhost:5000/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('File uploaded successfully. Thank you for your contribution');
      } catch (error) {
        alert('Error uploading file:', error);
      }
    }
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   if (selectedFileType === "zip" && file) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       const response = await axios.post(
  //         "http://localhost:5000/uploads",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       console.log("ZIP File uploaded successfully:", response.data);
  //       alert("Successful");
  //     } catch (error) {
  //       console.error("Error uploading ZIP file:", error);
  //     }
  //   } else if (
  //     selectedFileType === "wav" &&
  //     selectedGender &&
  //     selectedAgeGroup &&
  //     file
  //   ) {
  //     try {
  //       const formData = new FormData();
  //       formData.append("file", file);
  //       formData.append("gender", selectedGender);
  //       formData.append("agegroup", selectedAgeGroup);

  //       const response = await axios.post(
  //         "http://localhost:5000/uploads",
  //         formData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );

  //       console.log("WAV File uploaded successfully:", response.data.newRecord);
  //       alert("Successful");
  //     } catch (error) {
  //       console.error("Error uploading WAV file:", error);
  //     }
  //   } else {
  //     console.log("Incomplete data.");
  //   }
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFileType === 'zip') {
      // Handle ZIP file upload logic here
      console.log('Uploading ZIP file:', file);
    } else if (selectedFileType === 'wav' && selectedGender && selectedAgeGroup && transcriptionFile && selectedOption) {
      // Handle WAV file upload logic with gender and age group here
      console.log('Uploading WAV file:', file);
      console.log('Uploading transcription file: ', transcriptionFile);
      console.log('Selected Gender:', selectedGender);
      console.log('Selected Age Group:', selectedAgeGroup);
    } else {
      alert('Incomplete data...');
    }
  };

  return (
    <div className="App">
      <h1>Upload Files</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label className="option">
            Select File Type:
            <select value={selectedFileType} onChange={handleFileTypeChange}>
              <option value="">Select an option</option>
              <option value="zip">ZIP File</option>
              <option value="wav">WAV File</option>
            </select>
          </label>
          <hr />
        </div>
        {selectedFileType === "zip" && (
          <div>
            <label className="option">
              Upload ZIP File:
              <input type="file" accept=".zip" onChange={handleFileChange} />
            </label>
            <hr></hr>
          </div>
        )}
        {selectedFileType === "wav" && (
          <div>
            <label className="option">Choose Gender:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={handleGenderChange}
                />
                Male
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={handleGenderChange}
                />
                Female
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="Others"
                  checked={selectedGender === "Others"}
                  onChange={handleGenderChange}
                />
                Others
              </label>
            </div>
            <hr />
            <label className="option">Choose Age Group:</label>
            <div>
              <label>
                <input
                  type="radio"
                  value="1-18"
                  checked={selectedAgeGroup === "1-18"}
                  onChange={handleAgeGroupChange}
                />
                1-18
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="18-30"
                  checked={selectedAgeGroup === "18-30"}
                  onChange={handleAgeGroupChange}
                />
                18-30
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="31-50"
                  checked={selectedAgeGroup === "31-50"}
                  onChange={handleAgeGroupChange}
                />
                31-50
              </label>
              <br />
              <label>
                <input
                  type="radio"
                  value="51+"
                  checked={selectedAgeGroup === "51+"}
                  onChange={handleAgeGroupChange}
                />
                51+
              </label>
            </div>
            <hr />
            <label className='option'>
              Select proper tag:
              <select value={selectedOption} onChange={handleDropdownChange}>
                <option value=""></option>
                <option value="Speech recognition">Speech recognition</option>
                <option value="Speaker identification & verification">Speaker identification & verification</option>
                <option value="Text to speech conversion">Text to speech conversion</option>
                <option value="Emotion recognition">Emotion recognition</option>
                <option value="Language identification">Language identification</option>
                <option value="Speaker diariazation">Speaker diariazation</option>
                <option value="Assistive technology">Assistive technology</option>
                <option value="Learning disability">Learning disability</option>
                <option value="Autistic patient's data">Autistic patient's data</option>
                <option value="Whisper speech">Whisper speech</option>
                <option value="Others">Others</option>
                {/* Add more options as needed */}
              </select>
            </label>
            {selectedOption === 'Others' && (
              <div>
                <label className='option'>
                  Custom Tag:
                  <input type="text" value={customTag} onChange={(e) => setCustomTag(e.target.value)} />
                </label>
              </div>
            )}<hr />
            <label className="option">
              Upload WAV File:
              <input type="file" accept=".wav" onChange={handleFileChange} />
            </label>
            <hr />
            <label className='option'>
              Upload Transcription File:
              <input type="file" accept=".txt" onChange={handleTranscriptionFileChange} />
            </label><hr />
          </div>
        )}
        <button type="submit" className="but" onClick={handleUpload} >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Contributer;
