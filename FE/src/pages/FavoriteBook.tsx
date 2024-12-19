import FavoriteBookDisplay from "@components/BookDisplay/FavoriteBookDisplay";
import FavoriteSearchSection from "@components/FavoriteSearchSection/FavoriteSearchSection";
import { useState } from "react";
import styled from "styled-components";

const FavoriteBook = () => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <HomeContainer>
            <ContentWrapper>
                <FavoriteSearchSection setSearchText={setSearchText} />
                <FavoriteBookDisplay searchText={searchText} />
            </ContentWrapper>
        </HomeContainer>
    );
};

export default FavoriteBook;

const HomeContainer = styled.main`
    max-width: 1044px;
    padding: 0 20px;
    margin: 0 auto;
`;

const ContentWrapper = styled.div`
    display: flex;
    gap: 2rem;

    @media (min-width: 1000px) {
        flex-direction: row;
    }

    @media (max-width: 1000px) {
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }
`;
