import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import counterReducer from "./counterSlice";
import genreReducer from "./genreSlice";
import bookmarkSlice from "./bookmarkSlice";

const reducer = combineReducers({ counter: counterReducer, genres: genreReducer, bookmarks: bookmarkSlice });
const persistedReducer = persistReducer(
  {
    key: "filmkuApp",
    storage: AsyncStorage,
    version: 0,
    whitelist: ["genres", "bookmarks"],
  },
  reducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
