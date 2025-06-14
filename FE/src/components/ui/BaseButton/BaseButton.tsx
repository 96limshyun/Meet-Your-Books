import { cva, type VariantProps } from "class-variance-authority";
import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center transition-colors disabled:cursor-not-allowed p-6",
  {
    variants: {
      color: {
        lightGray: "bg-gray-200",
        primary: "bg-blue-500",
        secondary: "bg-gray-500",
        dark: "bg-gray-800",
        midnightBlue: "bg-[#19275F]",
      },
      fontColor: {
        white: "text-white",
        black: "text-black",
      },
      fontSize: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      fontWeight: {
        normal: "font-normal",
        bold: "font-bold",
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        fit: "w-fit",
      },
      height: {
        sm: "h-8",
        md: "h-10",
        lg: "h-12",
      },
      border: {
        none: "border-none",
        default: "border border-transparent",
        solid: "border border-gray-400",
      },
      borderRadius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      color: "lightGray",
      fontColor: "black",
      fontSize: "md",
      fontWeight: "normal",
      width: "fit",
      height: "md",
      border: "default",
      borderRadius: "md",
    },
  }
);

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  children: ReactNode;
}

const BaseButton = ({
  type = "button",
  children,
  className,
  color,
  fontColor,
  fontSize,
  fontWeight,
  width,
  height,
  border,
  borderRadius,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={twMerge(
        buttonVariants({
          color,
          fontColor,
          fontSize,
          fontWeight,
          width,
          height,
          border,
          borderRadius,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default BaseButton;
