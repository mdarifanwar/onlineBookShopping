import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:5000/api/cart";

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.userInfo?.token;
  const { data } = await axios.get(API_URL + "/", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.items || [];
});

export const addToCartAPI = createAsyncThunk("cart/addToCartAPI", async ({ bookId, qty }, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.userInfo?.token;
  const { data } = await axios.post(
    API_URL + "/add",
    { bookId, qty },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.items;
});

export const updateCartItemAPI = createAsyncThunk("cart/updateCartItemAPI", async ({ bookId, qty }, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.userInfo?.token;
  const { data } = await axios.put(
    API_URL + "/update",
    { bookId, qty },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data.items;
});

export const removeCartItemAPI = createAsyncThunk("cart/removeCartItemAPI", async (bookId, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.userInfo?.token;
  const { data } = await axios.delete(API_URL + `/remove/${bookId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.items;
});

export const clearCartAPI = createAsyncThunk("cart/clearCartAPI", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const token = state.user.userInfo?.token;
  await axios.delete(API_URL + "/clear", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCartAPI.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartItemAPI.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeCartItemAPI.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(clearCartAPI.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export default cartSlice.reducer;
