const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const { fetchComments } = require("./services/commentService");
const { analyzeComments } = require("./services/geminiService");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

/**
 * @api {post} /analyze-comments
 * @apiDescription Analyzes comments from a given URL.
 */
app.post("/analyze-comments", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required." });
    }

    try {
        // 1. Fetch comments via YouTube API
        const comments = await fetchComments(url);

        // 2. Analyze with Gemini AI
        const analysis = await analyzeComments(comments);

        // 3. Return results
        res.json({
            url,
            analysis,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("API Error:", error);
        res.status(500).json({ error: error.message || "An error occurred during analysis." });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
