// controllers/weatherController.js
const { checkAndSendAlerts } = require("../services/weatherService");
const User = require("../models/User");

async function getWeatherAlerts(req, res) {
  try {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude required" });
    }

    // get logged-in user
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const alerts = await checkAndSendAlerts(latitude, longitude, user.email); // ✅ pass email
    res.json({ alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch weather alerts" });
  }
}

module.exports = { getWeatherAlerts };