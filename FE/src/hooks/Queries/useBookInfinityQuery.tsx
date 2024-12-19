import { useInfiniteQuery } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import useBookStore from "@/stores/bookStore";
const BACK_END_API_URL = import.meta.env.VITE_BACK_END_API_URL;

const fetchPage = async (pageParam: number, queryString: string) => {
    const url = `${BACK_END_API_URL}libraryOpenAPI?path=srchBooks&query=${encodeURIComponent(`pageNo=${pageParam}&${queryString}`)}`
    const response = await fetch(url);

    if (!response.ok) {
        throw new HTTPError(response.status);
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
        throwOnError: true,
    });
};

export default useBookInfinityQuery;
