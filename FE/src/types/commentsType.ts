export interface CommentType {
    content: string;
    timestamp: Date;
    userid: string;
    username: string;
    _id: string;
}

export interface CommentPayload {
    userid: string;
    username: string;
    content: string;
    _id?: string;
}