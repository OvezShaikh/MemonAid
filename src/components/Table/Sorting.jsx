import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Stack } from "@mui/material";
import React from "react";

const Sorting = ({ column, order, sortField, handleSortingChange }) => {
  return (
    <div className="sort-container max-tablet:hidden max-desktop:hidden">
      <Stack>
        <ArrowDropUp
          fontSize="small"
          viewBox="2 2 17 17"
          className={`sort-icon ${
            order === "asc" && sortField === column?.id
              ? "invisible"
              : "visible"
          }`}
          onClick={() => handleSortingChange(column?.id, "asc")}
        />
        <ArrowDropDown
          fontSize="small"
          viewBox="2 2 17 17"
          className={`sort-icon ${
            order === "desc" && sortField === column?.id
              ? "invisible"
              : "visible"
          }`}
          onClick={() => handleSortingChange(column?.id, "desc")}
        />
      </Stack>
    </div>
  );
};

export default Sorting;
