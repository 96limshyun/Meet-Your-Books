import Overlay from "@components/Common/Overlay/Overlay";
import { useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled, {keyframes} from "styled-components";

import { ROUTES, LOGIN_ROUTES } from "@/constants";
import useOnClickOutside from "@/hooks/Common/useOnClickOutside";

const NavigationPanel = () => {
    const inSideRef = useRef(null);
    const [isOpenPanel, setOpenPanel] = useState<boolean>(false);

    const handlePanelClick = () => setOpenPanel((prev) => !prev);
    const closePanel = () => setOpenPanel(false);

    useOnClickOutside(inSideRef, closePanel);

    return (
        <>
            <PanelIcon onClick={handlePanelClick} />
            {isOpenPanel && (
                <Overlay>
                    <NavigationWrap $isOpenPanel={isOpenPanel} ref={inSideRef}>
                        <RouteItem
                            to={LOGIN_ROUTES.href}
                            key={LOGIN_ROUTES.name}
                        >
                            {LOGIN_ROUTES.name}
                        </RouteItem>
                        {ROUTES.map((curRoute) => (
                            <RouteItem to={curRoute.href} key={curRoute.name}>
                                {curRoute.name}
                            </RouteItem>
                        ))}
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
    animation: ${({ $isOpenPanel }) =>
        $isOpenPanel&& slideIn} 0.3s ease-in-out;
`;

const RouteItem = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 10px 0;
    border-bottom: 1px solid gray;
`;
