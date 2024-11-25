const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email });

    // Check if email matches admin email
    if (email !== process.env.ADMIN_EMAIL) {
      console.log("Invalid email");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password matches admin password
    if (password !== process.env.ADMIN_PASSWORD) {
      console.log("Invalid password");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create token
    const token = jwt.sign({ id: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { email },
    });
  } catch (err) {
    console.error("Server login error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Verify token route
router.post("/verify", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    res.json(true);
  } catch (err) {
    res.json(false);
  }
});

module.exports = router;
