import express from "express";
import dotenv from "dotenv";
import { fetchAPI } from "../services/fetchAPI";
import { MESSAGE } from "../constants";
dotenv.config();

interface Data {
    grant_type: string;
    client_id: string;
    code: string;
    [key: string]: string;
}

const header = {
    "Content-Type": process.env.KAKAO_CONTENT_TYPE!,
};

const authRouter = express.Router();

const getKakaoToken = async (code: string) => {
    const data: Data = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY!,
        redirect_uri: process.env.REDIRECT_URL!,
        code,
    };

    const queryString = Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");

    const response = await fetchAPI(process.env.KAKAO_GET_TOKEN_URL!, {
        method: "POST",
        headers: header,
        body: queryString,
    });
    const kakaoToken = await response.json();
    return { accessToken: kakaoToken.access_token };
};

const getUserInfo = async (accessToken: string) => {
    const userInfoHeader = {
        ...header,
        Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetchAPI(process.env.KAKAO_GET_USER_INFO_URL!, {
        method: "GET",
        headers: userInfoHeader,
    });
    const result = await response.json();
    return { id: result.id, nickname: result.properties.nickname };
};

authRouter.post("/kakaoAuth", async (req, res) => {
    const { code } = req.body;
    const { accessToken } = await getKakaoToken(code);
    if (accessToken) {
        const { id, nickname } = await getUserInfo(accessToken);
        res.status(200).json({
            message: MESSAGE.AUTH_SUCCESSFUL,
            data: { accessToken, id, nickname },
        });
    } else {
        res.status(500).json({ message: MESSAGE.EMPTY_TOKEN });
    }
});

export default authRouter;
