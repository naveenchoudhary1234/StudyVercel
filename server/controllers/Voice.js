const axios = require("axios");
require("dotenv").config();

const generateAnswer = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        contents: [
          {
            parts: [{ text: question }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY, // 🔐 ENV VARIABLE
        },
      }
    );

    const answer =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini";

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating answer",
    });
  }
};
module.exports = { generateAnswer };