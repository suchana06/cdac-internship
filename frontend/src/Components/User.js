import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileDetails from './FileDetails';
import '../Css/Contributer.css'
const User = () => {
  const navigate = useNavigate();
  const [gender, setGender] = useState('');
  const [tags, setTags] = useState('');
  const [customTag, setCustomTag] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [matchedResults, setMatchedResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getdata');
        setData(response.data);
      } catch (error) {
        console.error('Fetch error', error);
      }
    };

    fetchData();
  }, [showSearch]);

  const handleSearch = () => {
    setShowSearch(false);

    const matchedResults = data.filter((result) => {
      const genderMatch = gender ? result.gender.toLowerCase() === gender.toLowerCase() : true;
      const tagsMatch = tags
        ? result.tags.toLowerCase().includes(tags.toLowerCase())
        : customTag
          ? result.tags.toLowerCase().includes(customTag.toLowerCase())
          : true;
      const ageGroupMatch = ageGroup ? result.agegroup.toLowerCase().includes(ageGroup.toLowerCase()) : true;
      const dateMatch = checkDateRange(result.uploadDate);

      return genderMatch && tagsMatch && ageGroupMatch && dateMatch;
    });

    if (matchedResults.length > 0) {
      setShowSearch(true);
      setMatchedResults(matchedResults);
    } else {
      navigate(`/error`);
    }
  };

  const checkDateRange = (uploadDate) => {
    if (startDate && endDate) {
      return uploadDate >= startDate && uploadDate <= endDate;
    } else if (startDate) {
      return uploadDate >= startDate;
    } else if (endDate) {
      return uploadDate <= endDate;
    }
    return true;
  };

  return (
    <>
      <div className="container">
        <h5 id='head'>Select search criteria to filter audio data:</h5>
        <div className="search-container">
          <select value={gender} onChange={(e) => setGender(e.target.value)} className='search-dropdown'>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>

          <select value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className='search-dropdown'>
            <option value="">Select Age Group</option>
            <option value="1-18">1-18</option>
            <option value="18-30">18-30</option>
            <option value="31-50">31-50</option>
            <option value="51">51+</option>
          </select>

          <select
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="search-dropdown"
          >
            <option value="">Select Tags</option>
            <option value="Speech recognition">Speech recognition</option>
            <option value="Speaker identification & verification">
              Speaker identification & verification
            </option>
            <option value="Language identification">Language identification</option>
            <option value="Emotion recognition">Emotion recognition</option>
            <option value="Text to speech conversion">Text to speech conversion</option>
            <option value="Speaker diarization">Speaker diarization</option>
            <option value="Assistive technology">Assistive technology</option>
            <option value="Learning disability">Learning disability</option>
            <option value="Autistic patient's data">Autistic patient's data</option>
            <option value="Whisper speech">Whisper speech</option>
          </select>
          <p>or</p>
          <input
            type="text"
            placeholder="Enter Custom Tag"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            className="search-input"
          />

          <div className="date-picker-container">
            <label>Upload Date Range:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='date-picker'
            />
            <span>to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='date-picker'
            />
          </div>

          {/* Automatically trigger search when any input changes */}
          <button className='search-button' onClick={handleSearch}>Search</button>
        </div>
      </div>

      {showSearch ? (
        <div>
          <h1 id='heading'>Matching Results:</h1>
          <hr />
          {matchedResults.map((result, index) => (
            <div key={index}>
              <FileDetails data={result} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default User;
