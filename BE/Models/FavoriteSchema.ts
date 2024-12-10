import mongoose, { Schema } from "mongoose";

export interface Book {
    isbn13: string;
    bookname: string;
    authors: string;
    publisher: string;
    publication_year: string;
    bookImageURL: string;
}

export interface Favorite {
    userId: string;
    book: Book;
}

const favoriteSchema: Schema = new mongoose.Schema<Favorite>({
    userId: { type: String, required: true }, 
    book: {
        isbn13: { type: String, required: true },
        bookname: String,
        authors: String,
        publisher: String,
        publication_year: String,
        bookImageURL: String,
    },
});

const Favorite = mongoose.model<Favorite & Document>(
    "Favorite",
    favoriteSchema
);

export default Favorite;
