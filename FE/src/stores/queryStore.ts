import { create } from "zustand";

interface StoreState {
    booksItem: [];
    searchText: string;
    page: number;
    size: number;
    selectedValue: string;
    keywordFilter: [];
    setBooksItem: (books: []) => void;
    setSearchText: (searchText: string) => void;
    setPage: (pageNum: number) => void;
    setSize: (size: number) => void;
    setSelectedValue: (value: string) => void;
    setKeywordFilter: (keyword: []) => void;
}

const useQueryStore = create<StoreState>((set) => ({
    booksItem: [],
    searchText: "",
    page: 0,
    size: 20,
    selectedValue: "title",
    keywordFilter: [],
    setBooksItem: (books) => set({ booksItem: books }),
    setSearchText: (searchText) => set({ searchText }),
    setPage: (pageNum) => set({ page: pageNum }),
    setSize: (size) => set({ size }),
    setSelectedValue: (value) => set({ selectedValue: value }),
    setKeywordFilter: (keyword) => set({ keywordFilter: keyword }),
}));

export default useQueryStore;
