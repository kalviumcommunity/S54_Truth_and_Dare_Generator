const express = require("express");
const bcrypt = require("bcryptjs");
const td = require("./schema.js");
const TDvalidate = require("./TDvalidate.js");
const Users = require("./UserSchema.js");
const uservalidate = require("./UserValidate.js");
const jwt = require("jsonwebtoken");

const router = express.Router();

const validateTD = (req, res, next) => {
  let { error } = TDvalidate.validate(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
  } else {
    next();
  }
};
const validateUser = (req, res, next) => {
  let { error } = uservalidate.validate(req.body);
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
    res.json({ data: tds });
  } catch (err) {
    res.status(404).json({ error: "td not found" });
  }
});

router.post("/", validateTD, async (req, res) => {
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
// router.post("/register", async (req, res) => {
//   console.log(req.body);
//   try {
//     const newuser = await Users.create(req.body);
//     res.status(200).send(newuser);
//   } catch (err) {
//     console.error(err);
//     res.send(" error " + err);
//   }
// });
router.post("/register", validateUser, async (req, res) => {
  try {
    const olduser = await Users.findOne({ email: req.body.email });
    if (olduser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });
      const saveduser = await user.save();
      res.json(saveduser);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.json({ status: "error", message: "User not Found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payload = { userId: user._id, email };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res
        .status(201)
        .json({ message: "Login successful", username: user.name, token });
    } else {
      res.json({ status: "error", message: "Invalid Password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", error: "Internal Server Error" });
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
