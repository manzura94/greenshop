// In your Redux slice for filters & pagination

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  filters: {
    category?: string;
    size?: string;
    priceRange?: number[];
    sale?: boolean;
    isNew?: boolean;
  };
  currentPage: number;
  totalPages: number;
}

const initialState: UIState = {
  filters: {},
  currentPage: 1,
  totalPages: 1,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<UIState["filters"]>) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
  },
});

export const { setFilters, setCurrentPage, setTotalPages } = uiSlice.actions;
export default uiSlice.reducer;
