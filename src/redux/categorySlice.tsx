import { plants } from "@/utils/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItem } from "./wishListSlice";

export interface CategoryState {
  selectedCategory: ListItem[];
}

const initialState: CategoryState = {
  selectedCategory: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setSelectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = plants.filter(
        (item) => item.category.toLowerCase() === action.payload.toLowerCase(),
      );
    },
  },
});

export const { setSelectCategory } = categorySlice.actions;
export default categorySlice.reducer;
