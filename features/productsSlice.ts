import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import { Products } from "@/modules/products";

interface productsState {
  loading: boolean;
  error: boolean;
  products: Products[];
}

const initialState = {
  loading: false,
  products: [],
  error: false,
} as productsState;

export const fetchProductsData = createAsyncThunk(
  "products/fetchProductsData",
  async (data, thunkApi) => {
    try {
      const data = await axios.get<Products[]>(
        "https://fakestoreapi.com/products"
      );
      return data.data;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.products = [];
      })
      .addCase(
        fetchProductsData.fulfilled,
        (state, action: PayloadAction<Products[]>) => {
          state.error = false;
          state.products = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchProductsData.rejected, (state) => {
        state.error = true;
        state.loading = false;
        state.products = [];
      });
  },
});

export default productsSlice.reducer;
