const axios = require("axios");

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
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192", 
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data?.choices?.[0]?.message?.content ||
      "No response from Groq";

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Groq API Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while generating answer",
    });
  }
};

module.exports = { generateAnswer };
