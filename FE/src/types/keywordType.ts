export interface Keyword {
    keyword: {
        word: string;  
        weight: number;
    };
}

export interface KeywordResponse {
    response: {
        keywords: Keyword[];
    };
}
