import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./cartSlice";
import wishListReducer from "./wishListSlice";
import productReducer from "./selectSlice";
import categoryReducer from "./categorySlice";
import uiReducer from "./uiSlice";
import activeButtonReducer from "./activeButtonSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
    product: productReducer,
    category: categoryReducer,
    ui: uiReducer,
    activeBtn: activeButtonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
