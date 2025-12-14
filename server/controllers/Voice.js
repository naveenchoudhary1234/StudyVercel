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

    console.log(process.env.GROQ_API_KEY);

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile", 
        messages: [
          {
            role: "user",
            content: question,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
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

    if (error.response?.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key. Please check GROQ_API_KEY in environment variables.",
      });
    }

    if (error.response?.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: error.response?.data?.error?.message || error.message || "Something went wrong while generating answer",
    });
  }
};

module.exports = { generateAnswer };
