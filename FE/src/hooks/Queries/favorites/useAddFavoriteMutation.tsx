import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import { favoriteAPI } from "@/services";
import { BookDoc } from "@/types/booksType";
interface FavoritePayload {
    userId: string;
    book: BookDoc;
}

const addFavorite = async (body: FavoritePayload) => {
    const response = await favoriteAPI.post(body);
    if (!response.ok) {
        throw new HTTPError(response.status);
    }
    return body.book;
};

const useAddFavoriteMutation = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (book: BookDoc) => addFavorite({ userId, book }),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
        },
        throwOnError: true,
    });
};

export default useAddFavoriteMutation;
