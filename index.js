const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// Create a new instance of the GoogleGenerativeAI class
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

// Test the AI model
app.get("/text", async (req, res) => {
    const prompt = req.query?.prompt;

    if (!prompt) {
        return res.status(400).send({
            error: "Prompt is required",
        });
    }

    const result = await model.generateContent(prompt);

    res.send({
        prompt: prompt,
        response: result.response.text(),
    });
});

// Server status
app.get("/", (req, res) => {
    res.send({
        msg: "Crack the power of AI server is running",
    });
});

// Port listener
app.listen(port, () => {
    console.log("Ai is running on port: " + port);
});
