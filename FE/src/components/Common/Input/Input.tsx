import React, { forwardRef, ReactNode } from "react";
import styled from "styled-components";

import theme from "@/styles/theme";
interface InputProps {
    fontSize?: keyof typeof theme.fontSize;
    width?: string;
    height?: string;
    color?: keyof typeof theme.colors;
    fontColor?: keyof typeof theme.fontColor;
    border?: string;
    borderBottom?: string;
    leftIcon?: ReactNode;
    placeholder?: string;
    borderRadius?: string;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            fontSize = "md",
            width = "300px",
            height = "40px",
            color = "lightGray",
            fontColor = "black",
            border = "none",
            borderBottom = "none",
            leftIcon,
            placeholder = "검색어를 입력하세요.",
            borderRadius = "0px",
            className,
            ...props
        },
        ref
    ) => {
        return (
            <InputContainer
                className={className}
                $width={width}
                $height={height}
                $border={border}
                $borderBottom={borderBottom}
                $borderRadius={borderRadius}
            >
                {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
                <CustomInput
                    ref={ref}
                    $fontSize={fontSize}
                    placeholder={placeholder}
                    $color={color}
                    $fontColor={fontColor}
                    $hasIcon={!!leftIcon}
                    onKeyDown={props.onKeyDown}
                    {...props}
                />
            </InputContainer>
        );
    }
);

Input.displayName = "Input";
export default Input;

const InputContainer = styled.div<{
    $width: string;
    $height: string;
    $border: string;
    $borderBottom: string;
    $borderRadius: string;
}>`
    position: relative;
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    display: flex;
    align-items: center;
    border: ${({ $border }) => $border};
    border-bottom: ${({ $borderBottom }) => $borderBottom};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    overflow: hidden;
`;

const CustomInput = styled.input<{
    $fontSize: keyof typeof theme.fontSize;
    $color: keyof typeof theme.colors;
    $fontColor: keyof typeof theme.fontColor;
    $hasIcon: boolean;
}>`
    font-size: ${({ $fontSize }) => theme.fontSize[$fontSize!]};
    width: 100%;
    height: 100%;
    padding: ${({ $hasIcon }) => ($hasIcon ? "0 40px" : "0")};
    color: ${({ $fontColor }) => theme.fontColor[$fontColor]};
    border: none;
    outline: none;
    background-color: ${({ $color }) => theme.colors[$color]};

    /* &:disabled {
        background-color: ${({ theme }) => theme.colors.lightGray};
        color: ${({ theme }) => theme.fontColor.lightGray};
        cursor: not-allowed;
    } */

    &::placeholder {
        color: ${({ theme }) => theme.fontColor.black};
    }
`;

const IconWrapper = styled.div`
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;
