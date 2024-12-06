
import { useCallback } from "react";

import useGenerateQuery from "./useGenerateQuery";
import useInfiniteScroll from "../Common/useInfiniteScroll";
import useBookInfinityQuery from "../Queries/useBookInfinityQuery";

const useBookLogic = () => {
    const queryString = useGenerateQuery();
    const {
        data: books,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useBookInfinityQuery(queryString);
    const { observe } = useInfiniteScroll(fetchNextPage);

    const observerRefCallback = useCallback((node: HTMLDivElement) => {
        if (node) observe(node);
    }, [observe]);

    const booksItem = books?.pages.flatMap((page) => page.data) || [];
    const isLastPage = books?.pages[books.pages.length-1].lastPage
    return {
        booksItem,
        hasNextPage,
        isFetchingNextPage,
        isLastPage,
        observerRefCallback
    };
};

export default useBookLogic;
