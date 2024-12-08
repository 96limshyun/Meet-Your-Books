import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import { AI_ROLE, MAX_TOKENS, TEMPERATURE, INITIAL_INDEX } from "../constants";
import {ChatCompletionMessageParam} from "../types"
dotenv.config();

const openAIRouter = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY!,
});

openAIRouter.post("/openAI", async (req, res) => {
    const { message } = req.body;

    const messages: ChatCompletionMessageParam[] = [
        {
            role: "system",
            content: AI_ROLE,
        },
        { role: "user", content: message },
    ];

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: MAX_TOKENS,
            temperature: TEMPERATURE,
        });

        res.status(200).json({
            success: true,
            message: response.choices[INITIAL_INDEX].message.content,
        });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to communicate with OpenAI API.",
        });
    }
});

export default openAIRouter;
