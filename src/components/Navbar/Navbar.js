import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Navbar() {
  const secondaryBlue = "#5A7BC2";
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ boxShadow: "none", color: secondaryBlue }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: "bold" }}
        >
          SPAM Detector
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/about"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        >
          Documentation
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
