import { APIClient } from "./APIClient";

export const booksAPI = new APIClient(import.meta.env.VITE_BOOK_API_URL)
export const authAPI = new APIClient(import.meta.env.VITE_BACK_END_API_URL + "kakaoAuth")
export const commentAPI = new APIClient(import.meta.env.VITE_BACK_END_API_URL + "comments/")
export const favoriteAPI = new APIClient(import.meta.env.VITE_BACK_END_API_URL + "favorites/")
export const regionAPI = new APIClient(import.meta.env.VITE_BACK_END_API_URL + "region?")