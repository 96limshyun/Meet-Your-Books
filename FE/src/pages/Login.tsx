import { useEffect } from "react";

const Login = () => {
    const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
    const redirect_uri = import.meta.env.VITE_AUTH_REDIRECT_URL;
    const kakaoURL = `${import.meta.env.VITE_KAKAO_URL}client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    const handleLogin = () => {
        window.location.href = kakaoURL;
    };

    useEffect(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if(code) {
            console.log(code)
        }
    }, [])
    return (
        <>
            <button onClick={handleLogin}>카카오 로그인</button>
        </>
    );
};

export default Login;
