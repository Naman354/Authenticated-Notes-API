const mongoose = require("mongoose");
require("dotenv").config();

async function db() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/myDatabase');
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); 
  }
}
module.exports = db;