import { Heading, Spacing } from "@components/Common";
import { HeaderInput } from "@components/header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const DefaultLayout = () => {
    return (
        <>
            <HeaderContainer>
                <HeaderWrap>
                    <Heading fontWeight="bold">Meet Your Books</Heading>
                    <HeaderInput/>
                </HeaderWrap>
                
            </HeaderContainer>
            <Spacing height="xxl" />
            <Outlet />
        </>
    );
};

export default DefaultLayout;

const HeaderContainer = styled.section`
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`;

const HeaderWrap = styled.section`
    max-width: 1044px;
    min-width: 350px;
    margin: 1rem auto;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

