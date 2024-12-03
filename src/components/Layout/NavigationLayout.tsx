import { Heading, Input, Spacing } from "@components/Common";
import DropDownBox from "@components/Navigation/DropDownBox/DropDownBox";
import React, { useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const NavigationLayout = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(inputRef.current?.value)
    }
    return (
        <>
            <NavigationContainer>
                <NavWrap>
                    <Heading fontWeight="bold">Meet Your Books</Heading>
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
                </NavWrap>
            </NavigationContainer>
            <Spacing height="xxl" />
            <Outlet />
        </>
    );
};

export default NavigationLayout;

const NavigationContainer = styled.section`
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const NavWrap = styled.section`
    max-width: 1300px;
    min-width: 350px;
    margin: 1rem auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InputWrap = styled.form`
    border: 1px solid ${({ theme }) => theme.colors.lightGray};
    border-radius: 8px;
    max-width: 450px;
    display: flex;
    align-items: center;
    height: 2.4rem;
    padding-right: 10px;
`;

const InputField = styled.input`
    width: 300px;
    height: 100%;
    padding: 0 10px;
    outline: none;
    border: none;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    
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

export { InputWrap, InputField, SearchField };
