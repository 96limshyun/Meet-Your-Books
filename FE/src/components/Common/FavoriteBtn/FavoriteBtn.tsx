import { StarOutlined, StarFilled } from "@ant-design/icons";
import React, { useState } from "react";
import styled from "styled-components";

import { BookDoc } from "@/types/booksType";

interface FavoritesBtnProps {
    item: BookDoc;
}

const FavoriteBtn = ({ item }: FavoritesBtnProps) => {

    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <ButtonWrap onClick={handleFavorite}>
            {isFavorite ? <FavoriteButton /> : <UnFavoriteButton />}
        </ButtonWrap>
    );
};

export default FavoriteBtn;


const ButtonWrap = styled.div`
    font-size: 1.2rem;
`

const UnFavoriteButton = styled(StarOutlined)`
    color: #fadb14;
`;
const FavoriteButton = styled(StarFilled)`
    color: #fadb14;
`;
