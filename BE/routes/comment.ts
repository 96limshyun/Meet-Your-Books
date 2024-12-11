import express from "express";
import CommentGroup from "../Models/CommentSchema";
const commentRouter = express.Router();

commentRouter.get("/comments/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const commentGroup = await CommentGroup.findById(isbn);
        if (!commentGroup) {
            res.status(200).json([]);
        } else {
            res.status(200).json(commentGroup?.comments);
        }
    } catch (error) {
        res.status(500).json({ message: "댓글 조회 중 에러 발생" });
    }
});

commentRouter.post("/comments/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const { userid, username, content } = req.body;

        const newComment = {
            userid,
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
        res.status(201).json({ message: "댓글 추가 성공" });
    } catch (error) {
        res.status(400).json({ message: "댓글 추가 실패" });
    }
});

commentRouter.delete("/comments/:isbn/:_id", async (req, res) => {
    try {
        const { isbn, _id } = req.params;
        await CommentGroup.findOneAndUpdate(
            { _id: isbn },
            { $pull: { comments: { _id: _id } } }
        );

        res.status(200).json({ message: "댓글 삭제 성공" });
    } catch (error) {
        console.error("댓글 삭제 오류:", error);
        res.status(400).json({ message: "댓글 삭제 실패" });
    }
});

commentRouter.patch("/comments/:isbn/:_id", async (req, res) => {
    try {
        const { isbn, _id } = req.params;
        const { content } = req.body;

        const commentGroup = await CommentGroup.findById(isbn);

        const comment = commentGroup?.comments.find(
            (comment) => comment._id && comment._id.toString() === _id
        );
        if (!comment) {
            res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
        } else {
            comment.content = content;
            await commentGroup?.save();
            res.status(200).json({ message: "댓글 수정 성공" });
        }
    } catch (error) {
        console.error("댓글 수정 오류:", error);
        res.status(500).json({
            message: "댓글 수정 실패",
        });
    }
});

export default commentRouter;
