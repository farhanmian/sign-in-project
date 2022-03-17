import { createTheme } from "@material-ui/core";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
    h2: {
      fontSize: 40,
      fontWeight: 500,
      lineHeight: "60px",
      letterSpacing: "1px",
      "@media(max-width: 1000px)": {
        fontSize: 35,
        lineHeight: "50px",
      },
      "@media(max-width: 800px)": {
        fontSize: 28,
        lineHeight: "45px",
      },

      "@media(max-width: 500px)": {
        fontSize: "6vw",
        lineHeight: "30px",
      },
      "@media(max-width: 400px)": {
        fontSize: 22,
        lineHeight: "25px",
      },
    },
    h6: {
      fontSize: 20,
      fontWeight: 600,
      lineHeight: "30px",
      letterSpacing: "1px",
      "@media(max-width: 800px)": {
        fontSize: 18,
        lineHeight: "25px",
      },
      "@media(max-width: 700px)": {
        fontSize: 16,
        lineHeight: "22px",
      },
    },
    body1: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: "24px",
      letterSpacing: "1px",
    },
    body2: {
      fontSize: 14,
      lineHeight: "21px",
      fontWeight: 500,
      "@media(max-width: 400px)": {
        fontSize: 12,
      },
    },
    subtitle1: {
      fontSize: 12,
      lineHeight: "18px",
      fontWeight: 500,
    },
  },
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#E5E5E5",
      dark: "#d5d5d5",
    },
    text: {
      primary: "#2F2E41",
      secondary: "#333",
    },
  },
});

export { theme };
