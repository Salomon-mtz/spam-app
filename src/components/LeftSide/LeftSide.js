import React, { useState } from "react";
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Drawer,
  Button,
  TextField,
  Chip,
} from "@mui/material";

function LeftSide() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    // Check if the event is defined and prevent the drawer toggle on certain conditions
    if (event && event.type === "keydown") {
      if (event.key === "Tab" || event.key === "Shift") {
        return;
      }
    }
    setDrawerOpen(open);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
        Test the API
      </Typography>
      <Tabs value={selectedTab} onChange={handleChange} centered>
        <Tab
          label="Email Form"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        />
        <Tab
          label="CSV File"
          sx={{ textTransform: "none", fontWeight: "bold" }}
        />
      </Tabs>
      {selectedTab === 0 ? (
        <SignInForm toggleDrawer={toggleDrawer} />
      ) : (
        <SignUpForm toggleDrawer={toggleDrawer} />
      )}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 500, padding: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ justifyContent: "space-between", padding: 3 }}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Random Forest
            </Typography>
            <Typography sx={{ mb: 1 }}>Accurancy: 0.5</Typography>
            <Chip
              label="Spam"
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>
          <Box sx={{ justifyContent: "space-between", padding: 3 }}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              SVM
            </Typography>
            <Typography sx={{ mb: 1 }}>Accurancy: 0.5</Typography>
            <Chip
              label="Spam"
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>
          <Box sx={{ justifyContent: "space-between", padding: 3 }}>
            <Typography
              variant="h5"
              color={"secondary"}
              sx={{ fontWeight: "bold", mb: 2 }}
            >
              Naive Bayes
            </Typography>
            <Typography sx={{ mb: 1 }}>Accurancy: 0.5</Typography>
            <Chip
              label="Spam"
              sx={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "bold",
              }}
            />
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}

function SignInForm({ toggleDrawer }) {
  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
      }}
      noValidate
      autoComplete="off"
      onSubmit={(event) => {
        event.preventDefault();
        toggleDrawer(true)();
      }}
    >
      <TextField
        required
        label="Email From"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="John Doe <john.doe@example.com>"
      />
      <TextField
        required
        label="Email Subject"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Important: Project Update - Q3 Results"
      />
      <TextField
        required
        label="Attachment Count"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="3"
        type="number"
      />
      <TextField
        required
        label="Attachment Extension"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="pdf, png, xlsx"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "100%", fontWeight: "bold" }}
        onSubmit={(event) => {
          event.preventDefault();
          toggleDrawer(true)(event); // Pass the event here
        }}
      >
        Execute
      </Button>
    </Box>
  );
}

function SignUpForm({ toggleDrawer }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    toggleDrawer(true)();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="file"
        onChange={handleFileChange}
        inputProps={{ accept: ".csv" }}
        sx={{ mb: 2 }}
        fullWidth
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "100%", fontWeight: "bold" }}
        onSubmit={(event) => {
          event.preventDefault();
          if (!file) {
            alert("Please upload a file.");
            return;
          }
          toggleDrawer(true)(event); // Pass the event here
        }}
      >
        Execute
      </Button>
    </Box>
  );
}

export default LeftSide;
