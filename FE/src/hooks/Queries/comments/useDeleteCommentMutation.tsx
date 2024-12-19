import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import { commentAPI } from "@/services";
import { CommentPayload } from "@/types/commentsType";

const fetchDeleteComment = async (isbn: string, _id: string) => {
    const response = await commentAPI.delete(`${isbn}/${_id}`);
    if (!response.ok) {
        throw new HTTPError(response.status);
    }
};

const useDeleteCommentMutation = (isbn: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (_id: string) => fetchDeleteComment(isbn, _id),
        onMutate: async (_id) => {
            await queryClient.cancelQueries({ queryKey: ["comments", isbn] });

            const previousComments = queryClient.getQueryData([
                "comments",
                isbn,
            ]);

            queryClient.setQueryData(
                ["comments", isbn],
                (oldComments: CommentPayload[]) =>
                    oldComments.filter((comment) => comment._id !== _id)
            );

            return { previousComments };
        },
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: ["comments", isbn] }),
        throwOnError: true,
    });
};

export default useDeleteCommentMutation;
