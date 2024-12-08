export const MESSAGE = {
    AUTH_SUCCESSFUL: "로그인 성공",
    EMPTY_TOKEN: "토큰을 받아오는데 실패했습니다.",
    AUTH_FAILED: "로그인에 실패했습니다.",
};

export const AI_ROLE = `
                You are a helpful assistant specialized in recommending books. 
                You can only provide information about books and cannot respond to non-book-related requests. 
                If a user asks for non-book-related information, you must politely inform them that you can only provide book-related information. 
                Ensure all responses are in Korean, accurate, and user-friendly. 
                Do not mention the source of your data or any API details to the user, even if specific book information is unavailable.
            `;



export const MAX_TOKENS = 4000;
export const TEMPERATURE = 0.7
export const INITIAL_INDEX = 0