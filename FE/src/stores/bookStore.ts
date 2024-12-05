import { create } from "zustand";

import { Sort, Order } from "@/types/booksType";


interface StoreState {
    booksItem: [];
    searchText: string;
    page: number;
    size: number;
    sort: Sort;
    order: Order;
    selectedValue: string;
    keywordFilter: [];
    exactMatch: boolean;
    setBooksItem: (books: []) => void;
    setSearchText: (searchText: string) => void;
    setPage: (pageNum: number) => void;
    setSize: (size: number) => void;
    setSort: (type: Sort) => void;
    setOrder: (type: Order) => void;
    setSelectedValue: (value: string) => void;
    setKeywordFilter: (keyword: []) => void;
    setExactMatch: (isExactMatch: boolean) => void;
}

const useBookStore = create<StoreState>((set) => ({
    booksItem: [],
    searchText: "",
    page: 0,
    size: 20,
    sort: "",
    order: "",
    selectedValue: "title",
    keywordFilter: [],
    exactMatch: false,
    setBooksItem: (books) => set({ booksItem: books }),
    setSearchText: (searchText) => set({ searchText }),
    setPage: (pageNum) => set({ page: pageNum }),
    setSize: (size) => set({ size }),
    setSort: (type) => set({sort: type}),
    setOrder: (type) => set({order: type}),
    setSelectedValue: (value) => set({ selectedValue: value }),
    setKeywordFilter: (keyword) => set({ keywordFilter: keyword }),
    setExactMatch: (isExactMatch) => set({exactMatch: isExactMatch})
}));

export default useBookStore;
