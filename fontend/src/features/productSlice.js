import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  status: null,
  // error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productFetch.pending, (state, action) => {
      state.status = "pending";
    });
    builder.addCase(productFetch.fulfilled, (state, action) => {
      state.status = "success";
      state.items = action.payload;
    });
    builder.addCase(productFetch.rejected, (state, action) => {
      state.status = "Rejected";
    });
  },
});

/**
 * ====== THUNK ======
 *
 */
const fakeAPI = "http://localhost:5000";

export const productFetch = createAsyncThunk(
  "products/productsFetch",
  async () => {
    const res = await axios.get(`${fakeAPI}/products`);
    return res?.data;
  }
);

export default productsSlice.reducer;
