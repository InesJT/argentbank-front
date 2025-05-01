import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "/src/services/auth";

const token = JSON.parse(localStorage.getItem("token"));

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      return { token: data };
    } catch (error) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = token
  ? { isLoggedIn: true, token: token }
  : { isLoggedIn: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      })
      .addCase(logout.pending, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
