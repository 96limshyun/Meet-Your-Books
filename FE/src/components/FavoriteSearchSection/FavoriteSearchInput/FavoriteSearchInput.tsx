import { SearchOutlined } from "@ant-design/icons";
import { BaseInput } from "@components/ui";
import React, { useRef } from "react";
import styled from "styled-components";

export interface FavoriteSearchInputProps {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const FavoriteSearchInput: React.FC<FavoriteSearchInputProps> = ({
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
            <BaseInput
                ref={inputRef}
                placeholder="내가 찜한 책 검색..."
                height="90%"
                bgColor="white"
            />
            <SearchOutlined onClick={handleSearch} />
        </InputWrap>
    );
};

export default FavoriteSearchInput;

const InputWrap = styled.form`
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 8px;
    display: flex;
    align-items: center;
    height: 2.4rem;
    padding: 0 10px;
    justify-content: space-between;
`;
