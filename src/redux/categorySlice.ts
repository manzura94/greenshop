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
    setSelectedSize: (state, action: PayloadAction<string>) => {
      state.selectedCategory = plants.filter(
        (item) => item.size.toLowerCase() === action.payload.toLowerCase(),
      );
    },
    setSortingAll: (state, action: PayloadAction<ListItem[]>) => {
      state.selectedCategory = action.payload;
    },
    setSortingNew: (state, action: PayloadAction<ListItem[]>) => {
      state.selectedCategory = action.payload.filter(
        (item) => item.isNew === true,
      );
    },
    setSortingSale: (state, action: PayloadAction<ListItem[]>) => {
      state.selectedCategory = action.payload.filter(
        (item) => item.sale === true,
      );
    },
    setPriceFilter: (state, action: PayloadAction<number[]>) => {
      const [minPrice, maxPrice] = action.payload;
      state.selectedCategory = plants.filter(
        (item) => +item.price >= minPrice && +item.price <= maxPrice,
      );
    },
  },
});

export const {
  setSelectCategory,
  setSelectedSize,
  setSortingAll,
  setSortingNew,
  setSortingSale,
  setPriceFilter,
} = categorySlice.actions;
export default categorySlice.reducer;
