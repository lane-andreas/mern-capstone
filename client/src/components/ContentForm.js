import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import api from "../utils/api";

const ContentForm = () => {
  const [sections, setSections] = useState({
    header: "",
    main: "",
    footer: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get("/content");
      const contentMap = {};
      response.data.forEach((item) => {
        contentMap[item.section] = item.content;
      });
      setSections((prev) => ({ ...prev, ...contentMap }));
    } catch (error) {
      setStatus("ERROR LOADING CONTENT");
    }
  };

  const handleSubmit = async (section) => {
    try {
      await api.put(`/content/${section}`, {
        content: sections[section],
      });
      setStatus(`${section.toUpperCase()} UPDATED SUCCESSFULLY!`);

      // Clear success message after 3 seconds
      setTimeout(() => {
        setStatus("");
      }, 3000);
    } catch (error) {
      setStatus("ERROR UPDATING CONTENT");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Content Management
        </Typography>
        {Object.entries(sections).map(([section, content]) => (
          <Box key={section} sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {section.charAt(0).toUpperCase() + section.slice(1)} Content
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={content}
              onChange={(e) =>
                setSections((prev) => ({
                  ...prev,
                  [section]: e.target.value,
                }))
              }
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={() => handleSubmit(section)}>
              Update {section}
            </Button>
          </Box>
        ))}
        {status && (
          <Typography
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: status.includes("ERROR") ? "#ff3333" : "#4CAF50",
              textAlign: "center",
              padding: "10px",
              borderRadius: "4px",
              backgroundColor: status.includes("ERROR") ? "#ffebee" : "#e8f5e9",
            }}
          >
            {status}
          </Typography>
        )}
      </Box>
    </Container>
  );
};
export default ContentForm;
