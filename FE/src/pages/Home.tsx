import AIChatPopup from "@components/AIChatPopup/AIChatPopup";
import BookDisplay from "@components/BookDisplay/BookDisplay";
import FilterDisplay from "@components/FilterDisplay/FilterDisplay";
import styled from "styled-components";

const Home = () => {
    console.log("프론트엔드 cicd 테스트 1차")
    return (
        <HomeContainer>
            <FilterWrap>
                <FilterDisplay />
            </FilterWrap>
            <BookDisplay />
            <AIChatPopup />
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.main`
    max-width: 1044px;
    padding: 0 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    margin: 0px auto;
    @media (max-width: 1000px) {
        justify-content: center;
    }
`;

const FilterWrap = styled.div`
    @media (max-width: 1000px) {
        display: none;
    }
`;
