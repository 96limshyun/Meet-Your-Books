import { useQuery } from "@tanstack/react-query";

const AUTH_KEY = import.meta.env.VITE_LIBRARY_AUTH_KEY;
const API_URL = import.meta.env.VITE_BOOK_API_URL;

const defaultFetch = async (url: string) => {
    console.log(url)
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("에러");
    }
    return await response.json();
};

const useBookInfinityQuery = (key: string, path: string, query: string) => {
    return useQuery({
        queryKey: [key],
        queryFn: () =>
            defaultFetch(
                `${API_URL}${path}?authKey=${AUTH_KEY}&format=json&${query}`
            ),
        throwOnError: true,
    });
};

export default useBookInfinityQuery;
