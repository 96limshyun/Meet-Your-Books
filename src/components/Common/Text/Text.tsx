import { ReactNode } from "react";
import styled from "styled-components";

import theme from "@/styles/theme";

interface TextProps {
    fontSize?: keyof typeof theme.fontSize;
    fontWeight?: keyof typeof theme.fontWeight;
    lineHeight?: keyof typeof theme.lineHeight;
    color?: keyof typeof theme.fontColor;
    children: ReactNode;
}

const Text = ({
    fontSize = "1",
    fontWeight = "normal",
    lineHeight = "1",
    color = "black",
    children,
}: TextProps) => {
    return (
        <CustomText
            fontSize={fontSize}
            fontWeight={fontWeight}
            lineHeight={lineHeight}
            color={color}
        >
            {children}
        </CustomText>
    );
};

export default Text;

const CustomText = styled.p<TextProps>`
    font-size: ${({ fontSize }) => theme.fontSize[fontSize!]};
    font-weight: ${({ fontWeight }) => theme.fontWeight[fontWeight!]};
    line-height: ${({ lineHeight }) => theme.lineHeight[lineHeight!]};
    color: ${({ color }) => theme.fontColor[color!]};
    
    /* overflow: hidden; */
    /* white-space: nowrap;
    text-overflow: ellipsis; */
`;
