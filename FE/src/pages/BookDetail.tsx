import { BookDetailCard } from "@components/Detail";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import useGetQuery from "@/hooks/Queries/useGetQuery";
import { BookDetailType } from "@/types/bookDetailType";

const BookDetail = () => {
    const { bookId } = useParams();
    const { data, isLoading } = useGetQuery(
        "usageAnalysisList",
        `${bookId}`,
        `&isbn13=${bookId}`
    );
    if (isLoading) return <div>...loading</div>;

    const book: BookDetailType = data.response.book;
    return (
        <Container>
            <BookDetailCard bookData={book}/>
        </Container>
    );
};

export default BookDetail;

const Container = styled.section`
    max-width: 1044px;
    padding: 0 20px;
    height: 100%;
    margin: 0px auto;
`;


// 책 상세 정보
// 대출 추이 그래프
// 소장도서관 보기(팝업으로?)
// 댓글
