import { useLayoutEffect, useRef, useState } from "react";

import { DEFAULT_INDEX } from "@/constants";
import { REGIONS } from "@/constants/regions";
import useOnClickOutside from "@/hooks/Common/useOnClickOutside";
import { RegionType } from "@/types/regionType";

import useSubRegionQuery from "../Queries/Detail/useSubRegionQuery";


const useLibrariesPopupLogic = (
    closePopup: () => void) => {
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
    return {
        selectedRegion,
        subRegion,
        subRegionLoading,
        selectedSubRegion,
        inSideRef,
        handleRegionClick,
        handleSubRegionClick,
    };
};

export default useLibrariesPopupLogic;
