import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItem } from "./wishListSlice";

export interface CategoryState {
  selectedCategory: ListItem[] | null;
}

const initialState: CategoryState = {
  selectedCategory: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectCategory: (state, action: PayloadAction<ListItem[]>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const { setSelectCategory } = categorySlice.actions;
export default categorySlice.reducer;
