import { Spacing } from "@components/Common";
import { BaseHeading } from "@components/ui";
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
            <BaseHeading fontSize="xl" fontWeight="bold">
                Search Books
            </BaseHeading>
            <Spacing height="md" />
            <FavoriteSearchInput setSearchText={setSearchText} />
        </InputContainer>
    );
};

export default FavoriteSearchSection;

const InputContainer = styled.div`
    max-width: 770px;
    margin-bottom: 1rem;
    @media (max-width: 1000px) {
        width: 100%;
    }
`;
