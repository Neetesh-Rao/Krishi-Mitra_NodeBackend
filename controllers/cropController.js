const aiService = require("../services/aiService");

exports.getCropRecommendation = async (req, res) => {

  try {

    const result = await aiService.predictCrop(req.body);

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};