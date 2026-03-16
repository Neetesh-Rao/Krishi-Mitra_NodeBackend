const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

exports.predictDisease = async (imagePath) => {

  const formData = new FormData();
  formData.append("file", fs.createReadStream(imagePath));

  const response = await axios.post(
    "http://127.0.0.1:8000/predict-disease",
    formData,
    { headers: formData.getHeaders() }
  );

  return response.data;
};
exports.predictCrop = async (data) => {
  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/predict-crop",
      {
        N: data.N,
        P: data.P,
        K: data.K,
        temperature: data.temperature,
        humidity: data.humidity,
        ph: data.ph,
        rainfall: data.rainfall
      }
    );

    return response.data;

  } catch (error) {
    console.error("AI Server Error:", error.message);
    throw new Error("Crop prediction failed");
  }
};
