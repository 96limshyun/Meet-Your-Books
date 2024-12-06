import { useMemo } from "react";

import useBookStore from "@/stores/bookStore";

const useGenerateQuery = () => {
    const { searchText, page, size, sort, order, selectedValue, keyword} =
        useBookStore();

    const queryString = useMemo(() => {
        const queryParams = {
            ...(searchText && { [selectedValue]: searchText }),
            pageNo: page,
            pageSize: size,
            ...(sort && { sort }),
            ...(order && { order }),
            ...(keyword.length > 0 && { keyword: keyword.join(";") }),
            exactMatch: false,
        };
    
        return Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
    }, [searchText, page, size, sort, order, selectedValue, keyword]);

    return queryString;
};

export default useGenerateQuery;
