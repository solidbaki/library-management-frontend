import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

interface Book {
  id: number;
  name: string;
  author: string;
  year: number;
  currentOwner: User | null;
}

interface BooksState {
  books: Book[];
  bookDetail: Book | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: BooksState = {
  books: [],
  bookDetail: null,
  status: "idle",
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.get("http://localhost:3000/books");
  return response.data;
});

export const fetchBookDetail = createAsyncThunk(
  "books/fetchBookDetail",
  async (bookId: number) => {
    const response = await axios.get(`http://localhost:3000/books/${bookId}`);
    return response.data;
  }
);

export const lendBook = createAsyncThunk(
  "books/lendBook",
  async ({ userId, bookId }: { userId: number; bookId: number }) => {
    const response = await axios.post(
      "http://localhost:3000/borrowed-books/borrow",
      {
        userId,
        bookId,
      }
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
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchBookDetail.fulfilled, (state, action) => {
        state.bookDetail = action.payload;
        state.status = "succeeded";
      })
      .addCase(lendBook.fulfilled, (state, action) => {
        if (state.bookDetail) {
          state.bookDetail.currentOwner = action.payload.user;
        }
      });
  },
});

export default booksSlice.reducer;
