import styled from "styled-components";

interface ImageProps {
    src: string;
    alt?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
}

const Image = ({
    src,
    alt = "image",
    width = "200px",
    height = "300px",
    borderRadius = "8px",
}: ImageProps) => {
    return (
        <CustomImage
            src={src}
            $alt={alt}
            $width={width}
            $height={height}
            $borderRadius={borderRadius}
        />
    );
};

export default Image;

const CustomImage = styled.img<{
    $alt: string;
    $width: string;
    $height: string;
    $borderRadius: string;
}>`
    width: ${({ $width }) => $width};
    height: ${({ $height }) => $height};
    border-radius: ${({ $borderRadius }) => $borderRadius};
    object-fit: cover;
`;
