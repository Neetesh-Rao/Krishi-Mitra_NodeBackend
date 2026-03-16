const express = require("express");
const router = express.Router();

const cropController = require("../controllers/cropController");

router.post("/recommend", cropController.getCropRecommendation);

module.exports = router;