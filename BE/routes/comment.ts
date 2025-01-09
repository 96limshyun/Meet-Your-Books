import express from "express";

import CommentGroup from "../Models/CommentSchema";

import { STATUS_CODES } from "../constants/statusCodes";
import { COMMENT_MESSAGES } from "../constants/message";

const commentRouter = express.Router();

commentRouter.get("/comments/:isbn", async (req, res) => {
    try {
        const { isbn } = req.params;
        const commentGroup = await CommentGroup.findById(isbn);
        if (!commentGroup) {
            res.status(STATUS_CODES.OK).json([]);
            return;
        }
        res.status(STATUS_CODES.OK).json(commentGroup?.comments);
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: COMMENT_MESSAGES.FETCH_ERROR,
        });
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
        res.status(STATUS_CODES.CREATED).json({ message: COMMENT_MESSAGES.ADD_SUCCESS });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: COMMENT_MESSAGES.ADD_ERROR });
    }
});

commentRouter.delete("/comments/:isbn/:_id", async (req, res) => {
    try {
        const { isbn, _id } = req.params;
        await CommentGroup.findOneAndUpdate(
            { _id: isbn },
            { $pull: { comments: { _id: _id } } }
        );

        res.status(STATUS_CODES.OK).json({ message: COMMENT_MESSAGES.DELETE_SUCCESS });
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: COMMENT_MESSAGES.DELETE_ERROR });
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
            res.status(STATUS_CODES.NOT_FOUND).json({ message: COMMENT_MESSAGES.NOT_FOUND });
            return;
        }
        comment.content = content;
        await commentGroup?.save();
        res.status(STATUS_CODES.OK).json({ message: COMMENT_MESSAGES.UPDATE_SUCCESS });
        
    } catch (error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            message: COMMENT_MESSAGES.UPDATE_ERROR,
        });
    }
});

export default commentRouter;
