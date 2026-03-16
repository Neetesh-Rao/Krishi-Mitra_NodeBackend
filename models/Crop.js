const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientific_name: String,
  description: String,
  image: String
});

module.exports = mongoose.model("Crop", CropSchema);