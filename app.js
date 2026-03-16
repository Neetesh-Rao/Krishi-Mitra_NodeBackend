// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns=require('dns');
const authRoutes=require('./routes/authRoutes');
const cropRoutes = require("./routes/cropRoutes");
const diseaseRoutes = require("./routes/diseaseRoutes");
const weatherRoutes = require("./routes/weatherRoutes");


const app = express();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/crop", cropRoutes);
app.use("/api/disease", diseaseRoutes);
app.use("/api/weather", weatherRoutes);

// Test route
app.get('/test', (req, res) => {
    res.send('Server running');
});

// MongoDB connection
// Fixed for Mongoose 7+
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));