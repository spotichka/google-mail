import { IUser } from "../../types/IUser.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userIsFetching: (state) => {
      state.isLoading = true;
    },
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoadingFalse: (state) => {
      state.isLoading = false;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default userSlice.reducer;
