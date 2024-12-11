import { favoriteAPI } from "@/services";
import { BookDoc } from "@/types/booksType";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const removeFavorite = async (userId: string, isbn13: string) => {
    const response = await favoriteAPI.delete(
        `?userId=${userId}&isbn=${isbn13}`
    );
    if (!response.ok) {
        throw new Error("찜 해제 실패");
    }
};

const useRemoveFavoriteMutation = (userId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (isbn13: string) => removeFavorite(userId, isbn13),
        onMutate: async (isbn13) => {
            await queryClient.cancelQueries({
                queryKey: ["favorites", userId],
            });

            const previousFavorites = queryClient.getQueryData<BookDoc[]>([
                "favorites",
                userId,
            ]);

            queryClient.setQueryData(
                ["favorites", userId],
                (prev?: BookDoc[]) => {
                    if (!Array.isArray(prev)) return prev;
                    return prev.filter((book) => book.isbn13 !== isbn13);
                }
            );

            return { previousFavorites };
        },
        onError: (error) => console.log(error),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
        },
    });
};

export default useRemoveFavoriteMutation;
