import React, { ReactNode } from "react";
import styled from "styled-components";

interface OverlayProps {
    handleClick?: React.MouseEventHandler<HTMLDivElement>;
    children: ReactNode;
}

const Overlay = ({ handleClick, children }: OverlayProps) => {
    return (
        <OverlayContainer onClick={handleClick}>{children}</OverlayContainer>
    );
};

export default Overlay;

const OverlayContainer = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 40;
    backdrop-filter: blur(1px);
`;
