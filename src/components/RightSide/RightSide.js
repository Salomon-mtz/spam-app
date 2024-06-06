import React from "react";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import logo from "../../assets/logo.png";

function RightSide() {
  const primaryBlue = "#26397F";
  const secondaryBlue = "#5A7BC2";
  const tertiaryBlue = "#A0B9E9";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"

      sx={{
        textAlign: "center", // Center align text elements
        paddingRight: "20px",
        paddingLeft: "20px",
        height: "100vh"
      }}
    >
      <Box>
        <img src={logo} alt="logo" style={{ width: "120px", marginBottom: 20 }}  />
        <Typography
          variant="h1"
          component="h1"
          gutterBottom
          sx={{ fontSize: "70px" }}
        >
          Email{" "}
          <span style={{ color: primaryBlue, fontWeight: "bold" }}>
            Spam Detection
          </span>{" "}
          API
        </Typography>
        <Typography variant="h5">
          API for predicting whether an email is spam or not using a combination
          of three models:
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          pt={5}
        >
          <Chip
            label="SVM"
            sx={{
              backgroundColor: primaryBlue,
              color: "white",
              fontWeight: "bold",
            }}
          />
          <Chip
            label="Random Forest"
            sx={{
              backgroundColor: secondaryBlue,
              color: "white",
              fontWeight: "bold",
            }}
          />
          <Chip
            label="Naive Bayes"
            sx={{
              backgroundColor: tertiaryBlue,
              color: "white",
              fontWeight: "bold",
            }}
          />
           <Chip
            label="MLP"
            sx={{
              backgroundColor: primaryBlue,
              color: "white",
              fontWeight: "bold",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
}

export default RightSide;
