import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctor: (state, action) => {
      state.doctor = action.payload;
    },
    // Other reducers as needed
  },
});

export const { setDoctor } = doctorSlice.actions;

export const selectDoctor = (state) => state.doctor.doctor;

export default doctorSlice.reducer;

