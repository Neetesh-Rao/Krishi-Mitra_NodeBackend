require("dotenv").config();

const mongoose = require("mongoose");

const Disease = require("../models/Disease");
const Treatment = require("../models/Treatment");
const Medicine = require("../models/Medicine");
const dns=require('dns');
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const seedData = async () => {

  try {

    // CONNECT DATABASE
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");

    console.log("Deleting old data...");

    await Disease.deleteMany({});
    await Treatment.deleteMany({});
    await Medicine.deleteMany({});

    console.log("Adding diseases...");

    const healthy = await Disease.create({
      name: "Healthy",
      symptoms: ["No disease symptoms"],
      cause: "Plant is healthy"
    });

    const leafBlight = await Disease.create({
      name: "Leaf Blight",
      symptoms: ["Brown spots on leaves"],
      cause: "Fungal infection"
    });

    const powdery = await Disease.create({
      name: "Powdery Mildew",
      symptoms: ["White powder on leaves"],
      cause: "Fungal infection"
    });

    const rust = await Disease.create({
      name: "Rust",
      symptoms: ["Orange spots on leaves"],
      cause: "Fungal infection"
    });

    console.log("Adding treatments...");

    const leafBlightTreatment = await Treatment.create({
      disease_id: leafBlight._id,
      type: "chemical",
      prevention: "Avoid overhead irrigation",
      spray_interval: "7 days"
    });

    const powderyTreatment = await Treatment.create({
      disease_id: powdery._id,
      type: "chemical",
      prevention: "Improve air circulation",
      spray_interval: "7 days"
    });

    const rustTreatment = await Treatment.create({
      disease_id: rust._id,
      type: "chemical",
      prevention: "Remove infected leaves",
      spray_interval: "10 days"
    });

    console.log("Adding medicines...");

    await Medicine.insertMany([
      {
        treatment_id: leafBlightTreatment._id,
        name: "Mancozeb",
        dose: "2g per liter water",
        method: "Foliar spray"
      },
      {
        treatment_id: powderyTreatment._id,
        name: "Sulfur Fungicide",
        dose: "3g per liter water",
        method: "Foliar spray"
      },
      {
        treatment_id: rustTreatment._id,
        name: "Propiconazole",
        dose: "1ml per liter water",
        method: "Foliar spray"
      }
    ]);

    console.log("✅ Seed data inserted successfully");

    process.exit();

  } catch (error) {

    console.error("❌ Error:", error);
    process.exit(1);

  }

};

seedData();