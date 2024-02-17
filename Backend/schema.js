const mongoose = require("mongoose");

const tdSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  likes: {
    type: Number,
  },
  category:{
    type:String,
  },
  text: {
    type: String,
  }
});

const td = mongoose.model("tds", tdSchema);

module.exports = td;
