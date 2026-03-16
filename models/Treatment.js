const mongoose = require("mongoose");

const TreatmentSchema = new mongoose.Schema({
  disease_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Disease"
  },

  type: {
    type: String,
    enum: ["chemical", "organic", "biological"]
  },

  prevention: String,
  spray_interval: String
});

module.exports = mongoose.model("Treatment", TreatmentSchema);