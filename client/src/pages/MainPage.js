import React, { useState, useEffect } from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import api from "../utils/api";
import Testimonials from "../components/Testimonials";

const MainPage = () => {
  const [content, setContent] = useState({
    header: "Unified one any device",
    main: "We help businesses deliver digital customer experiences that are personalized, optimized, and synchronized.",
    footer: "© 2024 MERN App",
  });
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [contentRes, testimonialsRes] = await Promise.all([
          api.get("/content"),
          api.get("/testimonials"),
        ]);

        const contentMap = {};
        contentRes.data.forEach((item) => {
          contentMap[item.section] = item.content;
        });
        setContent((prev) => ({ ...prev, ...contentMap }));
        setTestimonials(testimonialsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchContent();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#F5F7FF", minHeight: "90vh" }}>
      {/* Header Section */}
      <Box sx={{ pt: 8, pb: 6 }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Left side - Text content */}
            <Box sx={{ maxWidth: "600px" }}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: "bold",
                  mb: 3,
                  lineHeight: 1.2,
                }}
              >
                {content.header}
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#666",
                  fontSize: "1.2rem",
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                {content.main}
              </Typography>

              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4169E1",
                  fontSize: "1.1rem",
                  py: 1.5,
                  px: 4,
                  borderRadius: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#3154b3",
                  },
                }}
              >
                Get started free
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    display: "inline-block",
                    transform: "rotate(-45deg)",
                    fontSize: "1.4rem",
                  }}
                >
                  →
                </Box>
              </Button>
            </Box>

            {/* Right side - Decorative element */}
            <Box
              sx={{
                flex: 1,
                display: { xs: "none", md: "block" },
                position: "relative",
                height: "500px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "400px",
                  height: "400px",
                  backgroundColor: "#fff",
                  borderRadius: "24px",
                  boxShadow: "0 20px 40px rgba(65, 105, 225, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <img
                  src="/cube-tech.webp"
                  alt="Technological cube"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Testimonials testimonials={testimonials} />
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          py: 4,
          backgroundColor: "#fff",
          borderTop: "1px solid #eaeaea",
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="body2" color="text.secondary" align="center">
            {content.footer}
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainPage;
