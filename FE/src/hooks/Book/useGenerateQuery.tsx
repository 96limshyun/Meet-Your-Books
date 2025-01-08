import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { DROP_DOWN_ITEMS } from "@/constants";
import useBookStore from "@/stores/bookStore";

const useGenerateQuery = () => {
    const {
        searchText,
        size,
        sort,
        order,
        selectedValue,
        keyword,
        setSearchText,
        setOrder,
        setSort,
        setSelectedValue,
        setKeyword,
    } = useBookStore();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const queryParams = {
            ...(searchText && {
                [selectedValue.value]: searchText.replace(/\s+/g, ""),
            }),
            pageSize: size.toString(),
            ...(sort && { sort }),
            ...(order && { order }),
            ...(keyword.length > 0 && { keyword: keyword.join(";") }),
            exactMatch: "false",
        };
        setSearchParams(queryParams);
    }, [
        searchText,
        size,
        sort,
        order,
        selectedValue,
        keyword,
        setSearchParams,
    ]);

    useEffect(() => {
        const params = Object.fromEntries(searchParams.entries())
        const searchKeys = ["title", "author", "publisher"].find(key => params[key]);
        const selectedDropDownItem = DROP_DOWN_ITEMS.find(item => item.value === searchKeys)
        const keywords = params.keyword ? params.keyword.split(";") : []

        setSearchText(searchKeys ? params[searchKeys] : "")
        setSort(params.sort || "")
        setOrder(params.order || "")
        setKeyword(keywords)
        setSelectedValue(selectedDropDownItem || { value: "title", label: "제목" })
    }, [searchParams, setKeyword, setOrder, setSearchText, setSelectedValue, setSort])
};

export default useGenerateQuery;
