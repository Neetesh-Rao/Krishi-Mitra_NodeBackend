


const express = require("express");
const router = express.Router();
const { getWeatherAlerts } = require("../controllers/weatherController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/alerts", authMiddleware, getWeatherAlerts); // ✅ secured route
module.exports = router;