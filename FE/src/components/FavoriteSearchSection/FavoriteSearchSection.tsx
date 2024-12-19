import { Heading, Spacing } from "@components/Common";
import React from "react";
import styled from "styled-components";

import FavoriteSearchInput, {
    FavoriteSearchInputProps,
} from "./FavoriteSearchInput/FavoriteSearchInput";

const FavoriteSearchSection: React.FC<FavoriteSearchInputProps> = ({
    setSearchText,
}) => {
    return (
        <InputContainer>
            <Heading fontSize="xl" fontWeight="bold">
                Favorite Books
            </Heading>
            <Spacing height="md" />
            <FavoriteSearchInput setSearchText={setSearchText} />
        </InputContainer>
    );
};

export default FavoriteSearchSection;

const InputContainer = styled.div`
    margin-bottom: 1rem;
`;
