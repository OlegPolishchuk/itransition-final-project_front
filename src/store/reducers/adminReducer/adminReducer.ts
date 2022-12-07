import {createSlice} from "@reduxjs/toolkit";
import {AdminState} from "store/types/AdminState";
import {fetchUsers} from "store/actions/users/fetchUsers";

const initialState: AdminState = {
  users: [],
  isLoading: false,
  error: '',
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
  },
})

export const adminReducer = adminSlice.reducer;
