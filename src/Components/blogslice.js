import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBlog = createAsyncThunk("blog/fetchBlog", async () => {
  const res = await fetch ("https://jsonfakery.com/blogs");
  const data = await res.json();
  console.log(data);
  return data;
});


const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blog = action.payload;
      })
      .addCase(fetchBlog.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default blogSlice.reducer;
