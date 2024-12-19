import { useSuspenseQuery } from "@tanstack/react-query";
import { HTTPError } from "async-error-boundary";
const BACK_END_API_URL = import.meta.env.VITE_BACK_END_API_URL;

const fetchLibraryOpenAPI = async (path: string, query: string) => {
    const url = `${BACK_END_API_URL}libraryOpenAPI?path=${path}&query=${encodeURIComponent(query)}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new HTTPError(response.status);
    }
    return await response.json();
};

const useLibraryOpenAPISuspenseQuery = (path: string, key: string[], query: string) => {
    return useSuspenseQuery({
        queryFn: () => fetchLibraryOpenAPI(path, query),
        queryKey: [...key],
    });
};

export default useLibraryOpenAPISuspenseQuery;
