import styled from "styled-components";
const Navigation = () => {
    return (
        <NavigationContainer>
            123
        </NavigationContainer>
    )
};

export default Navigation;

const NavigationContainer = styled.section`
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.lightGray};
`