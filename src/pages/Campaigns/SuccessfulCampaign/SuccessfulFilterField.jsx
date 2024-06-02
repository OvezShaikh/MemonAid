import React, { useState, useRef, useEffect } from 'react';
import "./SuccessfulFilterField.css";
import images from '../../../constants/images';
import axios from 'axios';

const SuccessFilterField = ({  sendLocationToParent }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const categoryBoxRef = useRef(null);
  const locationBoxRef = useRef(null);
  const [LocationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleLocationToggle = () => {
    setIsLocationOpen(!isLocationOpen);
  };


  const handleLocationChange = (option) => {
    const newSelectedLocations = selectedLocations.includes(option)
      ? selectedLocations.filter((o) => o !== option)
      : [...selectedLocations, option];
    setSelectedLocations(newSelectedLocations);
    sendLocationToParent(newSelectedLocations);
  };

  const handleClickOutside = (event) => {
    if (locationBoxRef.current && !locationBoxRef.current.contains(event.target)) {
      setIsLocationOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchLocationList = async () => {
      try {
        const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/campaign/successful-campaign?page=1&limit=1000`;
        const response = await axios.get(API_ENDPOINT);
        setLocationList(response.data.rows);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLocationList();
  }, []);
 
  const uniqueLocations = Array.from(
    new Set(LocationList.map((item) => item.location))
  );

  return (
    <div className="extra-filter-options flex items-center gap-x-[40px] mt-[20px] max-tablet:flex-col max-tablet:gap-y-[20px]  ">
      <div className="select-with-checkboxes" ref={locationBoxRef}>
        <div className="select-box" onClick={handleLocationToggle}>
          {selectedLocations.length > 0 ? (
            <span className="no-selected-text font-[Satoshi] font-bold text-[18px]">
              {selectedLocations.length} selected
            </span>
          ) : (
            <div className="blank"><p>Location</p></div>
          )}
          <span className="arrow">
            <img
              src={images.ColorFullDownArrow}
              alt="No image"
            />
          </span>
        </div>
        {isLocationOpen && (
          <div className="options">
            {uniqueLocations.map((item) => (
              <label key={item} className="option">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(item)}
                  onChange={() => handleLocationChange(item)}
                />
                <span className="custom-checkbox"></span>
                {item}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessFilterField;