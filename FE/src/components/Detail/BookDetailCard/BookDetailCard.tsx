import {
    UserOutlined,
    CalendarOutlined,
    NumberOutlined,
    ReadOutlined,
    BookOutlined,
} from "@ant-design/icons";
import { ShopOutlined } from "@ant-design/icons";
import { Button, Spacing } from "@components/Common";
import { Text } from "@components/ui";
import { Heading } from "@components/ui";
import styled from "styled-components";
import twc from "tailwind-styled-components";

import { ERROR_IMG } from "@/constants";
import useOpen from "@/hooks/Common/useOpen";
import { BookDetailType } from "@/types/bookDetailType";
import { handleImageError } from "@/utils";

import LibrariesFindPopup from "../LibrariesFindPopup/LibrariesFindPopup";
interface BookDetailCardProps {
    bookData: BookDetailType;
}
const BookDetailCard = ({ bookData }: BookDetailCardProps) => {
    const {
        bookname,
        bookImageURL,
        isbn13,
        loanCnt,
        authors,
        publication_year,
        publisher,
        class_nm,
        class_no,
        vol,
        description,
    } = bookData;
    const { isOpen, setOpen } = useOpen();
    const closePopup = () => setOpen(false)
    return (
        <>
        <Card>
            <CardHeader>
                <Heading fontSize="xl" fontWeight="bold">
                    {bookname}
                </Heading>
            </CardHeader>
            <CardContent>
                <BookImageWrapper>
                    <StyledImage
                        src={bookImageURL || ERROR_IMG}
                        onError={handleImageError}
                        alt={bookname}
                        width={200}
                        height={300}
                    />
                    <div>
                        <Badge>ISBN: {isbn13}</Badge>
                        <Badge>대출 횟수: {loanCnt.toLocaleString()}</Badge>
                    </div>
                </BookImageWrapper>
                <BookDetails>
                    <DetailRow>
                        <UserOutlined />
                        <DetailTitle>저자:</DetailTitle> {authors}
                    </DetailRow>
                    <DetailRow>
                        <CalendarOutlined />
                        <DetailTitle>출판년도:</DetailTitle> {publication_year}
                    </DetailRow>
                    <DetailRow>
                        <BookOutlined />
                        <DetailTitle>출판사:</DetailTitle> {publisher}
                    </DetailRow>
                    <DetailRow>
                        <ReadOutlined />
                        <DetailTitle>분류:</DetailTitle> {class_nm}
                    </DetailRow>
                    <DetailRow>
                        <NumberOutlined />
                        <DetailTitle>분류번호:</DetailTitle> {class_no}
                    </DetailRow>
                    {vol && (
                        <DetailRow>
                            <DetailTitle>권/호:</DetailTitle> {vol}
                        </DetailRow>
                    )}
                    <Separator />
                    <div>
                        <DescriptionHeader>
                            <Heading fontSize="xl">책 소개</Heading>
                            <LibraryFindBtn
                                color="primary"
                                fontColor="white"
                                height="32px"
                                width="100px"
                                fontSize="sm"
                                onClick={() => setOpen(true)}
                            >
                                <ShopOutlined />
                                소장 도서관
                            </LibraryFindBtn>
                        </DescriptionHeader>
                        <Spacing height="md" />
                        <Description>{description}</Description>
                    </div>
                </BookDetails>
            </CardContent>
        </Card>
        {isOpen && <LibrariesFindPopup closePopup={closePopup} isbn13={isbn13}/>}
        </>
    );
};

export default BookDetailCard;

const Card = styled.div`
    width: 100%;
    margin: 0 auto;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardHeader = styled.div`
    padding: 16px;
    background: #f8f9fa;
`;

const CardContent = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;

    @media (min-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
    }

    padding: 24px;
`;

const BookImageWrapper = styled.div`
    grid-column: span 1;
    text-align: center;

    @media (min-width: 768px) {
        grid-column: span 1;
    }
`;

const StyledImage = styled.img`
    width: 65%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Badge = twc(Text)`
  w-2/3 flex items-center justify-center bg-gray-200 rounded px-3 py-2 text-sm mt-2 mx-auto
`;

const BookDetails = styled.div`
    grid-column: span 2;
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const DetailRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const DetailTitle = styled.span`
    font-weight: 600;
`;

const Description = styled.p`
    color: #6c757d;
`;

const Separator = styled.hr`
    border: none;
    border-top: 1px solid #dee2e6;
    margin: 16px 0;
`;

const DescriptionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

const LibraryFindBtn = styled(Button)`
    padding: 5px;
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
`