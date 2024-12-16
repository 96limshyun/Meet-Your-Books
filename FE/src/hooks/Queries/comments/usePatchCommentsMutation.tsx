import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentAPI } from "@/services";

const fetchPatchComment = async ({
    isbn,
    _id,
    body,
}: {
    isbn: string;
    _id: string;
    body: string;
}) => {
    const response = await commentAPI.patch({content: body}, `${isbn}/${_id}`);
    if (!response.ok) {
        throw new Error("댓글 수정 실패");
    }
};

const usePatchCommentsMutation = (isbn: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ _id, body }: { _id: string; body: string }) =>
            fetchPatchComment({ isbn, _id, body }),
        // toast 처리 예정
        onError: (error) => console.log(error),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments", isbn] }),
    });
};

export default usePatchCommentsMutation;
