import React, { ReactNode } from "react";
import styled from "styled-components";

import theme from "@/styles/theme";

interface ButtonProps {
    width?: string;
    height?: string;
    color?: keyof typeof theme.colors;
    fontColor?: keyof typeof theme.fontColor;
    fontSize?: keyof typeof theme.fontSize;
    fontWeight?: keyof typeof theme.fontWeight;
    border?: string;
    borderRadius?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
    className?: string;
}

const Button = ({
    width = "fit-content",
    height = "",
    color = "lightGray",
    fontColor = "black",
    fontSize = "md",
    fontWeight = "normal",
    border = "1px solid transparent",
    borderRadius = "8px",
    onClick,
    children,
    className,
}: ButtonProps) => {
    return (
        <CustomButton
            className={className}
            $width={width}
            $height={height}
            $color={color}
            $fontColor={fontColor}
            $fontSize={fontSize}
            $fontWeight={fontWeight}
            $border={border}
            $borderRadius={borderRadius}
            onClick={onClick}
        >
            {children}
        </CustomButton>
    );
};

export default Button;

const CustomButton = styled.button<{
    $width: string;
    $height: string;
    $color: keyof typeof theme.colors;
    $fontColor: keyof typeof theme.fontColor;
    $fontSize: keyof typeof theme.fontSize;
    $fontWeight: keyof typeof theme.fontWeight;
    $border: string;
    $borderRadius: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    background-color: ${({ $color }) => theme.colors[$color]};
    color: ${({ $fontColor }) => theme.fontColor[$fontColor]};
    font-size: ${({ $fontSize }) => theme.fontSize[$fontSize]};
    font-weight: ${({ $fontWeight }) => theme.fontWeight[$fontWeight]};
    border: ${({ $border }) => $border};
    border-radius: ${({ $borderRadius }) => $borderRadius};

    &:hover {
        cursor: pointer;
    }
`;
