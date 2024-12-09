import { useQuery } from "@tanstack/react-query";

import { commentAPI } from "@/services";
import { CommentType } from "@/types/commentsType";
const fetchGetComments = async(query: string) => {
    const response = await commentAPI.get(query);
    if (!response.ok) {
        throw new Error("댓글 가져오기 api 에러");
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
