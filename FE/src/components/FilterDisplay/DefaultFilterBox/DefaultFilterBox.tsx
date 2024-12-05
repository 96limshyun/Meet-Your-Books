import styled, { css } from "styled-components";

import useOpen from "@/hooks/Common/useOpen";

import Header from "../Header/Header";
import Item from "../Item/Item";

type ItemType = { name: string; value: string };

interface DefaultFilterBoxProps {
    curSelected: string;
    filterType: string;
    onClick: (type: string) => void;
    items: ItemType[];
}

const DefaultFilterBox = ({
    curSelected,
    filterType,
    onClick,
    items,
}: DefaultFilterBoxProps) => {
    const { isOpen, toggleOpen } = useOpen(true);
    return (
        <Container>
            <Header
                filterName={filterType}
                isOpen={isOpen}
                onClick={toggleOpen}
            />
            <ListWrap $isOpen={isOpen}>
                {items.map((curItem) => (
                    <Item
                        name={curItem.name}
                        value={curItem.value}
                        isChecked={curSelected === curItem.value}
                        onChange={onClick}
                    />
                ))}
            </ListWrap>
        </Container>
    );
};

export default DefaultFilterBox;

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
