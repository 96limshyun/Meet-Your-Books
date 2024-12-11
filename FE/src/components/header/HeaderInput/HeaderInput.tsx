import { Input } from "@components/Common";
import DropDownBox from "@components/Header/DropDownBox/DropDownBox";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import useBookStore from "@/stores/bookStore";
const HeaderInput = ({
    placeholder = "Search For Book...",
    customHandleSubmit,
}: {
    placeholder?: string;
    customHandleSubmit?: (e: React.FormEvent) => void;
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setSearchText } = useBookStore();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const defaultHandleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current?.value) {
            setSearchText(inputRef.current?.value);
            const currentPath = location.pathname;

            if (currentPath !== "/") {
                navigate("/");
            }
        }
    };

    const handleSubmit = customHandleSubmit || defaultHandleSubmit;

    return (
        <InputWrap onSubmit={handleSubmit}>
            <DropDownBox />
            <Input
                ref={inputRef}
                placeholder={placeholder}
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
