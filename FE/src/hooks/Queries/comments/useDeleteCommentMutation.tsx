import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentAPI } from "@/services";

const fetchDeleteComment = async (isbn: string, _id: string) => {
    const response = await commentAPI.delete(`${isbn}/${_id}`);
    if (!response.ok) {
        throw new Error("댓글 삭제 실패");
    }
};

const useDeleteCommentMutation = (isbn: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (_id: string) => fetchDeleteComment(isbn, _id),
        onError: (error) => console.log(error),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments", isbn] }),
    });
};

export default useDeleteCommentMutation;
