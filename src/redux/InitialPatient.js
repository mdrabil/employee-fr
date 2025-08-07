// redux/slices/PatientMedicine.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patient: null,
  loading: false,
  error: false,
};

const PatientMedicine = createSlice({
  name: "patient",
  initialState,
  reducers: {
    Loading: (state) => {
      state.loading = true;
      state.error = null;
    },
    ErrorGet: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    AddPatient: (state, action) => {
      state.patient = action.payload;  // 🔁 Always replace with latest selected
      state.loading = false;
    },

    DeletePatient: (state) => {
      state.patient = null;
    },
  },
});

export const {
  Loading,
  ErrorGet,
  AddPatient,
  DeletePatient,
} = PatientMedicine.actions;

export default PatientMedicine.reducer;
