import { TextField } from "@mui/material";
import React from "react";
import { colors } from "../../../constants/theme";
import CloseIcon from "@mui/icons-material/Close";
import { SearchOutlined } from "@mui/icons-material";

const searchInputStyle = {
  "& .MuiInputBase-root": {
    borderRadius: "8px",
    padding: "13px 15px",
  },
  "& .MuiInputBase-root input": {
    padding: 0,
    paddingLeft: "10px",
    fontSize: "0.9rem",
  },
  "& .MuiInputBase-root.MuiInputBase-sizeSmall": {
    padding: "6.5px 15px",
  },
  "& .MuiInputBase-root .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${colors.tertiary.light}`,
  },
  "& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: `2px solid ${colors.tertiary.main}`,
  },
};

export const Search = ({ sx, className, onClear, ...props }) => {
  return (
    <TextField
      fullWidth
      sx={{ ...searchInputStyle, ...sx }}
      variant="outlined"
      size="small"
      className={className}
      InputProps={{
        endAdornment: props.value ? (
          <div
            className="cursor-pointer h-full flex items-center"
            onClick={() => onClear && onClear()}
          >
            <CloseIcon />
          </div>
        ) : (
          <></>
        ),
        startAdornment: (
          <SearchOutlined size={20} style={{ color: "#8D8D8D" }} />
        ),
      }}
      placeholder="Search..."
      {...props}
    />
  );
};
