import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Book {
  id: number;
  name: string;
  author: string;
  year: number;
  score: number | null;
}

export interface UserDetail {
  id: number;
  name: string;
  currentBooks: Book[];
  pastBooks: Book[];
}

interface UsersState {
  users: any[];
  userDetail: UserDetail | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  userDetail: null,
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:3000/users");
  return response.data;
});

export const fetchUserDetail = createAsyncThunk<UserDetail, number>(
  "users/fetchUserDetail",
  async (userId: number) => {
    const response = await axios.get<UserDetail>(`http://localhost:3000/users/${userId}`);
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
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users.";
      })
      .addCase(fetchUserDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetail = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user details.";
      });
  },
});

export default usersSlice.reducer;
