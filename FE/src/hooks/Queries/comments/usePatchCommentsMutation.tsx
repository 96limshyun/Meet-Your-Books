import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

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
        throw new HTTPError(response.status);
    }
};

const usePatchCommentsMutation = (isbn: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ _id, body }: { _id: string; body: string }) =>
            fetchPatchComment({ isbn, _id, body }),
        onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["comments", isbn] }),
        throwOnError: true,
    });
};

export default usePatchCommentsMutation;
