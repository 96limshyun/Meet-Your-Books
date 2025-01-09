import mongoose, { Schema } from "mongoose";

interface CommentsType {
    _id?: string;
    userid: string;
    username: string;
    content: string;
    timestamp: Date;
}

export interface ICommentGroup {
    _id: string;
    comments: CommentsType[];
}

const CommentGroupSchema: Schema = new Schema<ICommentGroup>({
    _id: { type: String, required: true },
    comments: [
        {
            _id: { type: Schema.Types.ObjectId, required: true, auto: true },
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
