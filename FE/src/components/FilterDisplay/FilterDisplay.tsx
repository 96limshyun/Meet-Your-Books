import { Heading, Spacing } from "@components/Common";
import styled from "styled-components";

import DefaultFilterBox from "./DefaultFilterBox/DefaultFilterBox";

const FilterDisplay = () => {
    return (
        <FilterContainer>
            <Heading fontSize="xl" fontWeight="bold">Filter Option</Heading>
            <Spacing height="md"/>
            {/* <DefaultFilterBox filterType="정렬 순서" onClick={}/> */}
        </FilterContainer>
    );
};

export default FilterDisplay;

const FilterContainer = styled.div`
    max-width: 240px;
`;

