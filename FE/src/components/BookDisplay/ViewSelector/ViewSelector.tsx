import { MenuOutlined, AppstoreOutlined } from "@ant-design/icons";
import { BaseHeading } from "@components/ui";
import React from "react";
import styled from "styled-components";

import { ViewType } from "@/types/booksType";
interface ViewSelectorProps {
    title: string;
    setViewMode: React.Dispatch<React.SetStateAction<ViewType>>;
    viewMode: ViewType;
}

const ViewSelector = ({ title, viewMode, setViewMode }: ViewSelectorProps) => {
    return (
        <Container>
            <BaseHeading fontSize="xl" fontWeight="bold">{title}</BaseHeading>
            <IconButtonGroup>
                <ListButton
                    $active={viewMode}
                    onClick={() => setViewMode("list")}
                >
                    <MenuOutlined />
                </ListButton>
                <GridButton
                    $active={viewMode}
                    onClick={() => setViewMode("grid")}
                >
                    <AppstoreOutlined />
                </GridButton>
            </IconButtonGroup>
        </Container>
    );
};

export default ViewSelector;

const ModeButton = styled.span`
    align-content: center;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    padding: 1px 6px;
`;

const GridButton = styled(ModeButton)<{ $active: ViewType }>`
    color: ${({ $active }) => ($active === "grid" ? "#0064FF" : "gray")};
`;

const ListButton = styled(ModeButton)<{ $active: ViewType }>`
    color: ${({ $active }) => ($active === "list" ? "#0064FF" : "gray")};
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const IconButtonGroup = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-right: 0.5rem;
`;
