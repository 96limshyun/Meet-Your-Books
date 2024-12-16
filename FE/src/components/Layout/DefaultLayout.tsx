import { Heading, Spacing } from "@components/Common";
import { HeaderInput } from "@components/Header";
import NavigationPanel from "@components/Header/NavigationPanel/NavigationPanel";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

import { PATH } from "@/constants/path";

const DefaultLayout = () => {
    return (
        <>
            <HeaderContainer>
                <HeaderWrap>
                    <HomeButton to={PATH.HOME}>
                        <Heading fontWeight="bold">Meet Your Books</Heading>
                    </HomeButton>
                    {/* <HeaderInput /> */}
                    <NavigationPanel />
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
    padding: 0 20px;
    min-width: 350px;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HomeButton = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;
