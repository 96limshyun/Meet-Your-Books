import { Button, Text } from "@components/Common";
import styled from "styled-components";
interface AIChatBoxProps {
    ChatClose: () => void;
}

const AIChatBox = ({ChatClose}: AIChatBoxProps) => {
    return (
        <ChatBox>
            <ChatHeader>
                <Text color="white" fontWeight="bold">AI 도서 추천받기</Text>
                <CloseButton onClick={ChatClose}>✕</CloseButton>
            </ChatHeader>
            <ChatContent>
                <Message $isAI={false}>You: 책 추천 부탁드립니다!</Message>
                <Message $isAI={true}>AI: 어떤 장르를 원하시나요?</Message>
            </ChatContent>
            <ChatInputWrap>
                <ChatInput placeholder="메시지를 입력하세요..." />
                <SendButton color="midnightBlue" fontColor="white" fontSize="sm">전송</SendButton>
            </ChatInputWrap>
        </ChatBox>
    );
};

export default AIChatBox;

const ChatBox = styled.div`
    position: absolute;
    bottom: 70px;
    right: 0;
    width: 300px;
    height: 500px;
    background-color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 10000;
`;

const ChatHeader = styled.div`
    background-color: ${({ theme }) => theme.colors.midnightBlue};
    color: white;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
`;


const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
`;

const ChatContent = styled.div`
    flex: 1;
    padding: 10px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background-color: #f9f9f9;
`;

const Message = styled.div<{ $isAI?: boolean }>`
    align-self: ${({ $isAI }) => ($isAI ? "flex-start" : "flex-end")};
    background-color: ${({ $isAI }) => ($isAI ? "#e3f2fd" : "#19275f")};
    color: ${({ $isAI }) => ($isAI ? "#000" : "#fff")};
    padding: 8px 12px;
    border-radius: 16px;
`;

const ChatInputWrap = styled.div`
    display: flex;
    padding: 8px;
    background-color: ${({ theme }) => theme.colors.lightGray};
    border-top: 1px solid #e0e0e0;
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    outline: none;
`;

const SendButton = styled(Button)`
    margin-left: 8px;
    border-radius: 8px;
    padding: 10px 16px;
    cursor: pointer;
    &:hover {
        background-color: #3a4a8a;
    }
`;
