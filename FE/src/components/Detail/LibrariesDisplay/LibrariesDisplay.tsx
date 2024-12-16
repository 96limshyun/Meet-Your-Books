import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import { Heading } from "@components/Common";
import KakaoMap from "@components/Common/KakaoMap/KakaoMap";
import { message } from "antd";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { DEFAULT_INDEX } from "@/constants";
import useCheckLoanStatus from "@/hooks/Queries/Detail/useCheckLoanStatus";
import useDefaultSuspenseQuery from "@/hooks/Queries/useDefaultSuspenseQuery";
import { LibrariesType } from "@/types/libraryType";
interface LibrariesDisplayProps {
    isbn13: string;
    regionCode: string;
    subRegionCode: string;
}

const LibrariesDisplay = ({
    isbn13,
    regionCode,
    subRegionCode,
}: LibrariesDisplayProps) => {
    const loanRequestRef = useRef<{ libCode: string; isRequest: boolean }>({
        libCode: "",
        isRequest: false,
    });
    const [selectedLibrary, setSelectedLibrary] =
        useState<LibrariesType | null>(null);
    const { data, isLoading } = useDefaultSuspenseQuery(
        "libSrchByBook",
        `${regionCode}&${subRegionCode}`,
        `&isbn=${isbn13}&region=${regionCode}&dtl_region=${subRegionCode}`
    );

    const { mutate } = useCheckLoanStatus(isbn13);
    useEffect(() => {
        if (!isLoading && data.response.libs.length > 0) {
            setSelectedLibrary(data.response.libs[DEFAULT_INDEX]);
        }
    }, [data, isLoading]);
    if (isLoading) return <div>...isLoading</div>;

    const handleLoanStatusClick = (libCode: string) => {
        if (loanRequestRef.current.libCode)
            return message.error("현재 대출 조회 중입니다.");
        loanRequestRef.current.libCode = libCode;
        loanRequestRef.current.isRequest = true;

        mutate(libCode, {
            onSuccess: (data) => {
                if (data.response.result.loanAvailable === "Y")
                    return message.success("대출이 가능합니다!");
                return message.warning("현재 대출이 불가능합니다..");
            },
            onSettled: () => {
                loanRequestRef.current.libCode = "";
                loanRequestRef.current.isRequest = false;
            },
        });
    };

    const libraries: LibrariesType[] = data.response.libs;

    return (
        <>
            <ListWrap>
                {libraries.length === 0 ? (
                    <NoLibrariesMessage>
                        <SadIcon>😔</SadIcon>
                        <div>해당 지역에 도서관이 없어요...</div>
                        <div>다른 지역을 선택해보세요!</div>
                    </NoLibrariesMessage>
                ) : (
                    libraries.map((item) => (
                        <LibraryCard
                            key={item.lib.libCode}
                            $selected={
                                item.lib.libCode ===
                                selectedLibrary?.lib.libCode
                            }
                            onClick={() => setSelectedLibrary(item)}
                        >
                            <LibraryContent>
                                <LibraryDetails>
                                    <Heading fontSize="md" fontWeight="bold">
                                        {item.lib.libName}
                                    </Heading>
                                    <LibraryInfo>
                                        <InfoRow>
                                            <EnvironmentOutlined />
                                            <span>{item.lib.address}</span>
                                        </InfoRow>
                                        <InfoRow>
                                            <PhoneOutlined />
                                            <span>{item.lib.tel}</span>
                                        </InfoRow>
                                    </LibraryInfo>
                                </LibraryDetails>
                                <ActionsContainer>
                                    <HomepageButton
                                        href={item.lib.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        홈페이지
                                    </HomepageButton>
                                    <StyledButton
                                        onClick={() =>
                                            handleLoanStatusClick(
                                                item.lib.libCode
                                            )
                                        }
                                        disabled={
                                            loanRequestRef.current.libCode ===
                                                item.lib.libCode &&
                                            loanRequestRef.current.isRequest
                                        }
                                    >
                                        {loanRequestRef.current.libCode ===
                                            item.lib.libCode &&
                                        loanRequestRef.current.isRequest
                                            ? "요청 중"
                                            : "대출확인"}
                                    </StyledButton>
                                </ActionsContainer>
                            </LibraryContent>
                        </LibraryCard>
                    ))
                )}
            </ListWrap>
            {selectedLibrary && libraries.length !== 0 && (
                <KakaoMap
                    lat={Number(selectedLibrary.lib.latitude)}
                    lng={Number(selectedLibrary.lib.longitude)}
                />
            )}
        </>
    );
};

export default LibrariesDisplay;

const ListWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: 350px;
    overflow-y: auto;
    border: 1px solid #e5e7eb;
    border-radius: 8px;

    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #94a3b8;
    }
    &::-webkit-scrollbar-track {
        background: #f1f5f9;
    }
`;

const LibraryCard = styled.div<{ $selected: boolean }>`
    padding: 1rem;
    border: 1px solid ${({ $selected }) => ($selected ? "#3b82f6" : "#e5e7eb")};
    border-radius: 0.5rem;
    background-color: ${({ $selected }) => ($selected ? "#eff6ff" : "white")};
    cursor: pointer;
    transition: all 0.2s ease;
`;

const LibraryContent = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;
const LibraryDetails = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const LibraryInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    font-size: 0.875rem;
    color: #6b7280;
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    min-width: 140px;
`;

const buttonStyles = css`
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    font-weight: 500;
    border-radius: 0.375rem;
    text-align: center;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    display: inline-block;
`;

export const HomepageButton = styled.a`
    ${buttonStyles}
    background-color: #3b82f6;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: #2563eb;
    }
`;

export const StyledButton = styled.button`
    ${buttonStyles}
    background-color: #10b981;
    color: white;
    border: none;

    &:hover {
        background-color: #059669;
    }
`;

const NoLibrariesMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: #fef9c3;
    color: #f59e0b;
    border: 1px solid #fcd34d;
    border-radius: 8px;
    padding: 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    gap: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: auto;
`;

const SadIcon = styled.div`
    font-size: 2rem;
`;
