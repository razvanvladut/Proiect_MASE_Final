const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  user: String,
  imageUrl: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Gallery", gallerySchema);
