import express from "express";
import CommentGroup from "../Models/CommentSchema";

const commentRouter = express.Router();

commentRouter.get("/comments/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const commentGroup = await CommentGroup.findById(isbn);

        res.status(200).json(commentGroup?.comments);
    } catch (error) {
        res.status(500).json({ message: "댓글 조회 중 에러 발생" });
    }
});

commentRouter.post("/comments/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const { username, content } = req.body;

        const newComment = {
            username,
            content,
            timestamp: new Date(),
        };

        const commentGroup = await CommentGroup.findById(isbn);
        if (commentGroup) {
            commentGroup.comments.push(newComment);
            await commentGroup?.save();
        } else {
            await CommentGroup.create({ _id: isbn, comments: [newComment] });
        }
        res.status(201).json({message: "댓글 추가 성공"})
    } catch (error) {
        res.status(400).json({message: "댓글 추가 실패"})
    }
});

export default commentRouter;
