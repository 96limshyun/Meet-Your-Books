import useUserInfo from "../Common/useUserInfo";
import useCreateCommentMutation from "../Queries/comments/useCreateCommentMutation";
import useDeleteCommentMutation from "../Queries/comments/useDeleteCommentMutation";
import usePatchCommentsMutation from "../Queries/comments/usePatchCommentsMutation";

const useCommentHandlers = (isbn: string) => {
    const { userId, userNickname } = useUserInfo()
    const { mutate: createMutate } = useCreateCommentMutation(isbn);
    const { mutate: deleteMutate } = useDeleteCommentMutation(isbn);
    const { mutate: patchMutate } = usePatchCommentsMutation(isbn);

    const handlePatchComment = (_id: string, comment: string) =>
        patchMutate({ _id, body: comment });

    const handleDeleteComment = (_id: string) => deleteMutate(_id);

    const handleCreateCommentClick = (comment: string) => {
        const newComment = {
            userid: userId,
            username: userNickname,
            content: comment,
        };
        createMutate(newComment);
    };
    return {userId, handleCreateCommentClick, handleDeleteComment, handlePatchComment };
};

export default useCommentHandlers;
