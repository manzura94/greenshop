import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  size: string;
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
    addToList: (state, action: PayloadAction<ListItem>) => {
      state.items.push(action.payload);
    },
    removeFromList: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToList, removeFromList } = wishListSlice.actions;
export default wishListSlice.reducer;
