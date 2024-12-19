import { StarOutlined, StarFilled } from "@ant-design/icons";
import { message } from "antd";
import React from "react";
import styled from "styled-components";

import useAddFavoriteMutation from "@/hooks/Queries/favorites/useAddFavoriteMutation";
import { useFavoritesQuery } from "@/hooks/Queries/favorites/useFavoritesQuery";
import useRemoveFavoriteMutation from "@/hooks/Queries/favorites/useRemoveFavoriteMutation";
import { BookDoc } from "@/types/booksType";

import LoadingBook from "../LoadingBook/LoadingBook";

interface FavoritesBtnProps {
    item: BookDoc;
}

const FavoriteBtn = ({ item }: FavoritesBtnProps) => {
    const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    const { data } = useFavoritesQuery(USER_INFO.id);
    const books = data?.book || [];
    const addFavoriteMutation = useAddFavoriteMutation(USER_INFO.id);
    const removeFavoriteMutation = useRemoveFavoriteMutation(USER_INFO.id);

    const isFavorite = books.some(
        (book: { isbn13: string }) => book.isbn13 === item.isbn13
    );

    const isPending = addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!USER_INFO?.id) return message.error("로그인이 필요합니다.")
        if (isPending) return;
        
        if (isFavorite) {
            removeFavoriteMutation.mutate(item.isbn13);
        } else {
            addFavoriteMutation.mutate(item);
        }
    };

    return (
        <>
            <ButtonWrap onClick={handleFavorite}>
                {isFavorite ? <FavoriteButton /> : <UnFavoriteButton />}
            </ButtonWrap>
            {isPending && (
                <Overlay>
                    <LoadingBook />
                </Overlay>
            )}
        </>
    );
};

export default FavoriteBtn;

const ButtonWrap = styled.div`
    font-size: 1.3rem;
`;

const UnFavoriteButton = styled(StarOutlined)`
    color: #fadb14;
`;
const FavoriteButton = styled(StarFilled)`
    color: #fadb14;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.7);
`;