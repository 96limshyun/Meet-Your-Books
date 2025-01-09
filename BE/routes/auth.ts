import express from "express";
import dotenv from "dotenv";

import { Data } from "../types";
import { fetchAPI } from "../services/fetchAPI";
import { LOGIN_MESSAGE } from "../constants/message";
import { STATUS_CODES } from "../constants/statusCodes";

dotenv.config();

const KAKAO_API_CONFIG = {
    contentType: process.env.KAKAO_CONTENT_TYPE!,
    clientId: process.env.KAKAO_REST_API_KEY!,
    redirectURL: process.env.REDIRECT_URL!,
    tokenURL: process.env.KAKAO_GET_TOKEN_URL!,
    userInfoUrl: process.env.KAKAO_GET_USER_INFO_URL!,
}

const header = {
    "Content-Type": KAKAO_API_CONFIG.contentType,
};

const authRouter = express.Router();

const getKakaoToken = async (code: string) => {
    const data: Data = {
        grant_type: "authorization_code",
        client_id: KAKAO_API_CONFIG.clientId,
        redirect_uri: KAKAO_API_CONFIG.redirectURL,
        code,
    };

    const queryString = Object.keys(data)
        .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
        .join("&");

    const response = await fetchAPI(KAKAO_API_CONFIG.tokenURL, {
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

    const response = await fetchAPI(KAKAO_API_CONFIG.userInfoUrl, {
        method: "GET",
        headers: userInfoHeader,
    });
    const result = await response.json();
    return { id: result.id, nickname: result.properties.nickname };
};

authRouter.post("/kakaoAuth", async (req, res) => {
    const { code } = req.body;
    const { accessToken } = await getKakaoToken(code);
    try {
        if (accessToken) {
            const { id, nickname } = await getUserInfo(accessToken);
            res.status(STATUS_CODES.OK).json({
                message: LOGIN_MESSAGE.AUTH_SUCCESSFUL,
                data: { accessToken, id, nickname },
            });
        } else {
            res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: LOGIN_MESSAGE.EMPTY_TOKEN });
        }
    } catch(error) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ message: LOGIN_MESSAGE.AUTH_FAILED });
    }
});

export default authRouter;
