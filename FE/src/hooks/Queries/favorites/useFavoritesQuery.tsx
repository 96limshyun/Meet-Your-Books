import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import { favoriteAPI } from "@/services";
const fetchFavorites = async (userId: string) => {
    const response = await favoriteAPI.get(`?userId=${userId}`);
    if (!response.ok) {
        throw new HTTPError(response.status);
    }
    return await response.json();
};

export const useFavoritesQuery = (userId: string) => {
    return useQuery({
        queryKey: ["favorites", userId],
        queryFn: () => fetchFavorites(userId),
        throwOnError: true,
    });
};
