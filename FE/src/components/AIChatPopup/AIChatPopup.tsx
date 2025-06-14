import { BaseButton } from "@components/ui";
import { BaseText } from "@components/ui";
import { useRef, useState } from "react";
import { IoChatbubbleSharp } from "react-icons/io5";
import styled from "styled-components";

import { INITIAL_CHAT_MESSAGE } from "@/constants";
import useOnClickOutside from "@/hooks/Common/useOnClickOutside";
import useOpen from "@/hooks/Common/useOpen";
import { ChatHistory } from "@/types/openAIType";

import AIChatBox from "./AIChatBox/AIChatBox";

const AIChatPopup = () => {
    const inSideRef = useRef<HTMLDivElement | null>(null)
    const { isOpen, setOpen, toggleOpen } = useOpen();
    const [chatHistory, setHistory] =
        useState<ChatHistory[]>(INITIAL_CHAT_MESSAGE);
    useOnClickOutside(inSideRef, () => setOpen(false))
    return (
      <ChatPopupContainer ref={inSideRef}>
        {isOpen && (
          <AIChatBox
            ChatClose={toggleOpen}
            chatHistory={chatHistory}
            setHistory={setHistory}
          />
        )}
        <BaseButton
          color="midnightBlue"
          fontColor="white"
          height="sm"
          width="auto"
          
          onClick={toggleOpen}
          className="flex items-center justify-center gap-1"
        >
          <IoChatbubbleSharp />
          <BaseText color="white">AI로 도서 추천받기</BaseText>
        </BaseButton>
      </ChatPopupContainer>
    );
};

export default AIChatPopup;

const ChatPopupContainer = styled.div`
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 9999;
`;
