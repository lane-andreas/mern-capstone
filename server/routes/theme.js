const router = require("express").Router();
const auth = require("../middleware/auth");

let themeSettings = {
  primaryColor: "#4169E1",
  backgroundColor: "#F5F7FF",
};

router.get("/", async (req, res) => {
  try {
    res.json(themeSettings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const { primaryColor, backgroundColor } = req.body;
    themeSettings = {
      ...themeSettings,
      primaryColor: primaryColor || themeSettings.primaryColor,
      backgroundColor: backgroundColor || themeSettings.backgroundColor,
    };
    res.json(themeSettings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
