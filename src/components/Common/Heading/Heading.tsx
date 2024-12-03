import { ReactNode } from "react";
import styled from "styled-components";

import theme from "@/styles/theme";

interface HeadingProps {
    fontSize?: keyof typeof theme.fontSize;
    fontWeight?: keyof typeof theme.fontWeight;
    lineHeight?: keyof typeof theme.lineHeight;
    color?: keyof typeof theme.fontColor;
    children: ReactNode;
}

const Heading = ({
    fontSize = "2xl",
    fontWeight = "normal",
    lineHeight = "normal",
    color = "black",
    children,
}: HeadingProps) => {
    return (
        <CustomHeading
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $lineHeight={lineHeight}
            $color={color}
        >
            {children}
        </CustomHeading>
    );
};

export default Heading;

const CustomHeading = styled.h1<{
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
