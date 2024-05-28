// src/theme.js
import { createTheme } from "@mui/material/styles";

const primaryBlue = "#26397F";
const secondaryBlue = "#5A7BC2";
const tertiaryBlue = "#A0B9E9";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryBlue,
    },
    secondary: {
      main: secondaryBlue,
    },
    tertiary: {
      main: tertiaryBlue,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderRadius: "20px",
              borderColor: secondaryBlue,
            },
            "&:hover fieldset": {
              borderColor: tertiaryBlue,
            },
            "&.Mui-focused fieldset": {
              borderColor: primaryBlue,
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: primaryBlue,
          "&:hover": {
            backgroundColor: secondaryBlue,
          },
        },
      },
    },
  },
});

export default theme;
