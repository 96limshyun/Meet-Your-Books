import { Heading, Spacing } from "@components/Common";
import { BookDetailCard } from "@components/Detail";
import CommentBox from "@components/Detail/CommentBox/CommentBox";
import CommentCreateTextarea from "@components/Detail/CommentCreateTextarea/CommentCreateTextarea";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useCommentQuery from "@/hooks/Queries/comments/useCommentQuery";
import useGetQuery from "@/hooks/Queries/useGetQuery";
import { BookDetailType } from "@/types/bookDetailType";

const BookDetail = () => {
    const { isbn } = useParams();
    const { data, isLoading: isBookLoading } = useGetQuery(
        "usageAnalysisList",
        `${isbn}`,
        `&isbn13=${isbn}`
    );

    const { data: comments, isLoading: isCommentsLoading } = useCommentQuery(
        `${isbn}`
    );

    if (isBookLoading || isCommentsLoading) return <div>...loading</div>;

    const userInfo = localStorage.getItem("USER_INFO");
    const userId = userInfo ? JSON.parse(userInfo).id : null;
    const book: BookDetailType = data.response.book;

    return (
        <Container>
            <BookDetailCard bookData={book} />
            <CommentContainer>
                <HeadingWrap>
                    <Heading fontWeight="bold">리뷰</Heading>
                </HeadingWrap>
                <Spacing height="sm" />
                <CommentWrap>
                    {comments?.map((comment) => (
                        <CommentBox
                            _id={comment._id}
                            username={comment.username}
                            timestamp={comment.timestamp}
                            content={comment.content}
                            isAuthor={userId === comment.userid}
                        />
                    ))}
                </CommentWrap>
                <Spacing height="lg" />
                <CommentCreateTextarea message="리뷰를 작성해주세요!" />

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

// 책 상세 정보
// 대출 추이 그래프
// 소장도서관 보기(팝업으로?)
// 댓글
