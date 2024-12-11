import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BookDoc } from "@/types/booksType";
import { useFavoritesQuery } from "@/hooks/Queries/favorites/useFavoritesQuery";
import useRemoveFavoriteMutation from "@/hooks/Queries/favorites/useRemoveFavoriteMutation";
import useAddFavoriteMutation from "@/hooks/Queries/favorites/useAddFavoriteMutation";

interface FavoritesBtnProps {
    item: BookDoc;
}

const FavoriteBtn = ({ item }: FavoritesBtnProps) => {
    const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    const { data } = useFavoritesQuery(USER_INFO.id);
    const books = data?.book || [];

    const isFavorite = books.some((book: { isbn13: string; }) => book.isbn13 === item.isbn13);

    const addFavoriteMutation = useAddFavoriteMutation(USER_INFO.id);
    const removeFavoriteMutation = useRemoveFavoriteMutation(USER_INFO.id);

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isFavorite) {
            removeFavoriteMutation.mutate(item.isbn13);
        } else {
            addFavoriteMutation.mutate(item);
        }
    }; 

    return (
        <ButtonWrap onClick={handleFavorite}>
            {isFavorite ? <FavoriteButton /> : <UnFavoriteButton />}
        </ButtonWrap>
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
