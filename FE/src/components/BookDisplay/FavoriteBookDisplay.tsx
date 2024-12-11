import { useState } from "react";
import styled from "styled-components";

import { useFavoritesQuery } from "@/hooks/Queries/favorites/useFavoritesQuery";
import { BookDoc, ViewType } from "@/types/booksType";

import BookCard from "./BookCard/BookCard";
import ViewSelector from "./ViewSelector/ViewSelector";
import { HeaderInput } from "@components/Header";
import useBookStore from "@/stores/bookStore";

const FavoriteBookDisplay = () => {
    const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    const [viewMode, setViewMode] = useState<ViewType>("grid");
    const { searchText, setSearchText } = useBookStore();

    const { data, isLoading } = useFavoritesQuery(USER_INFO.id);
    if (isLoading) return <div>...loading</div>;

    const books = data?.book || [];

    const filteredBooks = books.filter((book: BookDoc) =>
        book.bookname.toLowerCase().includes(searchText)
    );

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const inputElement = e.currentTarget.querySelector(
            "input"
        ) as HTMLInputElement;
        setSearchText(inputElement.value);
    };

    return (
        <BookContainer>
            <ViewSelector viewMode={viewMode} setViewMode={setViewMode} />
            <Input>
                <HeaderInput
                    placeholder="내가 찜한 책 검색..."
                    customHandleSubmit={handleSearchSubmit}
                />
            </Input>
            {books.length === 0 ? (
                <EmptyContentText>찜한 책이 없습니다.</EmptyContentText>
            ) : searchText && filteredBooks.length === 0 ? (
                <EmptyContentText>검색 결과가 없습니다.</EmptyContentText>
            ) : (
                <BookWrap $viewMode={viewMode}>
                    {(searchText ? filteredBooks : books).map(
                        (book: BookDoc) => (
                            <BookCard
                                key={book.isbn13}
                                bookData={book}
                                viewMode={viewMode}
                            />
                        )
                    )}
                </BookWrap>
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

const EmptyContentText = styled.div`
    text-align: center;
    padding: 30px 0;
`;

const Input = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1.5rem 0.5rem;
    justify-content: flex-end;
`;
