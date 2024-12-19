import { useQuery } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";

import { regionAPI } from "@/services";
const fetchGetSubRegion = async (regionCode: string) => {
    const response = await regionAPI.get(`regionCode=${regionCode}`);
    if (!response.ok) {
        throw new HTTPError(response.status);
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
