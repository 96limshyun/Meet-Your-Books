import express from "express";
import dotenv from "dotenv";

dotenv.config();

const libraryOpenAPIRouter = express.Router();

libraryOpenAPIRouter.get("/libraryOpenAPI", async (req, res) => {
    try {
        const { path, query } = req.query;
        const url = `${process.env.LIBRARY_OPEN_API_URL}${path}?authKey=${process.env.LIBRARY_OPEN_API_AUTH_KEY}&${query}&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            res.status(400).json("잘못된 요청입니다.");
            return;
        }
        if (data.response?.error) {
            res.status(429).json({
                message: "요청 가능한 하루 제한 횟수를 초과했습니다. 내일 다시 시도해주세요.",
                error: data.response.error,
            });
            return;
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});

export default libraryOpenAPIRouter;
