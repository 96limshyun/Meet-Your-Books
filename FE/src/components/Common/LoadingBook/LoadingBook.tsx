import styled from "styled-components";

const LoadingBook = () => {
    return (
        <SpinWrap>
            <img src="/images/loadingBook.gif" width={100}/>
        </SpinWrap>
    );
};

export default LoadingBook;

const SpinWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;
