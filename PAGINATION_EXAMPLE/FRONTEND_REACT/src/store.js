import { configureStore } from "@reduxjs/toolkit";
import paginationPostsSlice from "./paginationPostSlice";

export const store = configureStore({
  reducer: {
    paginationPosts: paginationPostsSlice,
  },
});
