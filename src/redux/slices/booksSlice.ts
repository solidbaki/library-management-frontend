import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BookDetail } from "./types";

export interface BooksState {
  books: BookDetail[];
  bookDetail: BookDetail | null;
  status: "idle" | "loading" | "failed";
}

const initialState: BooksState = {
  books: [],
  bookDetail: null,
  status: "idle",
};

// Fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("http://localhost:3000/books");
  return response.data;
});

// Fetch book detail
export const fetchBookDetail = createAsyncThunk(
  "books/fetchBookDetail",
  async (bookId: number) => {
    const response = await axios.get(`http://localhost:3000/books/${bookId}`);
    return response.data;
  }
);

// Lend a book
export const lendBook = createAsyncThunk(
  "books/lendBook",
  async ({ bookId, userId }: { bookId: number; userId: number }) => {
    const response = await axios.post(
      `http://localhost:3000/books/${bookId}/lend`,
      { userId }
    );
    return response.data;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "idle";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchBookDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.bookDetail = action.payload;
      })
      .addCase(fetchBookDetail.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(lendBook.fulfilled, (state, action) => {
        if (state.bookDetail) {
          const userId = action.meta.arg.userId;
          const userName = action.payload.userName; // Assume the API returns the user's name

          state.bookDetail.currentOwner = { id: userId, name: userName }; // Update currentOwner
        }
      });
  },
});

export default booksSlice.reducer;
