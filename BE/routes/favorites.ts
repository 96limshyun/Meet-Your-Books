import express from "express";
import Favorite from "../Models/FavoriteSchema";

const favoriteRouter = express.Router();

favoriteRouter.get("/favorites", async (req, res) => {
    const userId = req.query.userId;
    try {
        let favorites = await Favorite.findOne({ userId });
        if (!favorites) {
            favorites = await Favorite.create({ userId, book: [] });
        }
        console.log(favorites);
        res.status(200).json(favorites);
    } catch (err) {
        res.status(500).json({ error: "찜한 책 조회 중 에러 발생" });
    }
});

favoriteRouter.post("/favorites", async (req, res) => {
    const { userId, book } = req.body;
    try {
        const newFavorite = await Favorite.findOne({ userId });
        newFavorite?.book.push(book)
        await newFavorite?.save();
        res.status(201).json(newFavorite);
    } catch (err) {
        res.status(500).json({ error: "책 찜하기 실패" });
    }
});

favoriteRouter.delete("/favorites/:isbn", async (req, res) => {
    const { userId, isbn13 } = req.body;
    try {
        await Favorite.findOneAndDelete({ userId, "book.isbn13": isbn13 });
        res.status(200).json({ message: "내가 찜한 책에서 삭제 성공" });
    } catch (err) {
        res.status(500).json({ error: "내가 찜한 책에서 삭제 실패" });
    }
});

export default favoriteRouter;
