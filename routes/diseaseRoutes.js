const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  detectDisease
} = require("../controllers/diseaseController");

router.post("/detect", upload.single("image"), detectDisease);

module.exports = router;