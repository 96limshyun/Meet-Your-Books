import { OpenAIOutlined, UserOutlined, SendOutlined } from "@ant-design/icons";
import { BaseText } from "@components/ui";
import { BaseButton } from "@components/ui";
import { Spin } from "antd";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import styled, { keyframes } from "styled-components";
import twc from "tailwind-styled-components";

import useAIRequestMutation from "@/hooks/Queries/openAI/useAIRequestMutation";
import { ChatHistory, Role } from "@/types/openAIType";
interface AIChatBoxProps {
  chatHistory: ChatHistory[];
  setHistory: Dispatch<SetStateAction<ChatHistory[]>>;
  ChatClose: () => void;
}

const AIChatBox = ({ chatHistory, setHistory, ChatClose }: AIChatBoxProps) => {
  const [inputValue, setInputValue] = useState("");
  const chatContentRef = useRef<HTMLDivElement | null>(null);
  const { mutate, isPending } = useAIRequestMutation();

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const message = inputValue;
    setHistory((prev) => [...prev, { role: "user", content: message }]);
    setInputValue("");
    mutate(message, {
      onSuccess: (data) => {
        setHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      },
    });
  };

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <ChatBox>
      <ChatHeader>
        <BaseText color="white" fontWeight="bold">
          AI 도서 추천받기
        </BaseText>
        <CloseButton onClick={ChatClose}>✕</CloseButton>
      </ChatHeader>
      <ChatContent ref={chatContentRef}>
        {chatHistory.map((message, idx) => (
          <MessageWrapper key={idx} $isAI={message.role}>
            {message.role === "assistant" ? (
              <>
                <OpenAIOutlined />
                <MarkDownWrap
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                >
                  {message.content}
                </MarkDownWrap>
              </>
            ) : (
              <>
                <BaseText className="bg-[#19275f] text-white px-3 py-2 text-sm rounded-2xl max-w-[75%] break-words">
                  {message.content}
                </BaseText>
                <UserOutlined />
              </>
            )}
          </MessageWrapper>
        ))}
        {isPending && (
          <MessageWrapper $isAI="assistant">
            <OpenAIOutlined />
            <LoadingWrap>
              <Spin size="small" />
            </LoadingWrap>
          </MessageWrapper>
        )}
      </ChatContent>
      <ChatInputWrap onSubmit={handleRequest}>
        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <SendButton type="submit" fontSize="sm" disabled={!inputValue.trim()}>
          <SendOutlined />
        </SendButton>
      </ChatInputWrap>
    </ChatBox>
  );
};

export default AIChatBox;

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
`;

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
  animation: ${fadeIn} 0.3s ease-out forwards;
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

const SendButton = twc(BaseButton)<{ disabled?: boolean }>`
  ml-2 px-4 py-2 rounded-lg
  ${({ disabled }) =>
    disabled
      ? "bg-[#ccc] text-[#888] hover:bg-[#ccc] cursor-not-allowed"
      : "bg-[#19275f] text-white hover:bg-[#3a4a8a]"}
`;

const MarkDownWrap = styled(Markdown)`
  background-color: #e3f2fd;
  color: #000;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 75%;
  word-wrap: break-word;
  font-size: 0.875rem;
`;

const LoadingWrap = styled.div`
  background-color: #e3f2fd;
  color: #000;
  padding: 8px 12px;
  border-radius: 16px;
  max-width: 75%;
  word-wrap: break-word;
  font-size: 0.875rem;
`;
