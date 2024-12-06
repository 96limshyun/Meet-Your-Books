import { useInfiniteQuery } from "@tanstack/react-query";

import useBookStore from "@/stores/bookStore";

const AUTH_KEY = import.meta.env.VITE_LIBRARY_AUTH_KEY;
const API_URL = import.meta.env.VITE_BOOK_API_URL;

const fetchPage = async (pageParam: number, queryString: string) => {
    const response = await fetch(
        `${API_URL}srchBooks?authKey=${AUTH_KEY}&format=json&pageNo=${pageParam}&${queryString}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    const { pageNo, pageSize } = data.response.request;
    const totalItems = data.response.numFound;
    const totalPages = Math.ceil(totalItems / pageSize);

    return {
        data: data.response.docs,
        nextCursor: pageNo < totalPages ? pageNo + 1 : undefined,
        prevCursor: pageNo > 1 ? pageNo - 1 : undefined,
        lastPage: !totalItems ? true : pageNo === totalPages,
        totalItems: totalItems
    };
};

const useBookInfinityQuery = (queryString: string) => {
    const { page } = useBookStore();

    return useInfiniteQuery({
        queryKey: ["books", queryString],
        queryFn: ({ pageParam = page }) => fetchPage(pageParam, queryString),
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        getPreviousPageParam: (firstPage) => firstPage.prevCursor,
        initialPageParam: page,
    });
};

export default useBookInfinityQuery;
