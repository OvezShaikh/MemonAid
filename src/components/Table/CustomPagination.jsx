import React from "react";
import { Box, MenuItem, Button, Select, Grid } from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  PageFirst,
  PageLast,
} from "@carbon/icons-react";

const PaginationButtonStyling = {
  minWidth: "30px",
  paddingLeft: "0px",
  paddingRight: "0px",
  marginRight: "0.2em",
  marginLeft: "0.2em",
};

const CustomPagination = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  setPageSize,
  pageIndex,
  pageSize,
}) => {
  return (
    <Box className="d-flex justify-content-between align-items-center w-100 py-3">
      <Grid
        container
        className="d-flex align-items-center justify-content-start"
      >

        <Button
          variant="contained"
          color="warning"
          size="small"
          className="text-light"
          sx={PaginationButtonStyling}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <PageFirst />
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          className="text-light "
          sx={PaginationButtonStyling}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          className="text-light"
          sx={PaginationButtonStyling}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >

          <ChevronRight />
        </Button>
        <Button
          variant="contained"
          color="warning"
          size="small"
          className="text-light"
          sx={PaginationButtonStyling}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <PageLast />
        </Button>
        <span className="border-r-2 px-2  text-black/40">
          Showing {" "}
          <strong>
            {(pageIndex * pageSize) + 1}</strong> to <strong>{((pageIndex + 1) * pageSize)}</strong> of <strong>{pageOptions.length}
          </strong>
        </span>
        <Grid
          item
          xs={12}
          md={6}
          className="p-2 d-flex align-items-center text-black/40"
        // style={{
        //   color: "#333333",
        // }}
        >
          Show &nbsp;
          <Select
            value={pageSize.toString()}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
            sx={{
              height: "20px",
              // width: "50px",
            }}
          >
            {[5,10,25, 50, 75, 100, 150].map((pageSize) => (
              <MenuItem
                key={pageSize}
                value={pageSize}
                sx={{
                  fontFamily: "'Century Gothic', sans-serif",
                  color: "#333333",
                }}
              >
                {pageSize}
              </MenuItem>
            ))}
          </Select>
          &nbsp; entries
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomPagination;
