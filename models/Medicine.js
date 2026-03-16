const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  treatment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatment"
  },

  name: String,
  dose: String,
  method: String,
  company: String
});

module.exports = mongoose.model("Medicine", MedicineSchema);