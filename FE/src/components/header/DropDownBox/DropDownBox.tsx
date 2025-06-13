import { Text } from "@components/ui";
import { useState } from "react";
import styled, { keyframes } from "styled-components";

import { DROP_DOWN_ITEMS } from "@/constants";
import useBookStore from "@/stores/bookStore";
import { DropDownItemType } from "@/types/dropDownType";

const DropDownBox = () => {
  const { selectedValue, setSelectedValue } = useBookStore();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [curSelect, setSelect] = useState<DropDownItemType>(selectedValue);

  const handleClickItem = (item: DropDownItemType) => {
    setSelect(item);
    setIsHover(false);
    setSelectedValue(item);
  };

  return (
    <DropdownContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Text fontWeight="bold" className="mx-auto">
        {curSelect.label}
      </Text>
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
  width: 120px;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
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
  z-index: 10000;
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
