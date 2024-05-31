import { createTheme } from "@mui/material";

export const drawerWidth = 273;
export const colors = {
  primary: { dark: "#F58220", light: "#FEF4DD",main:'var(--Linear-BG, linear-gradient(71deg, #FF9F0A 0%, #FF375F 62.9%))' },
  secondary: { dark: "#006DCC" },
  tertiary: { dark: "#404040", light: "#E2E2E2", main: "#CBD3D9" },
  text: { dark: "#171717", light: "#525252", main: "#404040" },
};

export const theme = createTheme({
  typography: {
    fontFamily: "satoshi",
  },
  palette: {
    secondary: {
      dark: colors.tertiary.main,
      main: colors.tertiary.dark,
      light: colors.tertiary.light,
    },
    warning: {
      main: colors.primary.dark,
    },
    white: {
      main: "#fff",
    },
    green: {
      main: "#65a765",
      light: "#90EE90",
    },
    red: {
      main: "#FF0000",
      light: "#9D2828",
    },
  },
});
