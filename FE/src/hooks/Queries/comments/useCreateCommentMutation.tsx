import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import { commentAPI } from "@/services";
import { CommentPayload } from "@/types/commentsType";

const fetchCreateComment = async (query: string, body: CommentPayload) => {
    const response = await commentAPI.post(body, query);
    if (!response.ok) {
        throw new HTTPError(response.status);
    }
};

const useCreateCommentMutation = (isbn: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CommentPayload) => fetchCreateComment(isbn, body),
        onMutate: async (body) => {
            await queryClient.cancelQueries({queryKey: ["comments", isbn]});

            const previousComments = queryClient.getQueryData(["comments", isbn])
            queryClient.setQueryData(["comments", isbn], (oldComments:CommentPayload[]) => [...oldComments, {...body, timestamp: new Date()}])

            return {previousComments}
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", isbn] });
        },
        throwOnError: true
    });
};

export default useCreateCommentMutation;
