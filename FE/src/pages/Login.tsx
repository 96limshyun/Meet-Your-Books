import { Heading, Spacing } from "@components/Common";
import { useEffect } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { authAPI } from "@/services";

const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
const redirect_uri = import.meta.env.VITE_AUTH_REDIRECT_URL;
const kakaoURL = `${
    import.meta.env.VITE_KAKAO_URL
}client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

const Login = () => {
    const navigate = useNavigate();
    const handleLogin = () => (window.location.href = kakaoURL);

    useEffect(() => {
        const authFetch = async (code: string) => {
            const response = await authAPI.post({ code });
            const result = await response.json();
            localStorage.setItem("ACCESS_TOKEN", result.data.accessToken);
            localStorage.setItem(
                "USER_INFO",
                JSON.stringify({
                    id: result.data.id,
                    nickname: result.data.nickname,
                })
            );
            navigate("/");
        };

        const code = new URL(window.location.href).searchParams.get("code");
        if (code) authFetch(code);
    }, [navigate]);

    return (
        <>
            <Spacing height="xxl" />
            <AuthContainer>
                <AuthCard>
                    <Header>
                        <Heading fontWeight="bold">Meet Your Books</Heading>
                    </Header>
                    <Header>
                        <AuthTitle>Login</AuthTitle>
                    </Header>
                    <Button onClick={handleLogin}>
                        <KakaoIcon />
                        카카오 로그인
                    </Button>
                </AuthCard>
            </AuthContainer>
        </>
    );
};

export default Login;

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
`;

const AuthCard = styled.div`
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 32px;
    width: 100%;
    max-width: 300px;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 25px;
    padding: 0px 2px;
`;

const AuthTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: bold;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #fee500;
    color: black;
    font-weight: bold;
    border-radius: 8px;
    border: none;
    font-size: 1rem;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    &:hover {
        background-color: #ffd43b;
    }
`;

const KakaoIcon = styled(RiKakaoTalkFill)`
    font-size: 1.5rem;
`;
