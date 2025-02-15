const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
require("dotenv").config();

// Create a new instance of the GoogleGenerativeAI class
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: process.env.SYSTEM_INSTRUCTION,
});

// Make a decision (Rumor detection)
app.get("/make-decision", async (req, res) => {
    const prompt = req.query?.prompt;

    if (!prompt) {
        return res.status(400).send({
            error: "Prompt is required",
        });
    }

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [
                    {
                        text: "When I give you any text, you will decide the percentage of the rumor in the text",
                    },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Ok. Tell me." }],
            },
            {
                role: "user",
                parts: [{ text: "Dhaka is the capital of Bangladesh" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 0%" }],
            },
            {
                role: "user",
                parts: [{ text: "Human can fly without any machine" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 100%" }],
            },
            {
                role: "user",
                parts: [{ text: "Water boils at 100°C at sea level" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 0%" }],
            },
            {
                role: "user",
                parts: [{ text: "The moon landing was faked" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 100%" }],
            },
            {
                role: "user",
                parts: [{ text: "Eating carrots improves your night vision" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 90%" }],
            },
            {
                role: "user",
                parts: [{ text: "Aliens built the pyramids" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 100%" }],
            },
            {
                role: "user",
                parts: [
                    { text: "The Great Wall of China is visible from space" },
                ],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 95%" }],
            },
            {
                role: "user",
                parts: [{ text: "Honey never spoils" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 0%" }],
            },
            {
                role: "user",
                parts: [{ text: "The earth is flat" }],
            },
            {
                role: "model",
                parts: [{ text: "Rumor percentage: 100%" }],
            },
        ],
    });

    let result = await chat.sendMessage(prompt);

    res.send({
        prompt: prompt,
        response: result.response.text(),
    });
});

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
