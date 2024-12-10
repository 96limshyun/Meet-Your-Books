import { useEffect, useState } from "react";
import styled from "styled-components";

import { BookDoc, ViewType } from "@/types/booksType";
import BookCard from "./BookCard/BookCard";
import ViewSelector from "./ViewSelector/ViewSelector";

const FavoriteBookDisplay = () => {
    const [favorites, setFavorites] = useState<BookDoc[]>([]);
    const [viewMode, setViewMode] = useState<ViewType>("grid");

    // useEffect(() => {
    //     const storedFavorites = JSON.parse(
    //         localStorage.getItem("favorites") || "[]"
    //     );
    //     setFavorites(storedFavorites);
    // }, []); 

    const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_BACK_END_API_URL + `favorites?userId=${USER_INFO.id}`);
                if (!response.ok) {
                    throw new Error("네트워크 응답이 좋지 않습니다.");
                }
                const data = await response.json();
                setFavorites(data.map((fav: any) => fav.book));
            } catch (err) {
                console.log("🚀 USER_INFO.id:", USER_INFO.id);
                console.error("찜한 책을 가져오는 중 오류 발생:", err);
            }
        };

        fetchFavorites();
    }, [USER_INFO.id]);

    return (
        <BookContainer>
            <ViewSelector viewMode={viewMode} setViewMode={setViewMode} />
            {favorites.length > 0 ? (
                <BookWrap $viewMode={viewMode}>
                    {favorites.map((book) => (
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
