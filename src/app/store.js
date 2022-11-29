import { configureStore } from '@reduxjs/toolkit';
import requestReducer from './requestSlice';

export const store = configureStore({
  reducer: {
    request: requestReducer,
  },
});
