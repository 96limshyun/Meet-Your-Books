import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";

import { INITIAL_INDEX } from "../constants";
import { AI_DEFAULT_ROLE, MAX_TOKENS, TEMPERATURE } from "../constants/AIRole";
import { STATUS_CODES } from "../constants/statusCodes";
import { OPENAI_MESSAGES } from "../constants/message";
import { ChatCompletionMessageParam, BookRecommendation, LibraryBook } from "../types";

dotenv.config();

const openAIRouter = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_API_KEY!,
});

const fetchBookDetails = async (title: string, author: string) => {
    const url = `${process.env.LIBRARY_OPEN_API_URL}srchBooks?authKey=${process.env.LIBRARY_OPEN_API_AUTH_KEY}&title=${title}&author=${author}&exactMatch=true&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.response.docs;
};

const buildRecommendationTemplate = (book: BookRecommendation) => {
    return `
<div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin: 16px 0; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 12px;">${book.title}</h3>
    <p style="margin-top: 8px; font-size: 0.95em; color: #555;">
        <strong>저자:</strong> ${book.author}
    </p>
</div>`;
};

const buildBookTemplate = (book: LibraryBook) => {
    const { bookname, authors, bookImageURL, isbn13 } = book.doc;
    return `
<div style="border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin: 16px 0; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
    <h3 style="margin-bottom: 12px;">
        <a href="https://www.meetyourbooks.shop/book/${isbn13}" target="_blank" style="color: #1a73e8; text-decoration: none; font-size: 0.8rem;">
        ${bookname}
        </a>
    </h3>
    <div style="text-align: center;">
        <img src="${
            bookImageURL || "https://www.meetyourbooks.shop/images/errorImg.png"
        }" alt="${bookname}" style="width: 150px; height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;"/>
    </div>
    <p style="margin-top: 8px; font-size: 0.95em; color: #555;">
        <strong>저자:</strong> ${authors}
    </p>
</div>`
}

const getOpenAIResponse = async (message: string) => {
    const messages: ChatCompletionMessageParam[] = [
        { role: "system", content: AI_DEFAULT_ROLE },
        { role: "user", content: message },
    ];

    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
    });

    const parsedResponseContent = response.choices[INITIAL_INDEX]?.message?.content;
    const { intent, response: aiResponse, books } = JSON.parse(parsedResponseContent!);

    return { intent, aiResponse, books} 
}

openAIRouter.post("/openAI", async (req, res) => {
    const { message } = req.body;

    try {
        const { intent, aiResponse, books } = await getOpenAIResponse(message)

        if (intent === "general") {
            res.status(STATUS_CODES.OK).json({
                success: true,
                message: aiResponse,
            });
            return;
        }

        if (intent === "recommendation" && books.length > 0) {
            const searchResults = await Promise.all(
                books.map(async (book: BookRecommendation) => await fetchBookDetails(book.title, book.author)));

            const topResults = searchResults.flat().slice(0, 3);
            
            const markdownContent = topResults.length 
                ? topResults.map(buildBookTemplate).join("\n") 
                : books.map(buildRecommendationTemplate).join("\n");

            res.status(STATUS_CODES.OK).json({
                success: true,
                message: markdownContent,
            });
        }
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: OPENAI_MESSAGES.API_ERROR,
        });
    }
});

export default openAIRouter;
