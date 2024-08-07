import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './userSlice/slice';
import { classReducer } from './classSlice/slice';
import { withdrawalsReducer } from './withdrawalSlice/slice';

import logger from "redux-logger";

const store = configureStore({
  reducer: {
    users: usersReducer,
    classes: classReducer,
    withdrawals: withdrawalsReducer,
  },
 middleware: (getDefaultMiddlware) => {
    return getDefaultMiddlware().concat(logger);
  },
});

export default store;
