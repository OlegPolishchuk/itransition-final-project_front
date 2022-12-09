import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AdminState, TableSearchParams} from "store/types/AdminState";
import {fetchUsers} from "store/actions/users/fetchUsers";
import {userRoles, usersTablePaginationData, userStatus} from "shared";
import {User} from "store/types/User";
import {fetchUser} from "store/actions/users/fetchUser";

const initialState: AdminState = {
  users: [],
  isLoading: false,
  error: '',
  currentUser: {
    status: userStatus.active,
    _id: '',
    userName: '',
    avatar: '',
    role: userRoles.user,
    login: '',
    token: '',
    created: '',
    lastLogin: '',
    reviews: [],
  },
  totalCount: 0,
  tableSearchParams: {
    page: usersTablePaginationData.defaultPageNumber,
    limit: usersTablePaginationData.defaultRowPerPage
  }
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },

    setTableSearchParams: (state, action: PayloadAction<Partial<TableSearchParams>>) => {
      state.tableSearchParams = {...state.tableSearchParams, ...action.payload};
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.totalCount = action.payload.count;
      state.isLoading = false;
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })

    builder.addCase(fetchUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
  },
})

export const adminReducer = adminSlice.reducer;
export const {setCurrentUser, setTableSearchParams} = adminSlice.actions;
