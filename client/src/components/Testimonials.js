import React from "react";
import { Box, Typography, Container, Grid, Paper } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

const Testimonials = ({ testimonials }) => {
  return (
    <Box sx={{ py: 8, bgcolor: "#F5F7FF" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{ mb: 6, fontWeight: "bold" }}
        >
          What Our Clients Say
        </Typography>

        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} md={4} key={testimonial._id}>
              <Paper
                sx={{
                  p: 4,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  borderRadius: 2,
                }}
                elevation={0}
              >
                <FormatQuoteIcon
                  sx={{
                    fontSize: 40,
                    color: "#4169E1",
                    mb: 2,
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    flex: 1,
                    color: "#666",
                    lineHeight: 1.6,
                  }}
                >
                  {testimonial.content}
                </Typography>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Testimonials;
