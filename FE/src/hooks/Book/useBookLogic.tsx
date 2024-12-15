
import { useEffect, useRef } from "react";

import useGenerateQuery from "./useGenerateQuery";
import useInfiniteScroll from "../Common/useInfiniteScroll";
import useBookInfinityQuery from "../Queries/useBookInfinityQuery";

const useBookLogic = () => {
    const queryString = useGenerateQuery();
    const observerRef = useRef<HTMLDivElement | null>(null)
    const {
        data: books,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading
    } = useBookInfinityQuery(queryString);
    const { observe } = useInfiniteScroll(fetchNextPage);

    const booksItem = books?.pages.flatMap((page) => page.data) || [];

    useEffect(() => {
        if(observerRef.current) observe(observerRef.current)
    }, [observerRef, observe])

    const isLastPage = books?.pages[books.pages.length-1].lastPage
    return {
        booksItem,
        hasNextPage,
        isFetchingNextPage,
        isLastPage,
        observerRef,
        isLoading
    };
};
export default useBookLogic;

