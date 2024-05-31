import * as React from "react";
import { useState, useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import images from "../../../constants/images";
import "./SuccessfulFilterField.css";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Index({ sendCategoryToParent, sendLocationToParent }) {
  const [CategoryList, setCategoryList] = useState([]);
  const [LocationList, setLocationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 20;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
    sendCategoryToParent(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocations(event.target.value);
    sendLocationToParent(event.target.value);
  };

  const CustomIcon = () => (
    <svg
      width="15"
      height="9"
      viewBox="0 0 15 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1927 1.70635L7.94268 7.95635C7.88463 8.01446 7.8157 8.06056 7.73983 8.09201C7.66396 8.12346 7.58263 8.13965 7.50049 8.13965C7.41836 8.13965 7.33703 8.12346 7.26115 8.09201C7.18528 8.06056 7.11635 8.01446 7.0583 7.95635L0.808305 1.70635C0.720798 1.61894 0.661193 1.50753 0.637036 1.38623C0.61288 1.26492 0.625258 1.13918 0.672603 1.02492C0.719948 0.910652 0.800132 0.813004 0.903003 0.744335C1.00587 0.675666 1.12681 0.639063 1.25049 0.63916H13.7505C13.8742 0.639063 13.9951 0.675666 14.098 0.744335C14.2009 0.813004 14.281 0.910652 14.3284 1.02492C14.3757 1.13918 14.3881 1.26492 14.3639 1.38623C14.3398 1.50753 14.2802 1.61894 14.1927 1.70635Z"
        fill="url(#paint0_linear_4686_9002)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_4686_9002"
          x1="0.625"
          y1="8.13965"
          x2="9.00864"
          y2="2.98968"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#FF9F0A" />
          <stop offset="1" stop-color="#FF375F" />
        </linearGradient>
      </defs>
    </svg>
  );
  useEffect(() => {
    const fetchLocationList = async () => {
      try {
        // const API_ENDPOINT = `${process.env.REACT_APP_API_URL}/campaign/campaign-category?page=1&limit=1000`;
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

  const fetchCategoryList = async () => {
    try {
      const perPage = 100;
      const response = await axios.get(
        // `${process.env.REACT_APP_API_URL}/campaign/campaign?page=${page}&limit=${perPage}`
        `${process.env.REACT_APP_API_URL}/campaign/successful-campaign?page=1&limit=1000`
      );
      const res = response.data;

      if (Array.isArray(res.rows)) {
        setCategoryList([...CategoryList, ...res.rows]);
      } else {
        console.error("Invalid data structure. Expected an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, [page]);

  const uniqueCategory = Array.from(
    new Set(LocationList.map((item) => item.category.name))
  );
  const uniqueLocations = Array.from(
    new Set(CategoryList.map((item) => item.location))
  );

  return (
    <>
      <div className="extra-filter-options flex items-center gap-x-[40px] mt-[20px] max-tablet:flex-col max-tablet:gap-y-[20px]">
        <div className="extra-filter-category flex">
          {" "}
          <span className="font-[Satoshi] font-bold text-[1.12rem] items-center flex mr-[12px]">
            Category:{" "}
          </span>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedCategories}
              onChange={handleCategoryChange}
              input={<OutlinedInput label="Select Location" />}
              IconComponent={CustomIcon}
              renderValue={(selected) => (
                <span className="no-selected-text font-[Satoshi] font-bold text-[1.12rem]">{`${selected.length} selected`}</span>
              )}
              MenuProps={MenuProps}
              sx={{
                height: 60,
              }}
            >
              {uniqueCategory.map((item, index) => (
                <MenuItem
                  key={item}
                  value={item}
                  sx={{
                    padding: "12px",
                    paddingLeft: "20px",
                    color: "rgba(23, 43, 77, 1)",

                    "&.Mui-selected": {
                      backgroundColor: "transparent", // Set the background color to transparent when selected
                    },
                  }}
                >
                  <Checkbox
                    checked={selectedCategories.indexOf(item) > -1}
                    sx={{
                      fontFamily: "Satoshi",
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      marginRight: "17px",
                      color: "#d8dde6",
                      width: "14px",
                      height: "14px",

                      "&.Mui-checked": {
                        width: "14px",
                        height: "14px",
                        color: "transparent", // Set the color to transparent for the checked state

                        backgroundImage: `url(${images.CheckBoxGradient})`, // Add the path to your image
                        backgroundSize: "cover", // Adjust this property based on your image requirements
                        backgroundRepeat: "no-repeat", // Set to 'repeat' if needed
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundImage: `url(${images.CheckBoxGradient})`, // Add the path to your image
                          backgroundSize: "cover", // Adjust this property based on your image requirements
                          backgroundRepeat: "no-repeat", // Set to 'repeat' if needed
                          borderRadius: "4px",
                        },
                      },
                    }}
                  />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="extra-filter-location flex">
          <span className="font-[Satoshi] font-bold text-[1.12rem] items-center flex mr-[12px]">
            {" "}
            Location:{" "}
          </span>
          <FormControl sx={{ width: 150 }}>
            <InputLabel id="demo-multiple-checkbox-label"></InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              name="Select Category"
              multiple
              value={selectedLocations}
              onChange={handleLocationChange}
              input={<OutlinedInput label="Select Location" />}
              IconComponent={CustomIcon}
              renderValue={(selected) => (
                <span className="no-selected-text font-[Satoshi] font-bold text-[1.12rem]">{`${selected.length} selected`}</span>
              )}
              MenuProps={MenuProps}
              sx={{
                height: 60,
              }}
            >
              {uniqueLocations.map((item) => (
                <MenuItem
                  key={item}
                  value={item}
                  sx={{
                    padding: "12px",
                    paddingLeft: "20px",
                    color: "rgba(23, 43, 77, 1)",

                    "&.Mui-selected": {
                      backgroundColor: "transparent", // Set the background color to transparent when selected
                    },
                  }}
                >
                  <Checkbox
                    checked={selectedLocations.indexOf(item) > -1}
                    sx={{
                      fontFamily: "Satoshi",
                      fontSize: "1.1rem",
                      fontWeight: "400",
                      marginRight: "17px",
                      color: "#d8dde6",
                      width: "14px",
                      height: "14px",

                      "&.Mui-checked": {
                        width: "14px",
                        height: "14px",
                        color: "transparent", // Set the color to transparent for the checked state

                        backgroundImage: `url(${images.CheckBoxGradient})`, // Add the path to your image
                        backgroundSize: "cover", // Adjust this property based on your image requirements
                        backgroundRepeat: "no-repeat", // Set to 'repeat' if needed
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundImage: `url(${images.CheckBoxGradient})`, // Add the path to your image
                          backgroundSize: "cover", // Adjust this property based on your image requirements
                          backgroundRepeat: "no-repeat", // Set to 'repeat' if needed
                          borderRadius: "4px",
                        },
                      },
                    }}
                  />
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </>
  );
}

export default Index;
