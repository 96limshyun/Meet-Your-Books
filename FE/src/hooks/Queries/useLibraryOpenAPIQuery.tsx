import { useQuery } from "@tanstack/react-query";

const BACK_END_API_URL = import.meta.env.VITE_BACK_END_API_URL;

const fetchLibraryOpenAPI = async (path: string, query: string) => {
    const url = `${BACK_END_API_URL}libraryOpenAPI?path=${path}&query=${encodeURIComponent(query)}`
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("에러");
    }
    return await response.json();
};

const useLibraryOpenAPIQuery = (path: string, key: string[], query: string) => {
    return useQuery({
        queryFn: () => fetchLibraryOpenAPI(path, query),
        queryKey: [...key],
        throwOnError: true,
    });
};

export default useLibraryOpenAPIQuery;
