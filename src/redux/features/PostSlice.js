import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPost = createAsyncThunk("post/getPost", async (id) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return res.data;
});

export const deletePost = createAsyncThunk("post/deletePost", async (id) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { method: "DELETE" }
  );
  return res.data;
});

export const createPost = createAsyncThunk(
  "post/createPost",
  async ({ id, title, body }) => {
    const res = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
      title: title,
      body: body,
    });
    return res.data;
  }
);

export const updatePost = createAsyncThunk(
  "post/updatePost",
  async ({ id, title, body }) => {
    const res = await axios({
      method: "PUT",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      data: {
        title: title,
        body: body,
      },
    });
    return res.data;
  }
);

const postSlice = createSlice({
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  name: "post",
  extraReducers: (builder) => [
    builder
      // ==== getPost ====
      .addCase(getPost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==== deletePost ====
      .addCase(deletePost.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==== createPost ====
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  ],
});

export default postSlice.reducer;
