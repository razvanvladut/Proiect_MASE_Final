const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Attraction", attractionSchema);
