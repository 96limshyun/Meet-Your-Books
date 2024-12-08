import { ChatHistory } from "@/types/openAIType";
export const DROP_DOWN_ITEMS = [
    { value: "title", label: "제목" },
    { value: "author", label: "저자" },
    { value: "publisher", label: "출판사" },
] as const;

export const ROUTES = [
    {
        name: "내가 찜한 책",
        href: "/favoriteBook",
    },
    {
        name: "지역별 정보",
        href: "/regionInfo",
    },
    {
        name: "도서관별 정보",
        href: "/libraryInfo",
    },
] as const;

export const SORT_ITEMS = [
    { name: "도서명 순", value: "title" },
    { name: "저자명 순", value: "author" },
    { name: "출판사 순", value: "pub" },
    { name: "출판년도 순", value: "pubYear" },
    { name: "ISBN 순", value: "isbn" },
    { name: "대출건수 순", value: "loan" },
]

export const ORDER_ITEMS = [
    { name: "오름차순", value: "asc" },
    { name: "내림차순", value: "desc" },
]


export const LOGIN_ROUTES = {
    name: "로그인",
    href: "login",
} as const;

export const INITIAL_CHAT_MESSAGE: ChatHistory[] = [
    {
        role: "assistant",
        content:
            "안녕하세요! 저는 도서 추천 AI입니다. 찾고 싶은 책의 주제나 장르를 입력해 주세요.",
    },
];


export const ANIMATION_TIME = 100;
export const FIRST_PAGE = 1;
