import { useState } from "react";
import styled from "styled-components";

import { useFavoritesQuery } from "@/hooks/Queries/favorites/useFavoritesQuery";
import { BookDoc, ViewType } from "@/types/booksType";

import BookCard from "./BookCard/BookCard";
import ViewSelector from "./ViewSelector/ViewSelector";

const FavoriteBookDisplay = () => {
    const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    
    const [viewMode, setViewMode] = useState<ViewType>("grid");
    const { data, isLoading } = useFavoritesQuery(USER_INFO.id);
    console.log("🚀 ~ FavoriteBookDisplay ~ data:", data)
    if (isLoading) return <div>...loading</div>;
    
    const books = data?.book || [];
    
    return (
        <BookContainer>
            <ViewSelector viewMode={viewMode} setViewMode={setViewMode} />
            {books.length > 0 ? (
                <BookWrap $viewMode={viewMode}>
                    {books.map((book: BookDoc) => (
                        <BookCard
                            key={book.isbn13}
                            bookData={book}
                            viewMode={viewMode}
                        />
                    ))}
                </BookWrap>
            ) : (
                <EmptyMessage>찜한 책이 없습니다.</EmptyMessage>
            )}
        </BookContainer>
    );
};

export default FavoriteBookDisplay;

const BookContainer = styled.div`
    max-width: 970px;
    margin: 0 auto;
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

const EmptyMessage = styled.div`
    text-align: center;
    padding: 30px 0;
    font-size: 1.2rem;
    color: gray;
`;
