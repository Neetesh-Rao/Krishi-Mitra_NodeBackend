// weatherAlerts.js
const axios = require("axios");
const nodemailer = require("nodemailer");

async function fetchWeatherForecast(lat, lon) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;
  const response = await axios.get(url);
  return response.data;
}

function generateAlerts(forecastData) {
  const alerts = [];

  forecastData.list.forEach((item) => {
    const temp = item.main.temp;
    const rain = item.rain ? item.rain["3h"] || 0 : 0;
    const dt = item.dt_txt;

    if (temp <= 0) alerts.push(`⚠ Frost expected on ${dt}`);
    if (rain >= 10) alerts.push(`⚠ Heavy rain expected on ${dt}. Avoid pesticide spraying.`);
    if (temp >= 40) alerts.push(`⚠ Heatwave expected on ${dt}. Water crops accordingly.`);
  });

  return alerts;
}

async function sendEmail(alerts, receiverEmail) {
  if (!alerts.length || !receiverEmail) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: receiverEmail, // ✅ dynamically set to logged-in user
    subject: "🌦️ Krishi Weather Alerts",
    text: alerts.join("\n"),
  };

  await transporter.sendMail(mailOptions);
}

async function checkAndSendAlerts(lat, lon, receiverEmail) {
  const forecastData = await fetchWeatherForecast(lat, lon);
  const alerts = generateAlerts(forecastData);
  await sendEmail(alerts, receiverEmail); // ✅ logged-in user email
  return alerts;
}

module.exports = { checkAndSendAlerts };