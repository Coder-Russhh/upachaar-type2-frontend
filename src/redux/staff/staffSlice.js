import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staff: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      state.doctor = action.payload;
    },
    // Other reducers as needed
  },
});

export const { setStaff } = staffSlice.actions;

export const selectStaff = (state) => state.staff.staff;

export default staffSlice.reducer;