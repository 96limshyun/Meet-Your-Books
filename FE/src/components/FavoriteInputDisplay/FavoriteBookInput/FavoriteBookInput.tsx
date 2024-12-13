import { SearchOutlined } from "@ant-design/icons";
import { Input } from "@components/Common";
import React, { useRef } from "react";
import styled from "styled-components";

export interface FavoriteBookSearchInputProps {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const FavoriteBookSearchInput: React.FC<FavoriteBookSearchInputProps> = ({
    setSearchText,
}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current) {
            setSearchText(inputRef.current.value.trim());
        }
    };

    return (
        <InputWrap onSubmit={handleSearch}>
            <Input
                ref={inputRef}
                placeholder="내가 찜한 책 검색..."
                height="90%"
                color="white"
            />
            <SearchOutlined onClick={handleSearch} />
        </InputWrap>
    );
};

export default FavoriteBookSearchInput;

const InputWrap = styled.form`
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 8px;
    max-width: 450px;
    display: flex;
    align-items: center;
    height: 2.4rem;
    padding: 0 10px;
`;
