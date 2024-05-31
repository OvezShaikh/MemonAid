import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerBody from "./User_DrawerBody";
import Navbar from "../navbar/index";
import User_DrawerBody from "./User_DrawerBody";

export function User_SideBar({ mobileOpen, setMobileOpen }) {
  const container = React.useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }} className="container">
      {/* <CssBaseline /> */}
      <Navbar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <Box
        component="nav"
        sx={{
          width: "273px",
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          className="transition-all duration-500 ease-in-out"
          container={container.current}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            className: "transition-all duration-500 ease-in-out",
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              left: mobileOpen ? "0px" : "273px",
              // width: mobileOpen ? "273px" : "0px",
            },
          }}
        >
          <User_DrawerBody />
        </Drawer>
        <Drawer
          PaperProps={{
            className: "!transition-all !duration-500 !ease-in-out",
          }}
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              // width: mobileOpen ? `273px` : '0px',
              left: mobileOpen ? "0px" : "-285px",
              top: "72px",
            },
          }}
          open
        >
          <DrawerBody />
        </Drawer>
      </Box>
    </Box>
  );
}
