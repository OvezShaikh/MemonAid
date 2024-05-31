import React, { useContext } from "react";
import { Menu, MenuItem, Box } from "@mui/material";
import AuthContext from "../../../authContext/AuthContext";
import { LogoutOutlined } from "@mui/icons-material";

const DropDown = ({ children }) => {
  const authContext = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dropDownOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={dropDownOpen ? "true" : undefined}
        onClick={handleClick}
        sx={{ cursor: "pointer", fontSize: "0.9rem" }}
        variant="contained"
        className="text-capitalize d-inline dark font-light max-desktop:font-[satoshi]"
      >
        {children}
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={dropDownOpen}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        PaperProps={{
          elevation: 0,
          sx: {
            // backgroundColor: "#fff2d8e6",
            paddingTop: 0,
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 13,
              width: 10,
              height: 10,
              backgroundColor: "#fff2d8e6",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          className="dark max-desktop:font-[satoshi]"
          sx={{
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "1px 8px",
            color: "#828282",
            backgroundColor: "#fff2d8e6",
            "&:hover": {
              backgroundColor: "#F0D780",
            },
          }}
          onClick={() => {}}
        >
          <LogoutOutlined />
          &nbsp; Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default DropDown;
