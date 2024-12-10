export interface BookDataResponse {
    response: {
        request: {
            isbn13: string;
        };
        book: BookDetailType;
        loanHistory: LoanHistory[];
        loanGrps: LoanGroup[];
        keywords: Keyword[];
        coLoanBooks: CoLoanBook[];
        maniaRecBooks: ManiaRecBook[];
        readerRecBooks: ReaderRecBook[];
    };
}

export interface BookDetailType {
    bookname: string;
    authors: string;
    publisher: string;
    bookImageURL: string;
    description: string;
    publication_year: string;
    isbn13: string;
    vol: string;
    class_no: string;
    class_nm: string;
    loanCnt: number;
}

export interface LoanHistory {
    loan: {
        month: string;
        loanCnt: number;
        ranking: number;
    };
}

export interface BarLoanGroup {
    age: string;
    대출건수: number;
    순위: number;
}

export interface LoanGroup {
    loanGrp: {
        age: string;
        gender: string;
        loanCnt: number;
        ranking: number;
    };
}

interface Keyword {
    keyword: {
        word: string;
        weight: string;
    };
}

interface CoLoanBook {
    book: {
        bookname: string;
        authors: string;
        publisher: string;
        publication_year: string;
        isbn13: string;
        vol: string;
        loanCnt: string;
    };
}

interface ManiaRecBook {
    book: {
        bookname: string;
        authors: string;
        publisher: string;
        publication_year: string;
        isbn13: string;
        vol: string;
    };
}

interface ReaderRecBook {
    book: {
        bookname: string;
        authors: string;
        publisher: string;
        publication_year: string;
        isbn13: string;
        vol: string;
    };
}
