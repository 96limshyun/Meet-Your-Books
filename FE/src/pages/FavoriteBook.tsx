import FavoriteBookDisplay from "@components/BookDisplay/FavoriteBookDisplay";
import FavoriteSearchSection from "@components/FavoriteSearchSection/FavoriteSearchSection";
import { useState } from "react";
import styled from "styled-components";

const FavoriteBook = () => {
    const [searchText, setSearchText] = useState<string>("");

    return (
        <HomeContainer>
            <FavoriteSearchSection setSearchText={setSearchText} />
            <FavoriteBookDisplay searchText={searchText} />
        </HomeContainer>
    );
};

export default FavoriteBook;

const HomeContainer = styled.main`
    max-width: 1044px;
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin: 0px auto;
    @media (max-width: 1024px) {
        gap: 0;
    }
`;
