import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import useGenerateQuery from "./useGenerateQuery";
import useBookInfinityQuery from "../Queries/useBookInfinityQuery";

const useBookLogic = () => {
    const queryString = useGenerateQuery();
    const { data, isSuccess } = useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const response = await fetch(
                "http://data4library.kr/api/srchBooks?authKey=bc1a3c82651b5c3e65599b87bb74151e1cc1be37d1b6514a1287c7f42fd770bf"
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json(); // Response 객체를 JSON으로 파싱
        },
    });

    
    return {
        data,
        isSuccess
    };
};

export default useBookLogic;
