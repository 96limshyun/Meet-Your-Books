import { Spacing } from "@components/Common";
import LoadingBook from "@components/Common/LoadingBook/LoadingBook";
import {
    BookDetailCard,
    CommentBox,
    CommentCreateTextarea,
    LineRechart,
} from "@components/Detail";
import BarRechart from "@components/Detail/BarRechart/BarRechart";
import { BaseHeading } from "@components/ui";
import styled from "styled-components";

import useBookDetailLogic from "@/hooks/BookDetail/useBookDetailLogic";
import useCommentHandlers from "@/hooks/BookDetail/useCommentHandlers";

const BookDetail = () => {
    const {
        isbn,
        book,
        loanHistory,
        loanGrps,
        comments,
        isBookLoading,
        isCommentsLoading,
    } = useBookDetailLogic();

    const {
        userId,
        handleCreateCommentClick,
        handleDeleteComment,
        handlePatchComment,
    } = useCommentHandlers(`${isbn}`);

    if (isBookLoading || isCommentsLoading) return <LoadingBook />;
    return (
        <Container>
            <BookDetailCard bookData={book} />
            {loanHistory.length !== 0 && (
                <LineRechart
                    chartName="대출 추이"
                    data={loanHistory}
                    dataKey="대출건수"
                    XDataKey="month"
                />
            )}
            {loanGrps.length !== 0 && (
                <BarRechart
                    chartName="연령대별 대출 추이"
                    data={loanGrps}
                    XDataKey="age"
                />
            )}
            <CommentContainer>
                <HeadingWrap>
                    <BaseHeading fontWeight="bold">리뷰</BaseHeading>
                </HeadingWrap>
                <Spacing height="sm" />
                {comments?.length === 0 ? (
                    <HeadingWrap>
                        리뷰가 없습니다! 처음으로 리뷰를 달아보세요!
                    </HeadingWrap>
                ) : (
                    <CommentWrap>
                        {comments?.map((comment) => (
                            <CommentBox
                                key={comment._id}
                                _id={comment._id}
                                username={comment.username}
                                timestamp={comment.timestamp}
                                content={comment.content}
                                isAuthor={userId === comment.userid}
                                handleDelete={handleDeleteComment}
                                handlePatch={handlePatchComment}
                            />
                        ))}
                    </CommentWrap>
                )}

                <Spacing height="lg" />
                <CommentCreateTextarea
                    infoMessage="리뷰를 작성해주세요!"
                    onClick={handleCreateCommentClick}
                />

                <Spacing height="lg" />
            </CommentContainer>
        </Container>
    );
};

export default BookDetail;

const Container = styled.section`
    max-width: 1044px;
    padding: 0 20px;
    height: 100%;
    margin: 0px auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const CommentContainer = styled.div`
    width: 100%;
`;

const HeadingWrap = styled.div`
    padding: 12px;
`;

const CommentWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;