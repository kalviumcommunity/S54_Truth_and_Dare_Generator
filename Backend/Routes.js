const express = require("express");

const td = require("./schema.js");
const TDvalidate = require("./TDvalidate.js");

const router = express.Router();

const validateTD = (req, res, next) => {
  let { error } = TDvalidate.validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  } else {
    next();
  }
};

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

router.post("/",validateTD, async (req, res) => {
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
    const tdItem = await td.findById(req.params.id);
    if (!tdItem) {
      return res.status(404).json({ error: "td not found" });
    }
    tdItem.likes += 1;
    const updatedTd = await tdItem.save();
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
