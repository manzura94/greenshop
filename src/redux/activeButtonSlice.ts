import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface activeBtnState {
  activeClass: string;
}

const initialState: activeBtnState = {
  activeClass: "",
};

const activeBtnSlice = createSlice({
  name: "activeBtn",
  initialState,
  reducers: {
    setActiveButton: (state, action: PayloadAction<string>) => {
      state.activeClass = action.payload;
    },
  },
});

export const { setActiveButton } = activeBtnSlice.actions;
export default activeBtnSlice.reducer;
