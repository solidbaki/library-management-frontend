import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { UserDetail } from "./types";

export interface UsersState {
  users: UserDetail[];
  userDetail: UserDetail | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  users: [],
  userDetail: null,
  status: "idle",
};

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
});

// Fetch user detail
export const fetchUserDetail = createAsyncThunk(
  "users/fetchUserDetail",
  async (userId: number) => {
    const response = await axios.get(`http://localhost:3000/users/${userId}`);
    return response.data;
  }
);

// Return a book
export const returnBook = createAsyncThunk(
  "users/returnBook",
  async ({ userId, bookId }: { userId: number; bookId: number }) => {
    const response = await axios.post(
      `http://localhost:3000/users/${userId}/return`,
      { bookId }
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.status = "idle";
        state.userDetail = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state) => {
        state.status = "failed";
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
