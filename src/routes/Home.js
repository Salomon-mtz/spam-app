import React from "react";
import Navbar from "../components/Navbar/Navbar";
import RightSide from "../components/RightSide/RightSide";
import LeftSide from "../components/LeftSide/LeftSide";
import { Grid, Box } from "@mui/material";

function Home() {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <RightSide />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LeftSide />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
