import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define the user type
type User = {
  name: string;
  email: string;
  photo: string;
};

// The state will either be a User object or null (if no user is logged in)
type UserState = User | null;

// Define the initial state as null (no user logged in initially)
const initialState: UserState = null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // Directly mutate the state using Immer
      return action.payload;
    },
    clearUser: (state) => {
      // Reset the state to null
      return null;
    }
  },
});

export const { setUser, clearUser } = userSlice.actions;

// Selector to access the user state
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
