import { SearchOutlined } from "@ant-design/icons";
import { Input } from "@components/Common";
import DropDownBox from "@components/Header/DropDownBox/DropDownBox";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import useBookStore from "@/stores/bookStore";

const HeaderInput = () => {
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
        <InputWrap onSubmit={handleSubmit}>
            <DropDownBox />
            <Input
                ref={inputRef}
                placeholder="Search For Book..."
                height="90%"
                color="white"
            />
            <SearchOutlined onClick={handleSubmit} />
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

export default HeaderInput;
