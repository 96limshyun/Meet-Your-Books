import { Spacing } from "@components/Common";
import { BaseHeading } from "@components/ui";
import styled from "styled-components";

import { ORDER_ITEMS, SORT_ITEMS } from "@/constants";
import useBookStore from "@/stores/bookStore";

import DefaultFilterBox from "./DefaultFilterBox/DefaultFilterBox";
import KeywordFilter from "./KeywordFilter/KeywordFilter";

const FilterDisplay = () => {
    const { order, sort, setOrder, setSort, keyword, setKeyword } =
        useBookStore();

    const handleItemClick =
        (current: string, setState: (value: string) => void) =>
        (type: string) =>
            setState(current === type ? "" : type);

    const handleKeywordClick = (keywordValue: string) => {
        const newKeywords = keyword.includes(keywordValue)
            ? keyword.filter((curK) => curK !== keywordValue)
            : [...keyword, keywordValue];
        setKeyword(newKeywords);
    };
    return (
        <FilterContainer>
            <BaseHeading fontSize="xl" fontWeight="bold">
                Filter Option
            </BaseHeading>
            <Spacing height="md" />
            <FilterWrap>
                <DefaultFilterBox
                    curSelected={sort}
                    filterType="정렬 필드"
                    onClick={handleItemClick(sort, setSort)}
                    items={SORT_ITEMS}
                />
                <DefaultFilterBox
                    curSelected={order}
                    filterType="정렬 순서"
                    onClick={handleItemClick(order, setOrder)}
                    items={ORDER_ITEMS}
                />
                <KeywordFilter
                    selectedKeywords={keyword}
                    handleKeywordClick={handleKeywordClick}
                />
            </FilterWrap>
        </FilterContainer>
    );
};

export default FilterDisplay;

const FilterContainer = styled.div`
    max-width: 200px;
`;

const FilterWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
