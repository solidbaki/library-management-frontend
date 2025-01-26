import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Book {
  id: number;
  name: string;
  author: string;
  year: number;
}

interface UserDetail {
  id: number;
  name: string;
  currentBooks: Book[];
  pastBooks: Book[];
}

interface UsersState {
  users: { id: number; name: string }[];
  userDetail: UserDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UsersState = {
  users: [],
  userDetail: null,
  status: "idle",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
});

export const fetchUserDetail = createAsyncThunk(
  "users/fetchUserDetail",
  async (userId: number) => {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    return response.data;
  }
);

export const returnBook = createAsyncThunk(
  "users/returnBook",
  async ({ userId, bookId }: { userId: number; bookId: number }) => {
    const response = await axios.post(
      "http://localhost:3000/borrowed-books/return",
      {
        userId,
        bookId,
      }
    );
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.userDetail = action.payload;
        state.status = "succeeded";
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        if (state.userDetail) {
          state.userDetail.currentBooks = state.userDetail.currentBooks.filter(
            (book) => book.id !== action.meta.arg.bookId
          );
        }
      });
  },
});

export default usersSlice.reducer;
