import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  size: string;
  isNew: boolean;
  sale: boolean;
}

interface ListState {
  items: ListItem[];
}

const initialState: ListState = {
  items: [],
};

const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<ListItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addToList } = wishListSlice.actions;
export default wishListSlice.reducer;
