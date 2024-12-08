import { Button, Text } from "@components/Common";
import { useState } from "react";
import { IoChatbubbleSharp } from "react-icons/io5";
import styled from "styled-components";

import { INITIAL_CHAT_MESSAGE } from "@/constants";
import useOpen from "@/hooks/Common/useOpen";
import { ChatHistory } from "@/types/openAIType";

import AIChatBox from "./AIChatBox/AIChatBox";

const AIChatPopup = () => {
    const { isOpen, toggleOpen } = useOpen();
    const [chatHistory, setHistory] =
        useState<ChatHistory[]>(INITIAL_CHAT_MESSAGE);
    return (
        <ChatPopupContainer>
            {isOpen && (
                <AIChatBox
                    ChatClose={toggleOpen}
                    chatHistory={chatHistory}
                    setHistory={setHistory}
                />
            )}
            <AIButton
                color="midnightBlue"
                fontColor="white"
                height="50px"
                width="175px"
                onClick={toggleOpen}
            >
                <IoChatbubbleSharp />
                <Text color="white">AI로 도서 추천받기</Text>
            </AIButton>
        </ChatPopupContainer>
    );
};

export default AIChatPopup;

const AIButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
`;

const ChatPopupContainer = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 9999;
`;
