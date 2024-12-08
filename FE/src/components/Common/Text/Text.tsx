import { ReactNode } from "react";
import styled from "styled-components";

import theme from "@/styles/theme";

interface TextProps {
    fontSize?: keyof typeof theme.fontSize;
    fontWeight?: keyof typeof theme.fontWeight;
    lineHeight?: keyof typeof theme.lineHeight;
    color?: keyof typeof theme.fontColor;
    margin?: string;
    children: ReactNode;
    className?: string;
}

const Text = ({
    fontSize = "md",
    fontWeight = "normal",
    lineHeight = "normal",
    color = "black",
    margin = "0",
    children,
    className,
}: TextProps) => {
    return (
        <CustomText
            className={className}
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $lineHeight={lineHeight}
            $margin={margin}
            $color={color}
        >
            {children}
        </CustomText>
    );
};

export default Text;

const CustomText = styled.p<{
    $fontSize: keyof typeof theme.fontSize;
    $fontWeight: keyof typeof theme.fontWeight;
    $lineHeight: keyof typeof theme.lineHeight;
    $margin: string;
    $color: keyof typeof theme.fontColor;
}>`
    font-size: ${({ $fontSize }) => theme.fontSize[$fontSize!]};
    font-weight: ${({ $fontWeight }) => theme.fontWeight[$fontWeight!]};
    line-height: ${({ $lineHeight }) => theme.lineHeight[$lineHeight!]};
    margin: ${({ $margin }) => $margin};
    color: ${({ $color }) => theme.fontColor[$color!]};

    /* overflow: hidden; */
    /* white-space: nowrap;
    text-overflow: ellipsis; */
`;
