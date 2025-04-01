import { plants } from "@/utils/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItem } from "./wishListSlice";

export interface CategoryState {
  selectedCategory: ListItem[];
  selectedSize: ListItem[];
}

const initialState: CategoryState = {
  selectedCategory: [],
  selectedSize: [],
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
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedCategory = plants.filter(
        (item) => item.size.toLowerCase() === action.payload.toLowerCase(),
      );
    },
  },
});

export const { setSelectCategory, setSelectedSize } = categorySlice.actions;
export default categorySlice.reducer;
