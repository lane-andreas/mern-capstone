require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const contentRoutes = require("./routes/content");
const testimonialRoutes = require("./routes/testimonials");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://mern-capstone.vercel.app"
        : "http://localhost:3000",
  })
);
app.use(express.json());

// Route Middleware
app.use("/api/auth", authRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/testimonials", testimonialRoutes);

// Basic route for testing
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // For Vercel deployment
