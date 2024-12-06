export type Sort = "" | "title" | "author" | "pub" | "pubYear" | "isbn" | "loan"
export type Order = "" | "asc" | "desc"
export type ViewType = "grid" | "list";

export interface BookDoc {
    bookname: string;
    authors: string;
    publisher: string;
    publication_year: string;
    isbn13: string;
    vol: string;
    bookImageURL: string;
    bookDtlUrl: string;
    loan_count: string;
}

export interface Doc {
    doc: BookDoc;
}

export interface RequestInfo {
    pageNo: number;
    pageSize: number;
}

export interface ApiResponse {
    response: {
        request: RequestInfo;
        numFound: number;
        docs: Doc[];
    };
}
