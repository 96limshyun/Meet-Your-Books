export const LOGIN_MESSAGE = {
    AUTH_SUCCESSFUL: "로그인 성공",
    EMPTY_TOKEN: "토큰을 받아오는데 실패했습니다.",
    AUTH_FAILED: "로그인에 실패했습니다.",
} as const;

export const MONGODB_CONNECT_MESSAGE = {
    CONNECT_SUCCESSFUL: "MongoDB 연결 성공",
    CONNECT_FAILED: "MongoDB 연결 실패",
} as const;

export const REGION_MESSAGES = {
    NOT_FOUND: "없는 지역입니다.",
    FETCH_ERROR: "서브지역 불러오기 실패",
} as const;

export const COMMENT_MESSAGES = {
    FETCH_ERROR: "댓글 조회 중 에러 발생",
    ADD_SUCCESS: "댓글 추가 성공",
    ADD_ERROR: "댓글 추가 실패",
    DELETE_SUCCESS: "댓글 삭제 성공",
    DELETE_ERROR: "댓글 삭제 실패",
    UPDATE_SUCCESS: "댓글 수정 성공",
    UPDATE_ERROR: "댓글 수정 실패",
    NOT_FOUND: "댓글을 찾을 수 없습니다.",
} as const;

export const LIBRARY_API_MESSAGES = {
    BAD_REQUEST: "잘못된 요청입니다.",
    RATE_LIMIT_EXCEEDED:
        "요청 가능한 하루 제한 횟수를 초과했습니다. 내일 다시 시도해주세요.",
} as const;

export const FAVORITE_MESSAGES = {
    FETCH_ERROR: "찜한 책 조회 중 에러 발생",
    ADD_SUCCESS: "찜한 책 추가 성공",
    ADD_ERROR: "책 찜하기 실패",
    DELETE_SUCCESS: "내가 찜한 책에서 삭제 성공",
    DELETE_ERROR: "내가 찜한 책에서 삭제 실패",
} as const;

export const OPENAI_MESSAGES = {
    GENERAL_SUCCESS: "OpenAI 일반 응답 처리 성공.",
    RECOMMENDATION_SUCCESS: "추천 결과가 성공적으로 생성되었습니다.",
    API_ERROR: "OpenAI API와의 통신에 실패했습니다.",
    FETCH_BOOK_DETAILS_ERROR: "도서 정보를 가져오는 데 실패했습니다.",
};