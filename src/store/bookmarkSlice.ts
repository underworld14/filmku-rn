import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MovieDetail } from "types/movie";

export interface BookmarkState {
  data: MovieDetail[];
}

const initialState: BookmarkState = {
  data: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<MovieDetail>) => {
      state.data.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((movie) => movie.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
