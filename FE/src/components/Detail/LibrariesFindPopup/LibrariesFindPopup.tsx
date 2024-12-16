import { CloseOutlined } from "@ant-design/icons";
import { Heading } from "@components/Common";
import LoadingSpin from "@components/Common/Spin/Spin";
import { Suspense, useLayoutEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

import { DEFAULT_INDEX } from "@/constants";
import { REGIONS } from "@/constants/regions";
import useOnClickOutside from "@/hooks/Common/useOnClickOutside";
import useSubRegionQuery from "@/hooks/Queries/Detail/useSubRegionQuery";
import { RegionType } from "@/types/regionType";

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
    const [selectedRegion, setSelectedRegion] = useState(
        REGIONS[DEFAULT_INDEX]
    );
    const { data: subRegion = [], isLoading: subRegionLoading } =
        useSubRegionQuery(selectedRegion.code);

    const [selectedSubRegion, setSelectedSubRegion] =
        useState<RegionType | null>(null);

    const inSideRef = useRef<HTMLDivElement | null>(null);
    useOnClickOutside(inSideRef, closePopup);

    useLayoutEffect(() => {
        if (!subRegionLoading && subRegion.length > 0) {
            setSelectedSubRegion(subRegion[DEFAULT_INDEX]);
        }
    }, [subRegion, subRegionLoading]);

    const handleRegionClick = (region: RegionType) => setSelectedRegion(region);
    const handleSubRegionClick = (region: RegionType) =>
        setSelectedSubRegion(region);

    return (
        <Overlay>
            <Card ref={inSideRef}>
                <PopupHeader>
                    <Heading fontWeight="bold" fontSize="lg">
                        소장 도서관 검색
                    </Heading>
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
                        {subRegion.length > 0 && selectedSubRegion && (
                            <RegionSelectBox
                                regionBoxName="상세지역"
                                regions={subRegion}
                                curSelected={selectedSubRegion.name}
                                onClick={handleSubRegionClick}
                            />
                        )}
                    </RegionDetailWrap>
                </RegionSelectWrap>
                <Suspense fallback={<LoadingSpin/>}>
                {selectedSubRegion && (
                    <LibrariesDisplay
                        isbn13={isbn13}
                        regionCode={selectedRegion.code}
                        subRegionCode={selectedSubRegion.code}
                    />
                )}
                </Suspense>
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

// 댓글달때 로그인 필요 모달
// 상세페이지 들어갈때 로딩
// 에러바운더리 처리