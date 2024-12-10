import { favoriteAPI } from "@/services";

const fetchFavorites = async (userId: string) => {
    const response = await favoriteAPI.get(`?userId=${userId}`);
    if (!response.ok) {
        throw new Error("찜 목록 가져오기 실패");
    }
    return response.json();
};

import { useQuery } from "@tanstack/react-query";

export const useFavoritesQuery = (userId: string) => {
    return useQuery({
        queryKey: ["favorites", userId],
        queryFn: () => fetchFavorites(userId),
        staleTime: 1000 * 60 * 5, // 5분 동안 데이터 캐싱
    });
};
