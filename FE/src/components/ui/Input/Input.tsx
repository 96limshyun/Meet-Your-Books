import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const inputVariants = cva(
  "w-full h-full border-none outline-none px-4",
  {
    variants: {
      fontSize: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
      bgColor: {
        lightGray: "bg-gray-100",
        white: "bg-white",
      },
      fontColor: {
        black: "text-black",
        gray: "text-gray-600",
        white: "text-white"
      },
    },
    defaultVariants: {
      fontSize: "md",
      bgColor: "lightGray",
      fontColor: "black",
    },
  }
);

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "color">,
    VariantProps<typeof inputVariants> {
  leftIcon?: ReactNode;
  width?: string;
  height?: string;
  border?: string;
  borderBottom?: string;
  borderRadius?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      fontSize,
      bgColor,
      fontColor,
      leftIcon,
      width = "300px",
      height = "40px",
      border = "none",
      borderBottom = "none",
      borderRadius = "0px",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          "relative flex items-center overflow-hidden",
          className
        )}
        style={{
          width,
          height,
          border,
          borderBottom,
          borderRadius,
        }}
      >
        {leftIcon && (
          <div className="absolute left-2 flex items-center justify-center h-full">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          {...props}
          className={twMerge(
            inputVariants({ fontSize, bgColor, fontColor }),
            leftIcon ? "pl-10" : ""
          )}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
