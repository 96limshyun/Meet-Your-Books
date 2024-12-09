import mongoose, { Schema } from "mongoose";

interface CommentsType {
    userid: string;
    username: string;
    content: string;
    timestamp: Date;
}

export interface ICommentGroup {
    _id: string; // isbn 코드를 줄거임
    comments: CommentsType[];
}

const CommentGroupSchema: Schema = new Schema<ICommentGroup>({
    _id: { type: String, required: true },
    comments: [
        {
            userid: { type: String, required: true },
            username: { type: String, required: true },
            content: { type: String, required: true },
            timestamp: { type: Date, required: true },
        },
    ],
});

const CommentGroup = mongoose.model<ICommentGroup>(
    "CommentGroup",
    CommentGroupSchema
);

export default CommentGroup;
