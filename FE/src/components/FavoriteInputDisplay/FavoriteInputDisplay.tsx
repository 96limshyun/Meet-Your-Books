import { Heading, Spacing } from "@components/Common";
import React from "react";
import styled from "styled-components";

import FavoriteBookSearchInput, {
    FavoriteBookSearchInputProps,
} from "./FavoriteBookInput/FavoriteBookInput";

const FavoriteSearchSection: React.FC<FavoriteBookSearchInputProps> = ({
    setSearchText,
}) => {
    return (
        <InputContainer>
            <Heading fontSize="xl" fontWeight="bold">
                Favorite Books
            </Heading>
            <Spacing height="md" />
            <FavoriteBookSearchInput setSearchText={setSearchText} />
        </InputContainer>
    );
};

export default FavoriteSearchSection;

const InputContainer = styled.div`
    @media (max-width: 1000px) {
        display: none;
    }
`;
