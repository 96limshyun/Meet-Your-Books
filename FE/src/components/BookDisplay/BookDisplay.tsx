import { Spacing } from "@components/Common";
import LoadingBook from "@components/Common/LoadingBook/LoadingBook";
import LoadingSpin from "@components/Common/Spin/Spin";
import { useState } from "react";
import styled from "styled-components";

import useBookLogic from "@/hooks/Book/useBookLogic";
import { Doc, ViewType } from "@/types/booksType";

import BookCard from "./BookCard/BookCard";
import ViewSelector from "./ViewSelector/ViewSelector";

const BookDisplay = () => {
    const [viewMode, setViewMode] = useState<ViewType>("grid");
    const {
        booksItem,
        hasNextPage,
        isFetchingNextPage,
        isLastPage,
        observerRef,
        isLoading,
    } = useBookLogic();

    if (isLoading) {
        return (
            <BookContainer>
                <LoadingBook/>
            </BookContainer>
        );
    }
    const isLoadingNextPage = isFetchingNextPage && !isLastPage
    const isEmptyContent = booksItem.length === 0 && !isFetchingNextPage
    const isLastPageView = !hasNextPage && !isEmptyContent;

    return (
        <BookContainer>
            <ViewSelector
                title="Books"
                viewMode={viewMode}
                setViewMode={setViewMode}
            />
            <Spacing height="md" />
            <BookWrap $viewMode={viewMode}>
                {booksItem.map((book: Doc, index: number) => (
                    <BookCard
                        key={`${book.doc.isbn13}-${index}`}
                        bookData={book.doc}
                        viewMode={viewMode}
                    />
                ))}
            </BookWrap>
            {isLoadingNextPage && <LoadingSpin />}
            {isEmptyContent && <EmptyContentText>검색 결과가 없습니다.</EmptyContentText>}
            {isLastPageView && <LastPageView>마지막 페이지 입니다.</LastPageView>}
            {!isEmptyContent && hasNextPage && <div ref={observerRef} style={{ height: "10px" }} />}
            <Spacing height="xl" />
        </BookContainer>
    );
};

export default BookDisplay;

const BookContainer = styled.div`
    width: 770px;
`;

const BookWrap = styled.div<{ $viewMode: ViewType }>`
    display: ${({ $viewMode }) => ($viewMode === "grid" ? "grid" : "block")};
    grid-template-columns: ${({ $viewMode }) =>
        $viewMode === "grid"
            ? "repeat(auto-fill, minmax(150px, 1fr))"
            : "none"};
    gap: 15px;
    justify-content: center;
    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }
`;

const LastPageView = styled.div`
    margin: 30px;
    text-align: center;
`;

const EmptyContentText = styled.div`
    text-align: center;
    padding: 30px 0;
`;
