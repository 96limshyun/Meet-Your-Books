import React from "react";

export const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement>,
    fallbackSrc: string = "/images/errorImg.png"
) => {
    e.currentTarget.src = fallbackSrc;
    e.currentTarget.style.objectFit = "cover";
};

export const formatRelativeTime = (isoDate: Date): string => {
    const now = new Date();
    const date = new Date(isoDate);
    const diff = now.getTime() - date.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    return `${days}일 전`;
}