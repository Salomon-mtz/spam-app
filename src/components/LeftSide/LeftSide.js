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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeftSide() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [results, setResults] = useState({
    details: {},
    tag: "",
    confidenceScores: {},
    predicted_class: "", // Ensure this is part of your results state
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
        <SignUpForm
          toggleDrawer={toggleDrawer}
          setResults={setResults}
          results={results}
        />
      )}
      {selectedTab === 0 && drawerOpen && (
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
              Spam Detection Results
            </Typography>
            <Typography variant="h6" color="black" sx={{ mb: 2 }}>
              Predict whether an email is spam using various models like SVM,
              Random Forest, Naive Bayes, and MLP. Metrics:
            </Typography>
            <Typography sx={{ mb: 2 }}>
              - SVM Accuracy: 0.87, Precision: 0.88, F1 Score: 0.75
            </Typography>
            <Typography sx={{ mb: 2 }}>
              - NB Accuracy: 0.88, Precision: 0.84, F1 Score: 0.78
            </Typography>
            <Typography sx={{ mb: 2 }}>
              - RF Accuracy: 0.91, Precision: 0.86, F1 Score: 0.84
            </Typography>
            <Typography sx={{ mb: 2 }}>
              - MLP Accuracy: 0.90, Precision: 0.84, F1 Score: 0.82
            </Typography>
            {results.confidenceScores &&
              Object.entries(results.confidenceScores).map(([model, score]) => (
                <Typography key={model} sx={{ mb: 1 }}>
                  {model.toUpperCase()}:{" "}
                  {score ? `${(score * 100).toFixed(2)}%` : "N/A"}
                </Typography>
              ))}
            <Chip
              label={results.predicted_class === "Spam" ? "Spam" : "Not Spam"}
              sx={{
                backgroundColor:
                  results.predicted_class === "Spam" ? "red" : "green",
                color: "white",
                fontWeight: "bold",
                mt: 2,
              }}
            />
          </Box>
        </Drawer>
      )}
      <ToastContainer />
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
    if (
      !formData.emailFrom ||
      !formData.emailSubject ||
      !formData.attachmentCount ||
      !formData.attachmentExtension
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const emailData = {
      email_from: formData.emailFrom,
      email_subject: formData.emailSubject,
      attachment_count: formData.attachmentCount,
      attachment_extension: formData.attachmentExtension,
    };

    const response = await fetch(
      "https://5027-172-203-93-51.ngrok-free.app/single",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      }
    );
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

function SignUpForm({ toggleDrawer, setResults, results }) {
  const [file, setFile] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      toast.error("Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "https://5027-172-203-93-51.ngrok-free.app/csv",
      {
        method: "POST",
        body: formData,
      }
    );
    const result = await response.json();

    if (result.predictions) {
      result.predictions.forEach((prediction, index) => {
        prediction.id = index + 1;
      });
    }

    setResults(result);
    toggleDrawer(true)();
    setDrawerOpen(true);
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
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: "auto", padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            CSV Results
          </Typography>
          <Typography variant="h6" color="black" sx={{ mb: 2 }}>
            Predict whether an email is spam using various models like SVM,
            Random Forest, Naive Bayes, and MLP. Metrics:
          </Typography>
          <Typography sx={{ mb: 2 }}>
            - SVM Accuracy: 0.87, Precision: 0.88, F1 Score: 0.75
          </Typography>
          <Typography sx={{ mb: 2 }}>
            - NB Accuracy: 0.88, Precision: 0.84, F1 Score: 0.78
          </Typography>
          <Typography sx={{ mb: 2 }}>
            - RF Accuracy: 0.91, Precision: 0.86, F1 Score: 0.84
          </Typography>
          <Typography sx={{ mb: 2 }}>
            - MLP Accuracy: 0.90, Precision: 0.84, F1 Score: 0.82
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Email Subject</TableCell>
                  <TableCell align="right">Email From</TableCell>
                  <TableCell align="right">Predicted Class</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {results.predictions &&
                  results.predictions.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.email_subject}</TableCell>
                      <TableCell align="right">
                        {row.email_from} {/* Display Email From data */}
                      </TableCell>
                      <TableCell align="right">
                        <Chip
                          label={row.predicted_class}
                          sx={{
                            backgroundColor:
                              row.predicted_class === "Spam" ? "red" : "green",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Drawer>
      <ToastContainer />
    </Box>
  );
}

export default LeftSide;
