import styled, { css } from "styled-components";

import useOpen from "@/hooks/Common/useOpen";
import useGetQuery from "@/hooks/Queries/useGetQuery";
import { Keyword } from "@/types/keywordType";

import Header from "../Header/Header";
import Item from "../Item/Item";
interface KeywordFilterProps {
    selectedKeywords: string[];
    handleKeywordClick: (keywordValue: string) => void;
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;

const KeywordFilter = ({
    selectedKeywords,
    handleKeywordClick,
}: KeywordFilterProps) => {
    const { data } = useGetQuery(
        "monthlyKeywords",
        "keywords",
        `&${year}-${month}`
    );
    const { isOpen, toggleOpen } = useOpen(true);

    return (
        <Container>
            <Header
                filterName="키워드 필터"
                isOpen={isOpen}
                onClick={toggleOpen}
            />
            <ListWrap $isOpen={isOpen}>
                {data && data?.response?.keywords.map((curKeyword: Keyword) => (
                    <Item
                        key={`${curKeyword.keyword.word}-${curKeyword.keyword.weight}`}
                        name={curKeyword.keyword.word}
                        value={curKeyword.keyword.word}
                        isChecked={selectedKeywords.includes(curKeyword.keyword.word)}
                        onChange={handleKeywordClick}
                    />
                ))}
            </ListWrap>
        </Container>
    );
};

export default KeywordFilter;

const Container = styled.div`
    min-width: 240px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
`;

const ListWrap = styled.div<{ $isOpen: boolean }>`
    font-weight: 400;
    font-size: 0.9rem;
    overflow-y: auto;
    padding: 1rem;
    border-top: ${({ $isOpen }) =>
        $isOpen ? "1px solid var(--border-color)" : "none"};

    ${({ $isOpen }) =>
        $isOpen
            ? css`
                  display: block;
                  max-height: 20rem;
                  padding: 1rem;
                  transform: translateY(0);
                  transition: max-height 0.3s ease-out, padding 0.3s ease-out,
                      transform 0.3s ease-out;
              `
            : css`
                  max-height: 0;
                  padding: 0 1rem;
                  transform: translateY(-10px);
                  transition: max-height 0.3s ease-out, padding 0.3s ease-out,
                      transform 0.3s ease-out;
                  transition-delay: 0s, 0s, 0s, 0.3s;
              `}
    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--border-color);
        border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;
