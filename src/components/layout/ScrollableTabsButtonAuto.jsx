import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  PiTrendUpDuotone,
  PiStudentDuotone,
  PiHandCoinsDuotone,
  PiGenderFemaleDuotone,
  PiMegaphoneSimpleDuotone,
  PiMosqueDuotone,
  PiAlarmDuotone,
  PiHeartDuotone,
} from "react-icons/pi";
import { RiErrorWarningLine } from "react-icons/ri";

export default function ScrollableTabsButtonForce({
  name,
  label,
  icone,
  onTabChange,
}) {
  const [value, setValue] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);

    const label = event.currentTarget.textContent;

    onTabChange(newValue, label);
  };

  // const col = {
  //   bor: "#FF9F0A",
  // };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "100%", lg: "85%" },
        bgcolor: "background.paper",
        "& .css-145v6pe-MuiButtonBase-root-MuiTabScrollButton-root.Mui-disabled ":
          {
            display: "none",
          },
        "& .css-ptiqhd-MuiSvgIcon-root": { width: 32, height: 32 },
      }}
    >
      <Tabs
        value={value}
        sx={{
          "& .Mui-selected": {
            background: "linear-gradient(71deg, #FF9F0A 0%, #FF375F 100%)",
            color: "white !important",
            textTransform: "capitalize",
            fontSize: "1.2rem !important",

            "& .icon": {
              color: "white !important",
            },
          },
          "& .MuiButtonBase-root": { textTransform: "capitalize" },
          fontSize: "1.2rem !important",
        }}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        indicatorColor="transparent"
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
      >
        <Tab
          style={{
            color: "var(--cool-grey-cool-grey-10, #383A42)",
            borderRadius: "var(--Spacing-24, 50px)",
            border: "1.5px solid rgb(248, 85, 85)",
            fontFamily: "Satoshi",
            fontSize: "1.1rem",
            fontStyle: "normal",
          }}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RiErrorWarningLine
                style={{ color: "red" }}
                className="icon pr-2 w-8 h-8"
              />
              Newly Added
            </Box>
          }
        />
        <Tab
          style={{
            color: "var(--cool-grey-cool-grey-10, #383A42)",
            borderRadius: "var(--Spacing-24, 50px)",
            border: "1.5px solid rgb(248, 85, 85)",
            fontFamily: "Satoshi",
            fontSize: "1.1rem",
            marginLeft: "12px",
            fontStyle: "normal",
          }}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PiHandCoinsDuotone
                style={{ color: "red" }}
                className="icon pr-2 w-7 h-7"
              />
              Most Supported
            </Box>
          }
        />
        <Tab
          style={{
            color: "var(--cool-grey-cool-grey-10, #383A42)",
            borderRadius: "var(--Spacing-24, 50px)",
            border: "1.5px solid rgb(248, 85, 85)",
            marginLeft: "12px",
            fontFamily: "Satoshi",
            fontSize: "1.1rem",
            fontStyle: "normal",
          }}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PiHeartDuotone
                style={{ color: "red" }}
                className="icon pr-2 w-7 h-7"
              />
              Needs Love
            </Box>
          }
        />
        <Tab
          style={{
            color: "var(--cool-grey-cool-grey-10, #383A42)",
            borderRadius: "var(--Spacing-24, 50px)",
            border: "1.5px solid rgb(248, 85, 85)",
            marginLeft: "12px",
            fontFamily: "Satoshi",
            fontSize: "1.1rem",
            fontStyle: "normal",
          }}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PiAlarmDuotone
                style={{ color: "red" }}
                className="icon pr-2 w-7 h-7"
              />
              Expiring Soon
            </Box>
          }
        />

        <Tab
          style={{
            color: "var(--cool-grey-cool-grey-10, #383A42)",
            borderRadius: "var(--Spacing-24, 50px)",
            border: "1.5px solid rgb(248, 85, 85)",
            marginLeft: "12px",
            fontFamily: "Satoshi",
            fontSize: "1.1rem",
            fontStyle: "normal",
          }}
          label={
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PiTrendUpDuotone
                style={{ color: "red" }}
                className="icon pr-2 w-7 h-7"
              />
              Trending
            </Box>
          }
        />
      </Tabs>
    </Box>
  );
}
