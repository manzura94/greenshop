import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./cartSlice";
import wishListReducer from "./wishListSlice";
import productReducer from "./selectSlice";
import searchReducer from "./searchSlice";
import categoryReducer from "./categorySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
    product: productReducer,
    search: searchReducer,
    category: categoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
