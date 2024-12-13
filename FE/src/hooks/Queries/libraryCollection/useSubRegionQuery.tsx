import { useQuery } from "@tanstack/react-query";

import { regionAPI } from "@/services";

const fetchGetSubRegion = async (regionCode: string) => {
    const response = await regionAPI.get(`regionCode=${regionCode}`);
    if (!response.ok) {
        throw new Error("서브지역 api 에러");
    }
    return await response.json();
};

const useSubRegionQuery = (regionCode: string) => {
    return useQuery({
        queryKey: ["subRegion", regionCode],
        queryFn: () => fetchGetSubRegion(regionCode),
        throwOnError: true,
    });
};

export default useSubRegionQuery;
