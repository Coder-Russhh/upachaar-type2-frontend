import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./patient/patientSlice";
import doctorReducer from "./doctor/doctorSlice";
import staffReducer from "./staff/staffSlice";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    doctor: doctorReducer,
    staff: staffReducer,
    // Add other reducers if needed
  },
});

export default store;
