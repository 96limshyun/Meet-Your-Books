import { Input } from "@components/Common";
import DropDownBox from "@components/Header/DropDownBox/DropDownBox";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

import useBookStore from "@/stores/bookStore";

const HeaderInput = () => {
    const { setSearchText } = useBookStore();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(inputRef.current?.value) {
            setSearchText(inputRef.current?.value);
        }
    };

    return (
        <InputWrap onSubmit={handleSubmit}>
            <DropDownBox />
            <Input
                ref={inputRef}
                placeholder="Search For Book..."
                height="90%"
                color="white"
            />
            <SearchField onClick={handleSubmit} />
        </InputWrap>
    );
};

const InputWrap = styled.form`
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 8px;
    max-width: 450px;
    display: flex;
    align-items: center;
    height: 2.4rem;
    padding-right: 10px;
`;

const SearchField = styled(FaSearch)`
    width: full;
    height: 90%;
    font-size: 1rem;
    border: none;
    border-radius: 0 5px 5px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export default HeaderInput;
