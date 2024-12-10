import { useParams } from "react-router-dom";

import { BookDetailType } from "@/types/bookDetailType";

import useCommentQuery from "../Queries/comments/useCommentQuery";
import useGetQuery from "../Queries/useGetQuery";

const useBookDetailLogic = () => {
    const { isbn } = useParams();
    const { data, isLoading: isBookLoading } = useGetQuery(
        "usageAnalysisList",
        `${isbn}`,
        `&isbn13=${isbn}`
    );
    const { data: comments, isLoading: isCommentsLoading } = useCommentQuery(
        `${isbn}`
    );
    const book:BookDetailType = data?.response?.book || null;
    return {
        isbn,
        book,
        comments,
        isBookLoading,
        isCommentsLoading,
    };
};

export default useBookDetailLogic;
