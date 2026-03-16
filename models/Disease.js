const mongoose = require("mongoose");

const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },

  crop_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Crop"
  },

  symptoms: [String],
  cause: String,
  image: String
});

module.exports = mongoose.model("Disease", DiseaseSchema);