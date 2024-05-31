import React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import DrawerBody from "./DrawerBody";
import Navbar from "../navbar/index";

export function SideBar({ mobileOpen, setMobileOpen }) {
  const container = React.useRef(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }} className="container">
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
              // position: mobileOpen ? "absolute" : "" ,
              left: mobileOpen ? "0px" : "273px",
              width: mobileOpen ? "273px" : "0px",
            },
          }}
        >
          <DrawerBody />
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
