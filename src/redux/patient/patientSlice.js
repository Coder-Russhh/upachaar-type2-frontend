import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patient: null,
  // Other relevant state properties
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatient: (state, action) => {
      state.patient = action.payload;
    },
    // Other reducers as needed
  },
});

export const { setPatient } = patientSlice.actions;

export const selectPatient = (state) => state.patient.patient;

export default patientSlice.reducer;
