import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: 'request',
  initialState: {
    page: 1,
    query: '',
  },
  reducers: {
    setRequest(state, action) {
      state.page = action.payload.page;
      state.query = action.payload.query;
    }
  }
});

export const { setRequest } = requestSlice.actions;
export default requestSlice.reducer;