import { favoriteAPI } from "@/services";
import { BookDoc } from "@/types/booksType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface FavoritePayload {
    userId: string;
    book: BookDoc;
}

const addFavorite = async (body: FavoritePayload) => {
    const response = await favoriteAPI.post(body);
    if (!response.ok) {
        throw new Error("찜하기 실패");
    }
    return body.book;
};

const useAddFavoriteMutation = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (book: BookDoc) => addFavorite({ userId, book }),
        onError: (error) => console.log(error),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
        },
    });
};

export default useAddFavoriteMutation;
