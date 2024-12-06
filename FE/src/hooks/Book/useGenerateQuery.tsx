import { useEffect, useState } from "react";

import useBookStore from "@/stores/bookStore";

const useGenerateQuery = () => {
    const { searchText, page, size, sort, order, selectedValue, keyword} =
        useBookStore();
    const [query, setQuery] = useState(`?page=${page}&size=${size}`);

    useEffect(() => {
        const queryParams = {
            ...(searchText && { [selectedValue]: searchText }),
            ...({pageNo: page}),
            ...({pageSize: size}),
            ...(sort && {sort}),
            ...(order && {order}),
            ...(keyword.length > 0 && {keyword: keyword.map(item => item).join(";")}),
            ...({exactMatch: false}),
        };

        const queryString = Object.entries(queryParams)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        setQuery(`?${queryString}`);
    }, [searchText, page, size, sort, order, selectedValue, keyword]);

    return query;
};

export default useGenerateQuery;
