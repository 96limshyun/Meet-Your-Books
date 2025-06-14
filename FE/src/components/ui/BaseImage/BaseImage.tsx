import { cva, VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import twc from "tailwind-styled-components";

const imageVariants = cva("object-cover", {
  variants: {
    width: {
      sm: "w-24",
      md: "w-40",
      lg: "w-52",
    },
    height: {
      sm: "h-36",
      md: "h-60",
      lg: "h-80",
    },
    rounded: {
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
  },
  defaultVariants: {
    width: "md",
    height: "md",
    rounded: "md",
  },
});

interface ImageProps extends VariantProps<typeof imageVariants> {
  src: string;
  alt?: string;
  className?: string;
}

const Image = twc.img``;

const BaseImage = ({
  src,
  alt = "image",
  width,
  height,
  rounded,
  className,
}: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={twMerge(imageVariants({ width, height, rounded }), className)}
    />
  );
};

export default BaseImage;
