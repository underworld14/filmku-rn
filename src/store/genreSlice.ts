import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Genre {
  id: number;
  name: string;
}

export interface GenreState {
  data: Genre[];
}

const initialState: GenreState = {
  data: [],
};

export const counterSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setGenres: (state, action: PayloadAction<GenreState>) => {
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGenres } = counterSlice.actions;

export default counterSlice.reducer;
