import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "/src/services/auth";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password, isRemembered }, thunkAPI) => {
    try {
      const data = await AuthService.login(email, password);
      if (isRemembered) {
        localStorage.setItem("token", JSON.stringify(data));
      } else {
        sessionStorage.setItem("token", JSON.stringify(data));
      }
      return { token: data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const getInitialState = () => {
  let token;
  const localToken = JSON.parse(localStorage.getItem("token"));
  const sessionToken = JSON.parse(sessionStorage.getItem("token"));
  if (localToken) {
    token = localToken;
  }
  if (sessionToken) {
    token = sessionToken;
  }
  return token
    ? { isLoggedIn: true, token: token }
    : { isLoggedIn: false, token: null };
}

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
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
