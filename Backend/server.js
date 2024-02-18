require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const tdRoutes = require("./Routes.js");

const app = express();
const cors = require("cors");
app.use(cors());
mongoose
  .connect(process.env.MongoURI)
  .then(() => console.log("Connected to MongoDB 🚀"))
  .catch((err) => console.error("Failed to connect to MongoDB ❌", err));

app.use(express.json());

app.use("/td", tdRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 server running on PORT: ${PORT}`);
});
