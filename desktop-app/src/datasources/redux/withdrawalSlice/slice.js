import { createSlice } from '@reduxjs/toolkit';

const withdrawalSlice = createSlice({
  name: 'withdrawals',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchingWithdrawals: (state) => {
      state.loading = true;
    },
    loadWithdrawals: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    errorOccured: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateWithdrawalStatus: (state, action) => {
      const { withdrawalId, status } = action.payload;
      const withdrawal = state.list.find((w) => w._id === withdrawalId);
      if (withdrawal) {
        withdrawal.status = status;
      }
    },
  },
});

export const { fetchingWithdrawals, loadWithdrawals, errorOccured, updateWithdrawalStatus } = withdrawalSlice.actions;

export const withdrawalsSliceSelector = (global) => global.withdrawals;

export const withdrawalsReducer = withdrawalSlice.reducer;
