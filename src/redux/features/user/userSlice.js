import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../utils/firebase.config";

const initialState = {
  name: "",
  email: "",
  isLoading: true,
  isError: false,
  Error: "",
};

export const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ email, password }) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    console.log(data);
    return;
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        (state.name = ""),
          (state.email = ""),
          (state.isLoading = true),
          (state.isError = false),
          (state.Error = "");
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        (state.name = payload.name),
          (state.email = payload.email),
          (state.isLoading = false),
          (state.isError = false),
          (state.Error = "");
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.name = ""),
          (state.email = ""),
          (state.isLoading = false),
          (state.isError = false),
          (state.Error = action.error.message);
      });
  },
});

export default userSlice.reducer;
