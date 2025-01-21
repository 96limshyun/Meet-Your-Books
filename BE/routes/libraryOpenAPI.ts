import express from "express";
import dotenv from "dotenv";

import { STATUS_CODES } from "../constants/statusCodes";
import { LIBRARY_API_MESSAGES } from "../constants/message";

dotenv.config();

const libraryOpenAPIRouter = express.Router();

libraryOpenAPIRouter.get("/libraryOpenAPI", async (req, res) => {
    try {
        const { path, query } = req.query;
        const url = `${process.env.LIBRARY_OPEN_API_URL}${path}?authKey=${process.env.LIBRARY_OPEN_API_AUTH_KEY}&${query}&format=json`;
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            res.status(STATUS_CODES.BAD_REQUEST).json(LIBRARY_API_MESSAGES.BAD_REQUEST);
            return;
        }
        if (data.response?.error) {
            res.status(STATUS_CODES.TOO_MANY_REQUESTS).json({
                message: LIBRARY_API_MESSAGES.RATE_LIMIT_EXCEEDED,
                error: data.response.error,
            });
            return;
        }
        res.status(STATUS_CODES.OK).json(data);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    }
});

export default libraryOpenAPIRouter;
