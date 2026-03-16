const Disease = require("../models/Disease");
const Treatment = require("../models/Treatment");
const Medicine = require("../models/Medicine");
const { predictDisease } = require("../services/aiService");

exports.detectDisease = async (req, res) => {

  try {

    const result = await predictDisease(req.file.path);

    const diseaseName = result.disease;

    const disease = await Disease.findOne({ name: diseaseName });

    const treatment = await Treatment.find({
      disease_id: disease._id
    });

    const medicines = await Medicine.find({
      treatment_id: treatment[0]._id
    });

    res.json({
      disease: diseaseName,
      confidence: result.confidence,
      treatment,
      medicines
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Detection failed" });
  }

};