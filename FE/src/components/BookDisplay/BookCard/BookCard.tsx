import FavoriteBtn from "@components/Common/FavoriteBtn/FavoriteBtn";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ANIMATION_TIME, ERROR_IMG } from "@/constants";
import { ViewType } from "@/types/booksType";
import { BookDoc } from "@/types/booksType";
import { handleImageError } from "@/utils";
interface BookItemProps {
    bookData: BookDoc;
    viewMode: ViewType;
}

const BookCard = ({ bookData, viewMode }: BookItemProps) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), ANIMATION_TIME);
        return () => clearTimeout(timer);
    }, []);

    return viewMode === "grid" ? (
        <GridCard bookData={bookData} isVisible={isVisible}/>
    ) : (
        <ListCard bookData={bookData} isVisible={isVisible}/>
    )
};

interface CardProps {
    bookData: BookDoc;
    isVisible: boolean;
}

const GridCard = ({ bookData, isVisible }: CardProps) => {
    const {isbn13, bookImageURL, bookname, authors} = bookData
    const navigate = useNavigate()
    return (
        <GridCardStyled
            $isVisible={isVisible}
            onClick={() => navigate(`/book/${isbn13}`)}
        >
            <FavoritesBtnWrap>
                <FavoriteBtn item={bookData} />
            </FavoritesBtnWrap>
            <Image
                src={bookImageURL || ERROR_IMG}
                alt={bookname}
                onError={handleImageError}
                loading="lazy"
            />
            <TextContainer $viewMode="grid">
                <Title>{bookname}</Title>
                <Subtitle>{authors}</Subtitle>
            </TextContainer>
        </GridCardStyled>
    );
};

const ListCard = ({ bookData, isVisible }: CardProps) => {
    const {isbn13, bookImageURL, bookname, authors, publisher, publication_year, loan_count} = bookData
    const navigate = useNavigate()
    return (
        <ListCardStyled
            $isVisible={isVisible}
            onClick={() => navigate(`/book/${isbn13}`)}
        >
            <FavoritesBtnWrap>
                <FavoriteBtn item={bookData} />
            </FavoritesBtnWrap>
            <Image
                src={bookImageURL || ERROR_IMG}
                alt={bookname}
                onError={handleImageError}
            />
            <ListBookInfo>
                <ListTitle>{bookname}</ListTitle>
                <MetaInfo>저자: {authors}</MetaInfo>
                <MetaInfo>출판사: {publisher}</MetaInfo>
                <MetaInfo>출판일: {publication_year}</MetaInfo>
                <LibrariesCount>대출 권수: {loan_count}</LibrariesCount>
            </ListBookInfo>
        </ListCardStyled>
    );
};

export default BookCard;

const Card = styled.div<{ $isVisible: boolean }>`
    position: relative;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    padding: 0.3rem;
    margin: 0 auto;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition:
        opacity 0.2s ease-in-out,
        box-shadow 0.2s ease-in-out,
        transform 0.2s ease-in-out;
    opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};

    &:hover {
        box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
        transform: scale(1.05);
    }
`;

const GridCardStyled = styled(Card)`
    width: 150px;
    text-align: center;
`;

const ListCardStyled = styled(Card)`
    display: flex;
    margin-bottom: 1rem;
`;

const Image = styled.img`
    object-fit: cover;
    width: 150px;
    height: 13rem;
    border-radius: 0.375rem;
`;

const TextContainer = styled.div<{ $viewMode: ViewType }>`
    width: ${({ $viewMode }) => ($viewMode === "list" ? "70%" : "100%")};
    padding-left: ${({ $viewMode }) => ($viewMode === "list" ? "1rem" : "0")};
    text-align: ${({ $viewMode }) =>
        $viewMode === "list" ? "left" : "center"};
    margin: auto 0;
`;

const Title = styled.h3`
    font-weight: bold;
    font-size: 0.875rem;
    margin: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ListTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    font-size: 0.75rem;
    margin: 0.25rem 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const MetaInfo = styled.p`
    font-size: 0.875rem;
    color: #4b5563;
    margin-bottom: 0.25rem;
`;

const FavoritesBtnWrap = styled.span`
    position: absolute;
    right: 8px;
    top: 8px;
    z-index: 10;
`;

const ListBookInfo = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    justify-content: center;
`;

const LibrariesCount = styled.div`
    width: 100px;
    padding: 5px;
    font-size: 0.7rem;
    margin-top: 0.5rem;
    border: none;
    background-color: gainsboro;
    color: black;
    border-radius: 8px;
    text-align: center;
`;