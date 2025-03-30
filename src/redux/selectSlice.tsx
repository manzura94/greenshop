import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListItem } from "./wishListSlice";

export interface ProductState {
  selectedProduct: ListItem | null;
}

const initialState: ProductState = {
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<ListItem>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const { setSelectedProduct, clearSelectedProduct } =
  productSlice.actions;
export default productSlice.reducer;
