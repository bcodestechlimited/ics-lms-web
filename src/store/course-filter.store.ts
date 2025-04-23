import { create } from "zustand";

// Define the state interface
interface CourseFilterState {
  search: string;
  rating: number | null;
  topic: string;
  page: number;
  limit: number;
}

// Define the actions interface
interface CourseFilterActions {
  setSearch: (search: string) => void;
  setRating: (rating: number | null) => void;
  setTopic: (topic: string) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
}

// Combine state and actions
type CourseFilterStore = CourseFilterState & CourseFilterActions;

// Initial state
const initialState: CourseFilterState = {
  search: "",
  rating: null,
  topic: "",
  page: 1,
  limit: 10,
};

// Create the store
export const useCourseFilterStore = create<CourseFilterStore>((set) => ({
  // Initial state
  ...initialState,
  // Actions
  setSearch: (search: string) => set({search}),
  setRating: (rating: number | null) => set({rating}),
  setTopic: (topic: string) => set({topic}),
  setPage: (page: number) => set({page}),
  setLimit: (limit: number) => set({limit}),
  resetFilters: () => set(initialState),
}));
