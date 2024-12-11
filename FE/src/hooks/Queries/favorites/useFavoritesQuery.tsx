import { useQuery } from "@tanstack/react-query";

import { favoriteAPI } from "@/services";

const fetchFavorites = async (userId: string) => {
    const response = await favoriteAPI.get(`?userId=${userId}`);
    if (!response.ok) {
        throw new Error("찜 목록 가져오기 실패");
    }
    return await response.json();
};

export const useFavoritesQuery = (userId: string) => {
    return useQuery({
        queryKey: ["favorites", userId],
        queryFn: () => fetchFavorites(userId),
    });
};
