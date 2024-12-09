import { Button } from "@components/Common";
import { useState } from "react";
import styled from "styled-components";

interface CommentCreateTextareaProps {
    message?: string;
    curComment?: string;
}

const CommentCreateTextarea = ({message = "", curComment = ""}: CommentCreateTextareaProps) => {
    const [isActive, setActive] = useState(false);
    const [comment, setComment] = useState(curComment)
    return (
        <CommentCreateWrap $isActive={isActive}>
            <Placeholder>{message}</Placeholder>
            <CommentTextarea
                onFocus={() => setActive(true)}
                onBlur={() => setActive(false)}
                $isActive={isActive}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />
            <CommentCreateBtn
                color="primary"
                fontColor="white"
                width="100px"
                height="40px"
            >
                완료
            </CommentCreateBtn>
        </CommentCreateWrap>
    );
};

export default CommentCreateTextarea;

const CommentCreateWrap = styled.div<{ $isActive: boolean }>`
    position: relative;
    height: 100px;
    background-color: ${({ $isActive }) => ($isActive ? "white" : "#f8f9fa")};
    border: ${({ $isActive }) => ($isActive ? "1px solid gray" : "none")};
    border-radius: 0.75rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: background-color 0.2s, border 0.2s;
`;

const Placeholder = styled.div`
    font-size: 1rem;
    font-weight: 500;
    opacity: 0.6;
    margin-bottom: 10px;
`;

const CommentTextarea = styled.textarea<{ $isActive: boolean }>`
    height: 100%;
    background-color: ${({ $isActive }) => ($isActive ? "white" : "#f8f9fa")};
    border: none;
    outline: none;
    border-radius: 12px;
    resize: none;
    font-size: 1rem;
    font-family: inherit;
    color: #2d3748;
    transition: background-color 0.3s;
`;

const CommentCreateBtn = styled(Button)`
    position: absolute;
    bottom: 10px;
    right: 10px;
    &:hover {
        background-color: ${({ color }) =>
            color === "primary" ? "#0056b3" : "#444"};
    }
`;
