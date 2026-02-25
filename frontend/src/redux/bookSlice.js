import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch books with pagination
export const fetchBooks = createAsyncThunk(
  "books/fetch",
  async ({ page = 1, pageSize = 20 } = {}, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/books?page=${page}&pageSize=${pageSize}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    page: 1,
    pageSize: 20,
    totalPages: 1,
    total: 0,
  },
  reducers: {
    resetBooks: (state) => {
      state.books = [];
      state.page = 1;
      state.totalPages = 1;
      state.total = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        // If page === 1, replace; else, append
        if (action.payload.page === 1) {
          state.books = action.payload.books;
        } else {
          state.books = [...state.books, ...action.payload.books];
        }
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBooks } = bookSlice.actions;
export default bookSlice.reducer;