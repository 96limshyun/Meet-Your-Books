import { Text } from "@components/Common";
import { useRef } from "react";
import styled, { keyframes } from "styled-components";

import useOnClickOutside from "@/hooks/Common/useOnClickOutside";
import useOpen from "@/hooks/Common/useOpen";
import { RegionType } from "@/types/regionType";
interface RegionSelectBoxProps {
    regionBoxName: string;
    regions: { code: string; name: string }[];
    curSelected: string;
    onClick: (region: RegionType) => void;
}
const RegionSelectBox = ({
    regionBoxName,
    regions,
    curSelected,
    onClick
}: RegionSelectBoxProps) => {
    const inSideRef = useRef(null);
    const { isOpen, toggleOpen, setOpen } = useOpen();
    useOnClickOutside(inSideRef, () => setOpen(false))
    return (
        <>
            <LabelStyled>{regionBoxName}</LabelStyled>
            <DropdownContainer onClick={toggleOpen} ref={inSideRef}>
                <Text fontSize="sm">{curSelected}</Text>
                {isOpen && (
                    <DropdownList>
                        {regions.map((item) => (
                            <DropdownItem
                                key={item.name}
                                onClick={() => onClick(item)}
                            >
                                {item.name}
                            </DropdownItem>
                        ))}
                    </DropdownList>
                )}
            </DropdownContainer>
        </>
    );
};

export default RegionSelectBox;

const LabelStyled = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
`;

const DropdownContainer = styled.div`
    position: relative;
    width: 92%;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 8px;
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
    max-height: 200px;
    min-height:50px;
    overflow-y: auto;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: white;
    animation: ${dropdownAnimation} 0.3s ease-out;
`;

const DropdownItem = styled.li`
    font-size: 0.875rem;
    padding: 8px;
    margin: auto;
    font-size: 0.9rem;
    cursor: pointer;
`;
