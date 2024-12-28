import { StarOutlined, StarFilled } from "@ant-design/icons";
import { message, Spin } from "antd";
import React from "react";
import styled from "styled-components";

import useAddFavoriteMutation from "@/hooks/Queries/favorites/useAddFavoriteMutation";
import { useFavoritesQuery } from "@/hooks/Queries/favorites/useFavoritesQuery";
import useRemoveFavoriteMutation from "@/hooks/Queries/favorites/useRemoveFavoriteMutation";
import { BookDoc } from "@/types/booksType";

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

    const isPending =
        addFavoriteMutation.isPending || removeFavoriteMutation.isPending;

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!USER_INFO?.id) return message.error("로그인이 필요합니다.");
        if (isPending) return;

        if (isFavorite) {
            removeFavoriteMutation.mutate(item.isbn13);
        } else {
            addFavoriteMutation.mutate(item);
        }
    };

    return (
        <>
            {isPending ? (
                <Spin />
            ) : (
                <ButtonWrap onClick={handleFavorite}>
                    {isFavorite ? <FavoriteButton /> : <UnFavoriteButton />}
                </ButtonWrap>
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