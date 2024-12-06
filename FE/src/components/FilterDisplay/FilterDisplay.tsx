import { Heading, Spacing } from "@components/Common";
import styled from "styled-components";

import { ORDER_ITEMS, SORT_ITEMS } from "@/constants";
import useBookStore from "@/stores/bookStore";

import DefaultFilterBox from "./DefaultFilterBox/DefaultFilterBox";
import KeywordFilter from "./KeywordFilter/KeywordFilter";

const FilterDisplay = () => {
    const { order, sort, setOrder, setSort, keywordFilter, setKeywordFilter } = useBookStore();

    const handleItemClick =
        (current: string, setState: (value: string) => void) =>
        (type: string) => setState(current === type ? "" : type);

        const handleKeywordClick = (keyword: string) => {
            const newKeywords = keywordFilter.includes(keyword)
                ? keywordFilter.filter(curK => curK !== keyword)
                : [...keywordFilter, keyword];
            setKeywordFilter(newKeywords)
        };
    return (
        <FilterContainer>
            <Heading fontSize="xl" fontWeight="bold">
                Filter Option
            </Heading>
            <Spacing height="md" />
            <FilterWrap>
                <KeywordFilter selectedKeywords={keywordFilter} handleKeywordClick={handleKeywordClick}/>
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
            </FilterWrap>
        </FilterContainer>
    );
};

export default FilterDisplay;

const FilterContainer = styled.div`
    max-width: 240px;
`;

const FilterWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
