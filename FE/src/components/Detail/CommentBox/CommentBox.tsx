import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Text, Heading } from "@components/Common";
import ModalComponent from "@components/Common/Modal/Modal";
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
    handleDelete: (_id: string) => void;
    handlePatch: (_id: string, comment: string) => void;
}
const CommentBox = ({
    _id,
    username,
    timestamp,
    content,
    isAuthor,
    handleDelete,
    handlePatch
}: CommentBoxProps) => {
    const [isEdit, setEdit] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleEdit = (comment: string) => {
        handlePatch(_id, comment)
        setEdit(false)
    }
    return (
        <CommentArea key={_id}>
            <CommentHeader>
                <CommentInfoWrap>
                    <Heading fontWeight="bold" fontSize="md">
                        {username}
                    </Heading>
                    <Text>{formatRelativeTime(timestamp)}</Text>
                </CommentInfoWrap>
                <ActionWrap>
                {isEdit ? (
                    <StyledButton onClick={() => setEdit(false)}>
                        수정 취소
                    </StyledButton>
                ) : (
                    isAuthor && (
                        <>
                            <StyledButton onClick={() => setEdit(true)}>
                                <EditIcon /> 수정
                            </StyledButton>
                            <StyledButton onClick={() => setModalOpen(true)}>
                                <DeleteIcon /> 삭제
                            </StyledButton>
                            <ModalComponent
                                isModalOpen={isModalOpen}
                                callBack={() => handleDelete(_id)}
                                onCancel={() => setModalOpen(false)}
                                message="정말 삭제 하시겠습니까?"
                            />
                        </>
                    )
                )}
                </ActionWrap>
            </CommentHeader>
            {isEdit ? (
                <CommentCreateTextarea curComment={content} onClick={handleEdit}/>
            ) : (
                <Comment>{content}</Comment>
            )}
        </CommentArea>
    );
};

export default CommentBox;

const ActionWrap = styled.div`
display: flex;
`;

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
