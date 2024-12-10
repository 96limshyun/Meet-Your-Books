import { Heading, Spacing } from "@components/Common";
import {
    BookDetailCard,
    CommentBox,
    CommentCreateTextarea,
    LineRechart,
} from "@components/Detail";
import BarRechart from "@components/Detail/BarRechart/BarRechart";
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

    if (isBookLoading || isCommentsLoading) return <div>...loading</div>;
    return (
        <Container>
            <BookDetailCard bookData={book} />
            <LineRechart
                chartName="대출 추이"
                data={loanHistory}
                dataKey="대출건수"
                XDataKey="month"
            />
            {loanGrps.length !== 0 && (
                <BarRechart
                    chartName="연령대별 대출 추이"
                    data={loanGrps}
                    XDataKey="age"
                />
            )}

            <CommentContainer>
                <HeadingWrap>
                    <Heading fontWeight="bold">리뷰</Heading>
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
                    message="리뷰를 작성해주세요!"
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

// 책 상세 정보 : 완료
// 대출 추이 그래프
// 소장도서관 보기(팝업으로?)
// 댓글 : 완료
