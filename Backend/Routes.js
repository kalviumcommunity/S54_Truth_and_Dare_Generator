const express = require("express");

const td = require("./schema.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await td.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tds = await td.findById(req.params.id);
    res.json({data : tds});
  } catch (err) {
    res.status(404).json({ error: "td not found" });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  //   res.json({ data: req.body });
  const tds = new td({
    type: req.body.type,
    likes: req.body.likes,
    category: req.body.category,
    text: req.body.text,
  });

  try {
    const savedTd = await tds.save();
    res.json(savedTd);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const tds = await td.findById(req.params.id);
    if (!tds) {
      return res.status(404).json({ error: "td not found" });
    }
    tds.likes = req.body.likes;
    const updatedTd = await tds.save();
    res.json(updatedTd);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTd = await td.findByIdAndDelete(req.params.id);
    if (!deletedTd) {
      return res.status(404).json({ error: "td not found" });
    }
    res.json({ message: "td deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
