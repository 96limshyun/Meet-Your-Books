import { APIClient } from "./APIClient";

export const booksAPI = new APIClient(import.meta.env.VITE_BOOK_API_URL)
export const authAPI = new APIClient(import.meta.env.VITE_BACK_END_API_URL + "kakaoAuth")
