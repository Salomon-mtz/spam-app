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
  const [results, setResults] = useState({
    details: {},
    tag: "",
    confidenceScores: {},
  });

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
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
        <SignInForm toggleDrawer={toggleDrawer} setResults={setResults} />
      ) : (
        <SignUpForm toggleDrawer={toggleDrawer} setResults={setResults} />
      )}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 500, padding: 2 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Typography
            variant="h5"
            color="secondary"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Result Display
          </Typography>
          {results &&
            results.confidenceScores &&
            Object.entries(results.confidenceScores).map(([model, score]) => (
              <Typography key={model} sx={{ mb: 1 }}>
                {model.toUpperCase()}:{" "}
                {score ? `${(score * 100).toFixed(2)}%` : "N/A"}
              </Typography>
            ))}
          <Chip
            label={results.tag}
            sx={{
              backgroundColor: results.tag === "Spam" ? "red" : "green",
              color: "white",
              fontWeight: "bold",
              mt: 2,
            }}
          />
        </Box>
      </Drawer>
    </Box>
  );
}

function SignInForm({ toggleDrawer, setResults }) {
  const [formData, setFormData] = useState({
    emailFrom: "",
    emailSubject: "",
    attachmentCount: "",
    attachmentExtension: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailData = `From: ${formData.emailFrom}\nSubject: ${formData.emailSubject}\nBody: Please find the attached file(s). Total attachments: ${formData.attachmentCount}, types: ${formData.attachmentExtension}`;

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailData: emailData }),
    });
    const result = await response.json();
    setResults(result); // Store the result in state
    toggleDrawer(true)();
  };

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
      onSubmit={handleSubmit}
    >
      <TextField
        name="emailFrom"
        required
        label="Email From"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="John Doe <john.doe@example.com>"
        value={formData.emailFrom}
        onChange={handleInputChange}
      />
      <TextField
        name="emailSubject"
        required
        label="Email Subject"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Important: Project Update - Q3 Results"
        value={formData.emailSubject}
        onChange={handleInputChange}
      />
      <TextField
        name="attachmentCount"
        required
        label="Attachment Count"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="3"
        type="number"
        value={formData.attachmentCount}
        onChange={handleInputChange}
      />
      <TextField
        name="attachmentExtension"
        required
        label="Attachment Extension"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="pdf, png, xlsx"
        value={formData.attachmentExtension}
        onChange={handleInputChange}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, width: "100%", fontWeight: "bold" }}
      >
        Execute
      </Button>
    </Box>
  );
}

function SignUpForm({ toggleDrawer, setResults }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://127.0.0.1:5000/predict_csv", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log(result);
    setResults(result); // Assuming result.results is an array of results
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
      >
        Execute
      </Button>
    </Box>
  );
}

export default LeftSide;
