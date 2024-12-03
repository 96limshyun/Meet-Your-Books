export const DROP_DOWN_ITEMS = [
    { value: "keyword", label: "제목" },
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

export const LOGIN_ROUTES = {
    name: "로그인",
    href: "login",
} as const;
