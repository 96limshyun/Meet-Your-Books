import { StarOutlined, StarFilled } from "@ant-design/icons";
import ModalComponent from "@components/Modal/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import useAddFavoriteMutation from "@/hooks/Queries/favorites/useAddFavoriteMutation";
import { useFavoritesQuery } from "@/hooks/Queries/favorites/useFavoritesQuery";
import useRemoveFavoriteMutation from "@/hooks/Queries/favorites/useRemoveFavoriteMutation";
import { BookDoc } from "@/types/booksType";

interface FavoritesBtnProps {
    item: BookDoc;
}

const FavoriteBtn = ({ item }: FavoritesBtnProps) => {
    const USER_INFO = JSON.parse(localStorage.getItem("USER_INFO") || "{}");
    const { data } = useFavoritesQuery(USER_INFO.id);
    const books = data?.book || [];

    const isFavorite = books.some(
        (book: { isbn13: string }) => book.isbn13 === item.isbn13
    );

    const addFavoriteMutation = useAddFavoriteMutation(USER_INFO.id);
    const removeFavoriteMutation = useRemoveFavoriteMutation(USER_INFO.id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login");
    };
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!USER_INFO?.id) {
            setIsModalOpen(true);
        }

        if (isFavorite) {
            removeFavoriteMutation.mutate(item.isbn13);
        } else {
            addFavoriteMutation.mutate(item);
        }
    };

    return (
        <>
            <ButtonWrap onClick={handleFavorite}>
                {isFavorite ? <FavoriteButton /> : <UnFavoriteButton />}
            </ButtonWrap>
            <div onClick={() => setIsModalOpen(true)}>
                <ModalComponent
                    isModalOpen={isModalOpen}
                    callBack={handleLoginRedirect}
                    onCancel={() => setIsModalOpen(true)}
                    message="로그인이 필요합니다!"
                />
            </div>
        </>
    );
};

export default FavoriteBtn;

const ButtonWrap = styled.div`
    font-size: 1.3rem;
`;

const UnFavoriteButton = styled(StarOutlined)`
    color: #fadb14;
`;
const FavoriteButton = styled(StarFilled)`
    color: #fadb14;
`;
