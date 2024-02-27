const mongoose = require("mongoose");

const tdSchema = new mongoose.Schema({
  type: {
    type: String,
    required:true
  },
  likes: {
    type: Number,
    default:0
  },
  category:{
    type:String,
    required:true
  },
  text: {
    type: String,
    required:true
  },
  created_by:{
    type:String,
    required:true
  },
});

const td = mongoose.model("tds", tdSchema);

module.exports = td;
