import express from "express";
import Favorite from "../Models/FavoriteSchema";

import { STATUS_CODES } from "../constants/statusCodes";
import { FAVORITE_MESSAGES } from "../constants/message";

const favoriteRouter = express.Router();

favoriteRouter.get("/favorites", async (req, res) => {
    const userId = req.query.userId;
    try {
        let favorites = await Favorite.findOne({ userId });
        if (!favorites) {
            favorites = await Favorite.create({ userId, book: [] });
        }

        res.status(STATUS_CODES.OK).json(favorites);
    } catch (err) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: FAVORITE_MESSAGES.FETCH_ERROR });
    }
});

favoriteRouter.post("/favorites", async (req, res) => {
    const { userId, book } = req.body;
    try {
        const newFavorite = await Favorite.findOne({ userId });
        newFavorite?.book.push(book);
        await newFavorite?.save();
        res.status(STATUS_CODES.CREATED).json(newFavorite);
    } catch (err) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: FAVORITE_MESSAGES.ADD_ERROR });
    }
});

favoriteRouter.delete("/favorites", async (req, res) => {
    const { userId, isbn } = req.query;

    try {
        await Favorite.findOneAndUpdate(
            { userId },
            { $pull: { book: { isbn13: isbn } } }
        );
        res.status(STATUS_CODES.OK).json({ message: FAVORITE_MESSAGES.DELETE_SUCCESS });
    } catch (err) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: FAVORITE_MESSAGES.DELETE_ERROR });
    }
});

export default favoriteRouter;
