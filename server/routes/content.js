const router = require("express").Router();
const Content = require("../models/Content");
const auth = require("../middleware/auth");

// Get all content
router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update content (protected route)
router.put("/:section", auth, async (req, res) => {
  try {
    const { content } = req.body;
    const section = req.params.section;

    let contentDoc = await Content.findOne({ section });

    if (contentDoc) {
      contentDoc.content = content;
      contentDoc.lastUpdated = Date.now();
      await contentDoc.save();
    } else {
      contentDoc = new Content({
        section,
        content,
      });
      await contentDoc.save();
    }

    res.json(contentDoc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
