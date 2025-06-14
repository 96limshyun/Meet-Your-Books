import { CloseOutlined } from "@ant-design/icons";
import { BaseHeading } from "@components/ui";
import styled, { keyframes } from "styled-components";

import { REGIONS } from "@/constants/regions";
import useLibrariesPopupLogic from "@/hooks/BookDetail/useLibrariesPopupLogic";

import LibrariesDisplay from "../LibrariesDisplay/LibrariesDisplay";
import RegionSelectBox from "../RegionSelectBox/RegionSelectBox";
interface LibrariesFindPopupProps {
    closePopup: () => void;
    isbn13: string;
}
const LibrariesFindPopup = ({
    closePopup,
    isbn13,
}: LibrariesFindPopupProps) => {
    const {
        selectedRegion,
        subRegion,
        subRegionLoading,
        selectedSubRegion,
        inSideRef,
        handleRegionClick,
        handleSubRegionClick,
    } = useLibrariesPopupLogic(closePopup);

    return (
        <Overlay>
            <Card ref={inSideRef}>
                <PopupHeader>
                    <BaseHeading fontWeight="bold" fontSize="lg">
                        소장 도서관 검색
                    </BaseHeading>
                    <CloseOutlined onClick={closePopup} />
                </PopupHeader>
                <RegionSelectWrap>
                    <RegionDetailWrap>
                        <RegionSelectBox
                            regionBoxName="지역"
                            regions={REGIONS}
                            curSelected={selectedRegion.name}
                            onClick={handleRegionClick}
                        />
                    </RegionDetailWrap>
                    <RegionDetailWrap>
                        <RegionDetailWrap>
                            <RegionSelectBox
                                regionBoxName="상세지역"
                                regions={subRegionLoading ? ["종로구"] : subRegion}
                                curSelected={selectedSubRegion?.name || ""}
                                onClick={handleSubRegionClick}
                            />
                        </RegionDetailWrap>
                    </RegionDetailWrap>
                </RegionSelectWrap>
                {selectedSubRegion && (
                    <LibrariesDisplay
                        isbn13={isbn13}
                        regionCode={selectedRegion.code}
                        subRegionCode={selectedSubRegion.code}
                    />
                )}
            </Card>
        </Overlay>
    );
};

export default LibrariesFindPopup;

const fadeIn = keyframes`
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Card = styled.div`
    background: white;
    width: 450px;
    height: 700px;
    border-radius: 12px;
    padding: 24px;
    animation: ${fadeIn} 0.3s ease-out forwards;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const PopupHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

const RegionSelectWrap = styled.div`
    display: flex;
    gap: 1rem;
`;

const RegionDetailWrap = styled.div`
    flex: 1;
`;
