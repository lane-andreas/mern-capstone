import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../utils/api";

const TestimonialManager = ({ testimonials, setTestimonials }) => {
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    content: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/testimonials", newTestimonial);
      setTestimonials([response.data, ...testimonials]);
      setNewTestimonial({ name: "", role: "", content: "" });
      setStatus("TESTIMONIAL ADDED SUCCESSFULLY!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("ERROR ADDING TESTIMONIAL");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter((t) => t._id !== id));
      setStatus("TESTIMONIAL DELETED SUCCESSFULLY!");
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      setStatus("ERROR DELETING TESTIMONIAL");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Manage Testimonials
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={newTestimonial.name}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, name: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Role"
            value={newTestimonial.role}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, role: e.target.value })
            }
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Content"
            value={newTestimonial.content}
            onChange={(e) =>
              setNewTestimonial({ ...newTestimonial, content: e.target.value })
            }
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }}>
            Add Testimonial
          </Button>
        </form>
      </Paper>

      <List>
        {testimonials.map((testimonial) => (
          <ListItem
            key={testimonial._id}
            sx={{ bgcolor: "background.paper", mb: 2, borderRadius: 1 }}
          >
            <ListItemText
              primary={testimonial.name}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {testimonial.role}
                  </Typography>
                  <br />
                  {testimonial.content}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                onClick={() => handleDelete(testimonial._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {status && (
        <Typography
          sx={{
            mt: 2,
            textAlign: "center",
            padding: "10px",
            borderRadius: "4px",
            backgroundColor: status.includes("ERROR") ? "#ffebee" : "#e8f5e9",
            color: status.includes("ERROR") ? "#ff3333" : "#4CAF50",
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
};

export default TestimonialManager;
