const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.YOUTUBE_API_KEY);
console.log(`[GeminiService] Initializing with model: gemini-flash-latest`);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/**
 * Analyzes a list of comments using Gemini AI.
 * @param {string[]} comments The list of comments to analyze.
 * @returns {Promise<Object>} The analysis results.
 */
async function analyzeComments(comments) {
    const prompt = `
    Analyze the following list of user comments from a social media post/video.
    Cluster them into 'Common Pain Points', identify 'Frequent Questions', and generate 3 viral-style 'Hook Ideas' for a new video based on these comments.

    Return the result strictly as a structured JSON object with the following keys:
    - painPoints (array of strings)
    - frequentQuestions (array of strings)
    - hookIdeas (array of strings)

    Comments:
    ${comments.join("\n")}
  `;

    try {
        const result = await model.generateContent(prompt);
        if (!result || !result.response) {
            throw new Error("No response from Gemini AI.");
        }
        const response = await result.response;
        const text = response.text();

        // Clean up the response if it contains markdown code blocks
        const cleanedText = text.replace(/```json|```/g, "").trim();
        try {
            return JSON.parse(cleanedText);
        } catch (parseError) {
            console.error("Gemini JSON Parse Error:", parseError.message);
            console.error("Raw response:", text);
            throw new Error("Gemini returned invalid JSON.");
        }
    } catch (error) {
        console.error("Gemini API Error Detail:", error.message);

        // Handle Rate Limit (429) specifically
        if (error.status === 429 || error.message.includes("429")) {
            throw new Error("Gemini AI rate limit reached. Please wait a minute before trying again.");
        }

        if (error.stack) console.error(error.stack);
        throw new Error(`Gemini Analysis Failed: ${error.message}`);
    }
}

module.exports = {
    analyzeComments
};
