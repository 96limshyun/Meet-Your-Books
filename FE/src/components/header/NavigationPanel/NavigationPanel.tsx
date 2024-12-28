import ModalComponent from "@components/Common/Modal/Modal";
import Overlay from "@components/Common/Overlay/Overlay";
import { message } from "antd";
import { useRef, useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { ROUTES, LOGIN_ROUTES } from "@/constants";
import { PATH } from "@/constants/path";
import useOnClickOutside from "@/hooks/Common/useOnClickOutside";

const NavigationPanel = () => {
    const inSideRef = useRef(null);
    const [isOpenPanel, setOpenPanel] = useState<boolean>(false);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
        !!localStorage.getItem("ACCESS_TOKEN")
    );
    const [isModalOpen, setModalOpen] = useState(false);
    const handlePanelClick = () => setOpenPanel((prev) => !prev);
    const closePanel = () => setOpenPanel(false);

    const handleLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("USER_INFO");
        setIsLoggedIn(false);
        setOpenPanel(false);
        setModalOpen(false)
    };

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setIsLoggedIn(!!token);
    }, []);

    useOnClickOutside(inSideRef, closePanel);

    return (
        <>
            <PanelIcon onClick={handlePanelClick} />
            {isOpenPanel && (
                <Overlay>
                    <NavigationWrap $isOpenPanel={isOpenPanel} ref={inSideRef}>
                        {isLoggedIn ? (
                            <>
                                <RouteItem
                                    to={PATH.HOME}
                                    onClick={() => setModalOpen(true)}
                                >
                                    로그아웃
                                </RouteItem>
                            </>
                        ) : (
                            <RouteItem
                                to={LOGIN_ROUTES.href}
                                key={LOGIN_ROUTES.href}
                            >
                                로그인
                            </RouteItem>
                        )}
                        {ROUTES.map((curRoute) =>
                            curRoute.name === "내가 찜한 책" ? (
                                <RouteItem
                                    to={curRoute.href}
                                    key={curRoute.href}
                                    onClick={closePanel}
                                >
                                    {curRoute.name}
                                </RouteItem>
                            ) : (
                                <RouteItem
                                    to="/"
                                    key={curRoute.href}
                                    onClick={() => {
                                        message.warning(
                                            "서비스 개발중입니다.."
                                        );
                                        closePanel();
                                    }}
                                >
                                    {curRoute.name}
                                </RouteItem>
                            )
                        )}
                        <ModalComponent
                            isModalOpen={isModalOpen}
                            callBack={handleLogout}
                            onCancel={() => setModalOpen(false)}
                            message="정말 로그아웃 하시겠습니까?"
                        />
                    </NavigationWrap>
                </Overlay>
            )}
        </>
    );
};

export default NavigationPanel;

const slideIn = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

const PanelIcon = styled(AiOutlineMenu)`
    font-size: 1.5rem;
    cursor: pointer;
`;

const NavigationWrap = styled.div<{ $isOpenPanel: boolean }>`
    position: fixed;
    z-index: 50;
    width: 300px;
    max-width: 100%;
    top: 0;
    right: 0;
    height: 100%;
    padding: 50px;
    background-color: white;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    animation: ${({ $isOpenPanel }) => $isOpenPanel && slideIn} 0.3s ease-in-out;
`;

const RouteItem = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid gray;
`;
