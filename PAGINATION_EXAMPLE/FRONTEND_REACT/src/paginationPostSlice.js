import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching posts
export const fetchPaginationPosts = createAsyncThunk(
  "posts/fetchPosts",
  // eslint-disable-next-line no-unused-vars
  async ({ pageNum = 1, limit = 10 }, { dispatch }) => {
    const response = await fetch(
      `http://localhost:8000/data?page=${pageNum}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return await response.json();
  }
);

const paginationPostsSlice = createSlice({
  name: "paginationPosts",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    limit: 10,
    pageNum: 1,
  },
  reducers: {
    setLimit: (state, { payload }) => {
      //Can setstatus here too like status.status = "idle"
      state.pageNum = 1;
      state.limit = payload;
    },
    setPageNum: (state, { payload }) => {
      //Can setstatus here too like status.status = "idle"
      state.pageNum = payload;
    },
    setStatus: (state, { payload }) => {
      state.status = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginationPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPaginationPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPaginationPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default paginationPostsSlice.reducer;
export const { setLimit, setPageNum, setStatus } = paginationPostsSlice.actions;
