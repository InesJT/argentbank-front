import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import ProfileService from "/src/services/profile";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async ({ token }, thunkAPI) => {
    try {
      const data = await ProfileService.fetchProfile(token);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.profile = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.profile = null;
      });
  },
});

const { reducer } = profileSlice;
export default reducer;
