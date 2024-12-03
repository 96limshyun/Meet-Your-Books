import { ReactNode } from "react";
import styled from "styled-components";

import theme from "@/styles/theme";

interface TitleProps {
    fontSize?: keyof typeof theme.fontSize;
    fontWeight?: keyof typeof theme.fontWeight;
    lineHeight?: keyof typeof theme.lineHeight;
    color?: keyof typeof theme.fontColor;
    children: ReactNode;
}

const Title = ({
    fontSize = "1",
    fontWeight = "normal",
    lineHeight = "1",
    color = "black",
    children,
}: TitleProps) => {
    return (
        <CustomTitle
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $lineHeight={lineHeight}
            $color={color}
        >
            {children}
        </CustomTitle>
    );
};

export default Title;

const CustomTitle = styled.h1<{
    $fontSize: keyof typeof theme.fontSize;
    $fontWeight: keyof typeof theme.fontWeight;
    $lineHeight: keyof typeof theme.lineHeight;
    $color: keyof typeof theme.fontColor;
}>`
    font-size: ${({ $fontSize }) => theme.fontSize[$fontSize]};
    font-weight: ${({ $fontWeight }) => theme.fontWeight[$fontWeight]};
    line-height: ${({ $lineHeight }) => theme.lineHeight[$lineHeight]};
    color: ${({ $color }) => theme.fontColor[$color]};
`;
