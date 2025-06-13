import { Heading } from "@components/ui";
import { ReactNode } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import styled from "styled-components";

interface HeaderProps {
    filterName: string;
    isOpen: boolean;
    onClick: () => void;
    children?: ReactNode;
}

const Header = ({ filterName, isOpen, children, onClick }: HeaderProps) => {
    return (
        <FilterHeader onClick={onClick}>
            <Heading fontWeight="bold" fontSize="lg">{filterName}</Heading>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            {children}
        </FilterHeader>
    );
};

export default Header;

const FilterHeader = styled.header`
    display: flex;
    justify-content: space-between;
    margin: 1rem;
    font-weight: 400;
    font-size: 0.9rem;
    cursor: pointer;
`;