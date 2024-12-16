import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Spacing } from "@components/Common";
import FilterDisplay from "@components/FilterDisplay/FilterDisplay";
import React, { useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import useOnClickOutside from "@/hooks/Common/useOnClickOutside";
import useOpen from "@/hooks/Common/useOpen";
import useBookStore from "@/stores/bookStore";

import DropDownBox from "../DropDownBox/DropDownBox";

const HeaderInput = () => {
    const { isOpen, setOpen, toggleOpen } = useOpen();
    const inSideRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { searchText, setSearchText } = useBookStore();
    const [inputValue, setInputValue] = useState(searchText);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchText(inputValue);
        const currentPath = location.pathname;
        if (currentPath !== "/") navigate("/");
    };

    useOnClickOutside(inSideRef, () => setOpen(false));

    return (
        <Container ref={inSideRef}>
            <SearchIcon onClick={toggleOpen} />
            {isOpen && (
                <Card>
                    <CloseBtn onClick={() => setOpen(false)} />
                    <InputWrap onSubmit={handleSubmit}>
                        <Wrap>
                            <DropDownBox />
                            <StyledInput
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="검색어 입력"
                            />
                        </Wrap>
                        <Spacing height="sm" />
                        <Button
                            width="100%"
                            color="primary"
                            fontColor="white"
                            fontSize="sm"
                            height="30px"
                            onClick={handleSubmit}
                        >
                            검색하기
                        </Button>
                    </InputWrap>
                    <FilterWrap>
                        <Spacing height="md" />
                        <FilterDisplay />
                    </FilterWrap>
                </Card>
            )}
        </Container>
    );
};

const CloseBtn = styled(CloseOutlined)`
    position: absolute;
    top: 10px;
    right: 10px;
`;

const StyledInput = styled.input`
    width: 100%;
    text-align: center;
    padding: 1px;
    height: 100%;
    font-size: 1rem;
    border: none;
    outline: none;
    border-bottom: 1px solid #007bff;
`;

const Wrap = styled.div`
    display: flex;
    margin: 10px;
    gap: 5px;
`;

const FilterWrap = styled.div`
    display: none;
    @media (max-width: 1000px) {
        display: block;
    }
`;

const Container = styled.div`
    position: relative;
`;

const SearchIcon = styled(SearchOutlined)`
    font-size: 1.5rem;
    cursor: pointer;
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
`;

const Card = styled.div`
    overflow-y: auto;
    width: 250px;
    min-height: 100px;
    max-height: 460px;
    position: absolute;
    right: 0;
    margin-top: 1rem;
    padding: 2rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: ${fadeIn} 0.3s ease-out forwards;
`;

const InputWrap = styled.form`
    width: 100%;
`;

export default HeaderInput;
