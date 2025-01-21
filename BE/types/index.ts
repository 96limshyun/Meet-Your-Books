export type Role = "system" | "user" | "assistant";

export interface ChatCompletionMessageParam {
    role: Role;
    content: string;
}

export interface Data {
    grant_type: string;
    client_id: string;
    code: string;
    [key: string]: string;
}

export interface BookRecommendation {
    title: string;
    author: string;
}

export interface LibraryBook {
    doc: {
        bookname: string;
        authors: string;
        bookImageURL: string;
        isbn13: string;
    };
}