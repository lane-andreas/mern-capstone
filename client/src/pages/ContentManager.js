import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Container, Box, Divider } from "@mui/material";
import ContentForm from "../components/ContentForm";
import TestimonialManager from "../components/TestimonialManager";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";

const ContentManager = () => {
  const { isAuthenticated } = useAuth();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get("/testimonials");
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container maxWidth="md">
      <ContentForm />
      <Divider sx={{ my: 4 }} />
      <TestimonialManager
        testimonials={testimonials}
        setTestimonials={setTestimonials}
      />
    </Container>
  );
};

export default ContentManager;
