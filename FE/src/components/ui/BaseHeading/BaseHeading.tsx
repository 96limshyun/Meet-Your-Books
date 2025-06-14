import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import twc from "tailwind-styled-components";

const headingVariants = cva("text-black", {
  variants: {
    fontSize: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
      "4xl": "text-4xl",
    },
    fontWeight: {
      thin: "font-thin",
      normal: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      extraBold: "font-extrabold",
    },
    lineHeight: {
      normal: "leading-normal",
      xs: "leading-none",
      sm: "leading-tight",
      md: "leading-snug",
      lg: "leading-relaxed",
      xl: "leading-loose",
    },
    color: {
      black: "text-black",
      darkGray: "text-neutral-800",
      gray: "text-neutral-600",
      lightGray: "text-neutral-400",
      white: "text-white",
    },
  },
  defaultVariants: {
    fontSize: "2xl",
    fontWeight: "normal",
    lineHeight: "normal",
    color: "black",
  },
});

interface HeadingProps
  extends VariantProps<typeof headingVariants>,
    Omit<HTMLAttributes<HTMLHeadingElement>, "color"> {
  children?: ReactNode;
}

const BaseHeading = twc.h1<HeadingProps>`
  ${({ fontSize, fontWeight, lineHeight, color, className }) => twMerge(
        headingVariants({ fontSize, fontWeight, lineHeight, color }),
        className
      )}
`;

export default BaseHeading;
