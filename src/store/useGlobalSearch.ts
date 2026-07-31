import { create } from "zustand";

interface GlobalSearchState {
  search: string;

  setSearch: (value: string) => void;

  clearSearch: () => void;
}

export const useGlobalSearch = create<GlobalSearchState>((set) => ({
  search: "",

  setSearch: (value) =>
    set({
      search: value,
    }),

  clearSearch: () =>
    set({
      search: "",
    }),
}));
