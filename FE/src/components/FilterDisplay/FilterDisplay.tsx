import { Heading, Spacing } from "@components/Common";
import styled from "styled-components";

import { ORDER_ITEMS, SORT_ITEMS } from "@/constants";
import useBookStore from "@/stores/bookStore";

import DefaultFilterBox from "./DefaultFilterBox/DefaultFilterBox";

const FilterDisplay = () => {
    const { order, sort, setOrder, setSort } = useBookStore();

    const handleSortItemClick = (type: string) => {
        if (sort === type) {
            setSort("");
            return;
        }
        setSort(type);
    };
    const handleOrderItemClick = (type: string) => {
        if (order === type) {
            setOrder("");
            return;
        }
        setOrder(type);
    };

    return (
        <FilterContainer>
            <Heading fontSize="xl" fontWeight="bold">
                Filter Option
            </Heading>
            <Spacing height="md" />
            <FilterWrap>
                <DefaultFilterBox
                    curSelected={sort}
                    filterType="정렬 필드"
                    onClick={handleSortItemClick}
                    items={SORT_ITEMS}
                />
                <DefaultFilterBox
                    curSelected={order}
                    filterType="정렬 순서"
                    onClick={handleOrderItemClick}
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
