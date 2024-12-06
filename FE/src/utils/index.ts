import React from "react";

export const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    fallbackSrc: string = "/images/errorImg.png"
) => {
    e.currentTarget.src = fallbackSrc;
    e.currentTarget.style.objectFit = "cover";
};