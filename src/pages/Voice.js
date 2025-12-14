import React, { useState } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";

function Voice() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  async function generateAnswer() {
    if (cooldown) {
      setAnswer("Please wait a moment before asking another question.");
      return;
    }
    if (!question.trim()) {
      setAnswer("Please enter a question!");
      return;
    }

    if (!token) {
      setAnswer("Please login to use this feature.");
      return;
    }

    setLoading(true);
    console.log("Generating answer...");

    try {
      const response = await axios.post(
  `${BASE_URL}/voice/generate-answer`,
  { question },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);


      if (response.data.success) {
        setAnswer(response.data.answer);
        setQuestion("");
        // Set cooldown for 2 seconds to prevent rapid requests
        setCooldown(true);
        setTimeout(() => setCooldown(false), 2000);
      } else {
        setAnswer("Failed to generate answer. Please try again.");
      }
    } catch (error) {
      console.error("Error generating answer:", error);
      if (error.response?.status === 429) {
        setAnswer("⏱️ Rate limit exceeded. Please wait 5-10 seconds and try again.");
      } else if (error.response?.data?.message) {
        setAnswer(error.response.data.message);
      } else {
        setAnswer("Something went wrong! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  function stopAnswer() {
    setQuestion("");
    setAnswer("");
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4 sm:p-6">
      <div className="bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-2xl space-y-4 sm:space-y-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">StudyNotion AI ChatBox</h1>

        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && generateAnswer()}
          disabled={loading}
          className="w-full p-3 sm:p-4 rounded-xl border-2 border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-500 bg-white text-sm sm:text-lg placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          placeholder="Ask me anything..."
          style={{ color: '#000000' }}
        />

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
          <button
            onClick={generateAnswer}
            disabled={loading || !question.trim() || cooldown}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all shadow-lg text-sm sm:text-base touch-padding"
          >
            {loading ? "Generating..." : cooldown ? "Please wait..." : "Generate Answer"}
          </button>
          <button
            onClick={stopAnswer}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all shadow-lg text-sm sm:text-base touch-padding"
          >
            Clear
          </button>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-purple-300 min-h-[200px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <textarea
              readOnly
              value={answer || "Your answer will appear here..."}
              rows={8}
              className="w-full h-full p-4 rounded-lg border-0 bg-white text-sm sm:text-base resize-none focus:outline-none placeholder-gray-400"
              style={{ color: '#000000' }}
            />
          )}
        </div>

        <div className="text-xs sm:text-sm text-gray-400 text-center">
          Powered by Google Gemini API | Login required to use this feature
        </div>
      </div>
    </div>
  );
}

export default Voice;
