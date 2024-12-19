import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import { commentAPI } from "@/services";
import { CommentType } from "@/types/commentsType";
const fetchGetComments = async(query: string) => {
    const response = await commentAPI.get(query);
    if (!response.ok) {
        throw new HTTPError(response.status);
    }
    return await response.json();
}

const useCommentQuery = (isbn: string) => {
    return useQuery<CommentType[]>({
        queryKey: ["comments", isbn],
        queryFn: () => fetchGetComments(isbn),
        throwOnError: true,
    });
};

export default useCommentQuery;
