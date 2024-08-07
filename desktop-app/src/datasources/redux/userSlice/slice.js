import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null,
    selected: [],
  },
  reducers: {
    fetchingUsers: (state) => {
      state.loading = true;
    },
    loadUsers: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    errorOccured: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeUser: (state, action) => {
      state.list = state.list.filter((user) => user._id !== action.payload);
    },
  },
});

export const { fetchingUsers, loadUsers, errorOccured, removeUser } = usersSlice.actions;

export const usersSliceSelector = (global) => global.users;

export const usersReducer = usersSlice.reducer;
