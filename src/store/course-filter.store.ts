import {create} from "zustand";

interface CourseFilterState {
  page: number;
  setPage: (p: number) => void;

  category: string;
  setCategory: (c: string) => void;

  search: string;
  setSearch: (s: string) => void;

  rating: number | null;
  setRating: (r: number | null) => void;

  limit: number;
  setLimit: (l: number) => void;
}

export const useCourseFilterStore = create<CourseFilterState>((set) => ({
  page: 1,
  setPage: (p) => set({page: p}),

  category: "",
  setCategory: (c) => set({category: c}),

  search: "",
  setSearch: (s) => set({search: s}),

  rating: null,
  setRating: (r) => set({rating: r}),

  limit: 20,
  setLimit: (l) => set({limit: l}),
}));
