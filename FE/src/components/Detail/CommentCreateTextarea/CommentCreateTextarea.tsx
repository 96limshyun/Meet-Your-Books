import { useState } from "react";
import styled from "styled-components";

interface CommentCreateTextareaProps {
    message?: string;
    curComment?: string;
    onClick: (comment: string) => void;
}

const CommentCreateTextarea = ({message = "", curComment = "", onClick}: CommentCreateTextareaProps) => {
    const [isActive, setActive] = useState(false);
    const [comment, setComment] = useState(curComment)

    const handleSubmit = () => {
        onClick(comment);
        setComment("");
    };
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
                disabled={!comment.trim()}
                onClick={() => handleSubmit()}
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

const CommentCreateBtn = styled.button<{ disabled: boolean }>`
    width: 100px;
    height: 40px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    background-color: ${({ disabled }) => (disabled ? "#e0e0e0" : "#007bff")};
    color: white;
    border: none;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: bold;
`;
