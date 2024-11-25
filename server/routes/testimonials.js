const router = require("express").Router();
const Testimonial = require("../models/Testimonial");
const auth = require("../middleware/auth");

// Get all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new testimonial (protected)
router.post("/", auth, async (req, res) => {
  const testimonial = new Testimonial({
    name: req.body.name,
    role: req.body.role,
    content: req.body.content,
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete testimonial (protected)
router.delete("/:id", auth, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
