import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Text, Heading } from "@components/Common";
import { useState } from "react";
import styled from "styled-components";

import { formatRelativeTime } from "@/utils";

import CommentCreateTextarea from "../CommentCreateTextarea/CommentCreateTextarea";
interface CommentBoxProps {
    _id: string;
    username: string;
    timestamp: Date;
    content: string;
    isAuthor: boolean;
}
const CommentBox = ({
    _id,
    username,
    timestamp,
    content,
    isAuthor,
}: CommentBoxProps) => {
    const [isEdit, setEdit] = useState(false);
    return (
        <CommentArea key={_id}>
            <CommentHeader>
                <CommentInfoWrap>
                    <Heading fontWeight="bold" fontSize="md">
                        {username}
                    </Heading>
                    <Text>{formatRelativeTime(timestamp)}</Text>
                </CommentInfoWrap>
                {isAuthor && (
                    <Text fontSize="sm" fontWeight="normal">
                        작성자
                    </Text>
                )}

                {isEdit ? (
                    <StyledButton onClick={() => setEdit(false)}>
                        수정 취소
                    </StyledButton>
                ) : (
                    isAuthor && ( // 작성자만 수정/삭제 버튼 표시
                        <>
                            <StyledButton onClick={() => setEdit(true)}>
                                <EditIcon /> 수정
                            </StyledButton>
                            <StyledButton>
                                <DeleteIcon /> 삭제
                            </StyledButton>
                        </>
                    )
                )}
            </CommentHeader>
            {isEdit ? (
                <CommentCreateTextarea curComment={content} />
            ) : (
                <Comment>{content}</Comment>
            )}
        </CommentArea>
    );
};

export default CommentBox;

const CommentArea = styled.div`
    width: 100%;
    background: white;
    border-radius: 12px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const CommentHeader = styled.div`
    padding: 16px;
    background: #f8f9fa;
    display: flex;
    justify-content: space-between;
`;

const Comment = styled.div`
    padding: 16px;
`;

const CommentInfoWrap = styled.div`
    display: flex;
    gap: 8px;
`;

const StyledButton = styled.button`
    background: none;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
`;

const DeleteIcon = styled(DeleteOutlined)`
    color: red;
    font-size: 1rem;
`;

const EditIcon = styled(EditOutlined)`
    color: blue;
    font-size: 1rem;
`;
