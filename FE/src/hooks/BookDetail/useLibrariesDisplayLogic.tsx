import { message } from "antd";
import { useEffect, useRef, useState } from "react";

import { DEFAULT_INDEX } from "@/constants";
import useCheckLoanStatus from "@/hooks/Queries/Detail/useCheckLoanStatus";
import useLibraryOpenAPIQuery from "@/hooks/Queries/useLibraryOpenAPIQuery";
import { LibrariesType } from "@/types/libraryType";

export const useLibrariesDisplayLogic = (isbn13: string, regionCode: string, subRegionCode: string) => {
    const loanRequestRef = useRef({ libCode: "", isRequest: false });
    const [selectedLibrary, setSelectedLibrary] = useState<LibrariesType | null>(null);

    const { data, isLoading } = useLibraryOpenAPIQuery(
        "libSrchByBook",
        [regionCode, subRegionCode, isbn13],
        `&isbn=${isbn13}&region=${regionCode}&dtl_region=${subRegionCode}`
    );

    const { mutate } = useCheckLoanStatus(isbn13);

    useEffect(() => {
        if (!isLoading && data?.response?.libs.length > 0) {
            setSelectedLibrary(data.response.libs[DEFAULT_INDEX]);
        }
    }, [data, isLoading]);

    const handleLoanStatusClick = (libCode: string) => {
        if (loanRequestRef.current.libCode) {
            return message.error("현재 대출 조회 중입니다.");
        }

        loanRequestRef.current.libCode = libCode;
        loanRequestRef.current.isRequest = true;

        mutate(libCode, {
            onSuccess: (response) => {
                if (response.response.result.loanAvailable === "Y") {
                    message.success("대출이 가능합니다!");
                } else {
                    message.warning("현재 대출이 불가능합니다.");
                }
            },
            onSettled: () => {
                loanRequestRef.current.libCode = "";
                loanRequestRef.current.isRequest = false;
            },
        });
    };

    return {
        loanRequestRef,
        selectedLibrary,
        setSelectedLibrary,
        libraries: data?.response?.libs || [],
        isLoading,
        handleLoanStatusClick,
    };
};