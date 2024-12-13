import { Input } from "@components/Common";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";

interface FavoriteBookInputProps {
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const FavoriteBookInput: React.FC<FavoriteBookInputProps> = ({
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
            <SearchField onClick={handleSearch} />
        </InputWrap>
    );
};

export default FavoriteBookInput;

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
