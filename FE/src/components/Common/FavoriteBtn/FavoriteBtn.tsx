import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { BookDoc } from "@/types/booksType";

interface FavoritesBtnProps {
    item: BookDoc;
}

const FavoriteBtn = ({ item }: FavoritesBtnProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFavorite(
            favorites.some((book: BookDoc) => book.isbn13 === item.isbn13)
        );
    }, [item]);

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

        if (isFavorite) {
            const updatedFavorites = favorites.filter((book: BookDoc) => book.isbn13 !== item.isbn13);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
            favorites.push(item);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
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
