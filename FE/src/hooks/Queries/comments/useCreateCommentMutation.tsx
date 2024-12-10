import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentAPI } from "@/services";
import { CommentPayload } from "@/types/commentsType";

const fetchCreateComment = async (query: string, body: CommentPayload) => {
    const response = await commentAPI.post(body, query);
    if (!response.ok) {
        throw new Error("댓글 생성 실패");
    }
};

const useCreateCommentMutation = (isbn: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CommentPayload) => fetchCreateComment(isbn, body),
        // toast 처리 예정
        onError: (error) => console.log(error),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments", isbn] }),
    });
};

export default useCreateCommentMutation;
