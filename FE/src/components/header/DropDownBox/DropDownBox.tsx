import { Text } from "@components/Common";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

import { DROP_DOWN_ITEMS } from "@/constants";
import { DropDownItemType } from "@/types/dropDownType";

const DropDownBox = () => {
    const [isHover, setIsHover] = useState<boolean>(false);
    const [curSelect, setSelect] = useState<DropDownItemType>(
        DROP_DOWN_ITEMS[0]
    );

    const handleClickItem = (item: DropDownItemType) => {
        setSelect(item);
        setIsHover(false);
        console.log(item);
    };
    return (
        <DropdownContainer
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Text margin="auto">{curSelect.label}</Text>
            {isHover && (
                <DropdownList>
                    {DROP_DOWN_ITEMS.map((item) => (
                        <DropdownItem
                            key={item.value}
                            onClick={() => handleClickItem(item)}
                        >
                            {item.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownContainer>
    );
};

export default DropDownBox;

const DropdownContainer = styled.div`
    position: relative;
    width: 70px;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
`;

const dropdownAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const DropdownList = styled.ul`
    overflow: hidden;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: ${({ theme }) => theme.body};
    border: 1px solid #ccc;
    border-radius: 8px;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: white;
    animation: ${dropdownAnimation} 0.3s ease-out;
`;

const DropdownItem = styled.li`
    font-size: 1rem;
    padding: 8px;
    margin: auto;
    font-size: 0.9rem;
    cursor: pointer;
`;
