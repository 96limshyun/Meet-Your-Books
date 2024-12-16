import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Input, Spacing } from "@components/Common";
import FilterDisplay from "@components/FilterDisplay/FilterDisplay";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import useOpen from "@/hooks/Common/useOpen";
import useBookStore from "@/stores/bookStore";

import DropDownBox from "../DropDownBox/DropDownBox";

const HeaderInput = () => {
    const { isOpen, setOpen, toggleOpen } = useOpen();
    const navigate = useNavigate();
    const location = useLocation();
    const { setSearchText } = useBookStore();
    const inputRef = useRef<HTMLInputElement | null>(null);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            setSearchText(inputRef.current?.value);
            const currentPath = location.pathname;

            if (currentPath !== "/") {
                navigate("/");
            }
        }
    };

    return (
        <Container>
            <SearchIcon onClick={toggleOpen}/>
            {isOpen && (
                <Card >
                    <CloseBtn onClick={() =>setOpen(false)}/>
                    <InputWrap onSubmit={handleSubmit}>
                        <Wrap>
                            <DropDownBox />
                            <StyledInput
                                ref={inputRef}
                                placeholder="검색어 입력"
                                height="100%"
                                color="white"
                                fontSize="md"
                                borderBottom="1px solid #007BFF"
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
`

const StyledInput = styled(Input)`
    text-align: center;
    display: flex;
    align-items: center;
    padding-bottom: 1px;
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
`;

const InputWrap = styled.form`
    width: 100%;
`;

export default HeaderInput;
