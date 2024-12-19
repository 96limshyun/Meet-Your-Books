import { ErrorProps } from "async-error-boundary";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { HTTP_ERROR_MESSAGE } from "@/constants/HTTPErrorMessage";
import { PATH } from "@/constants/path";
const ErrorFallBack = ({ statusCode = 404, resetError }: ErrorProps) => {
    const currentStatusCode = statusCode as keyof typeof HTTP_ERROR_MESSAGE;

    return (
        <Container>
            <ContentWrapper>
                <LogoText to={PATH.HOME}>Meet Your Books</LogoText>
                <Title>{HTTP_ERROR_MESSAGE[currentStatusCode].HEADING}</Title>
                <Description>
                    {HTTP_ERROR_MESSAGE[currentStatusCode].BODY}
                </Description>
                <ButtonWrapper>
                    <RetryButton onClick={resetError}>
                        {HTTP_ERROR_MESSAGE[currentStatusCode].BUTTON}
                    </RetryButton>
                </ButtonWrapper>
            </ContentWrapper>
        </Container>
    );
};

export default ErrorFallBack;

const Container = styled.div`
    display: flex;
    min-height: 100dvh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;

    @media (min-width: 640px) {
        padding: 12px 24px;
    }

    @media (min-width: 1024px) {
        padding: 12px 32px;
    }
`;

const ContentWrapper = styled.div`
    max-width: 32rem;
    text-align: center;
    margin: 0 auto;
`;

const LogoText = styled(Link)`
    margin: 1rem;
    font-size: 2rem;
    font-weight: bold;
    color: black;
    text-decoration: none;
    cursor: pointer;
`;

const Title = styled.h1`
    margin-top: 1rem;
    font-size: 1.875rem;
    font-weight: bold;

    @media (min-width: 640px) {
        font-size: 2.25rem;
    }
`;

const Description = styled.p`
    margin-top: 1rem;
    color: gray;
`;

const ButtonWrapper = styled.div`
    margin-top: 1.5rem;
`;

const RetryButton = styled.button`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: white;
    background-color: black;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s;
    border: none;
    cursor: pointer;
    &:hover {
        background-color: #2b2a2a;
    }
`;
