import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaginationState {
  currentPage: number;
  totalPages: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  totalPages: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
  },
});

export const { setPage, setTotalPages, resetPage } = paginationSlice.actions;
export default paginationSlice.reducer;
