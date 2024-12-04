import { useEffect } from "react";

const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_AUTH_REDIRECT_URL;
const kakaoURL = `${import.meta.env.VITE_KAKAO_URL}client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

const Login = () => {
    const handleLogin = () => window.location.href = kakaoURL;

    useEffect(() => {
        const authFetch = async(code: string) => {
            const response = await fetch("http://localhost:4000/kakaoAuth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            })
            const data = await response.json()
            console.log(data)
        }
        const code = new URL(window.location.href).searchParams.get("code");
        if(code) {
            authFetch(code)
        }


    }, [])
    return (
        <>
            <button onClick={handleLogin}>카카오 로그인</button>
        </>
    );
};

export default Login;
