import { useParams } from "react-router-dom";

import { BookDetailType, LoanHistory, LoanGroup } from "@/types/bookDetailType";

import useCommentQuery from "../Queries/comments/useCommentQuery";
import useDefaultQuery from "../Queries/useDefaultQuery";

const useBookDetailLogic = () => {
    const { isbn } = useParams();
    const { data, isLoading: isBookLoading } = useDefaultQuery(
        "usageAnalysisList",
        `${isbn}`,
        `&isbn13=${isbn}`
    );
    const { data: comments, isLoading: isCommentsLoading } = useCommentQuery(
        `${isbn}`
    );
    const transformLoanHistory = (loanHistory: LoanHistory[] | undefined) =>
        loanHistory?.map((item) => ({
            month: item.loan.month,
            대출건수: item.loan.loanCnt,
            순위: item.loan.ranking,
        })) || [];

    const transformLoanGroups = (loanGrps: LoanGroup[] | undefined) =>
        loanGrps?.map((item) => ({
            age: item.loanGrp.age,
            대출건수: item.loanGrp.loanCnt,
            순위: item.loanGrp.ranking,
        })) || [];

    const book: BookDetailType = data?.response?.book || null;
    const loanHistory = transformLoanHistory(data?.response?.loanHistory);
    const loanGrps = transformLoanGroups(data?.response?.loanGrps);
    
    return {
        isbn,
        book,
        loanHistory,
        loanGrps,
        comments,
        isBookLoading,
        isCommentsLoading,
    };
};

export default useBookDetailLogic;
