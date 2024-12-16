import { Spin } from "antd";
import styled from "styled-components";

const LoadingSpin = () => {
    return (
        <SpinWrap>
            <Spin />
        </SpinWrap>
    );
};

export default LoadingSpin;

const SpinWrap = styled.div`
    display: flex;
    justify-content: center;
    margin: 40px 0;
`;
