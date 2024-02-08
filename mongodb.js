require("dotenv").config()
const mongoose=require('mongoose')
let db = process.env.MongoURI;
const Mongodb=async()=>{
    await mongoose.connect(db)
    console.log("Database successfully connected")
}
module.exports=Mongodb

