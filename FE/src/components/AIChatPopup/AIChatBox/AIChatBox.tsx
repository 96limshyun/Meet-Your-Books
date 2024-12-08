import { OpenAIOutlined, UserOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Text } from "@components/Common";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const INITIAL_CHAT_MESSAGE: ChatHistory[] = [
    {
        role: "assistant",
        content:
            "안녕하세요! 저는 도서 추천 AI입니다. 찾고 싶은 책의 주제나 장르를 입력해 주세요.",
    },
];

type Role = "user" | "assistant";
interface ChatHistory {
    role: Role;
    content: string;
}
interface AIChatBoxProps {
    ChatClose: () => void;
}

const AIChatBox = ({ ChatClose }: AIChatBoxProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [chatHistory, setHistory] =
        useState<ChatHistory[]>(INITIAL_CHAT_MESSAGE);

    const handleRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        const message = inputRef.current?.value;
        if (!message) return;
        if (inputRef.current) inputRef.current.value = "";

        setHistory((prev) => [...prev, { role: "user", content: message }]);
        const response = await fetch("http://localhost:4000/openAI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();
        console.log(data);
        setHistory((prev) => [
            ...prev,
            { role: "assistant", content: data.message },
        ]);
    };

    return (
        <ChatBox>
            <ChatHeader>
                <Text color="white" fontWeight="bold">
                    AI 도서 추천받기
                </Text>
                <CloseButton onClick={ChatClose}>✕</CloseButton>
            </ChatHeader>
            <ChatContent>
                {chatHistory.map((message, idx) => (
                    <MessageWrapper key={idx} $isAI={message.role}>
                        {message.role === "assistant" ? (
                            <>
                                <OpenAIOutlined />
                                <Message fontSize="sm" $isAI={message.role}>
                                <Markdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                                </Markdown>
                                </Message>
                            </>
                        ) : (
                            <>
                                <Message fontSize="sm" $isAI={message.role}>
                                    {message.content}
                                </Message>
                                <UserOutlined />
                            </>
                        )}
                    </MessageWrapper>
                ))}
            </ChatContent>
            <ChatInputWrap onSubmit={handleRequest}>
                <ChatInput
                    ref={inputRef}
                    placeholder="메시지를 입력하세요..."
                />
                <SendButton
                    color="midnightBlue"
                    fontColor="white"
                    fontSize="sm"
                    onClick={handleRequest}
                >
                    <SendOutlined />
                </SendButton>
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

const MessageWrapper = styled.div<{ $isAI?: Role }>`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    gap: 8px;
    align-self: ${({ $isAI }) =>
        $isAI === "assistant" ? "flex-start" : "flex-end"};
`;

const Message = styled(Text)<{ $isAI?: Role }>`
    background-color: ${({ $isAI }) =>
        $isAI === "assistant" ? "#e3f2fd" : "#19275f"};
    color: ${({ $isAI }) => ($isAI === "assistant" ? "#000" : "#fff")};
    padding: 8px 12px;
    border-radius: 16px;
    max-width: 75%;
    word-wrap: break-word;
`;

const ChatInputWrap = styled.form`
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