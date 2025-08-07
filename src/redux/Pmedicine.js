import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientmedicine: {}, // key: patientId, value: array of medicines
  loading: false,
  error: false,
};

const PatientMedicine = createSlice({
  name: "patientmedicine",
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

//     AddPatientMedicine: (state, action) => {
//       const { patientId, name, dose, frequency,type } = action.payload;
// console.log('patientid',patientId)
// console.log('name',name)

//       if (!Array.isArray(state.patientmedicine[patientId])) {
//         state.patientmedicine[patientId] = [];
//       }

//       const index = state.patientmedicine[patientId].findIndex(
//         (med) => med.name === name
//       );

//       if (index !== -1) {
//         state.patientmedicine[patientId][index] = { name, dose, frequency,type };
//       } else {
//         state.patientmedicine[patientId].push({ name, dose, frequency,type });
//       }

//       state.loading = false;
//     },

AddPatientMedicine: (state, action) => {
  const { patientId, name, dose, frequency, type } = action.payload;

  if (!state.patientmedicine || typeof state.patientmedicine !== 'object') {
    state.patientmedicine = {}; // Reset if corrupted
  }

  if (!Array.isArray(state.patientmedicine[patientId])) {
    state.patientmedicine[patientId] = [];
  }

  const index = state.patientmedicine[patientId].findIndex(
    (med) => med.name === name
  );

  if (index !== -1) {
    state.patientmedicine[patientId][index] = { name, dose, frequency, type };
  } else {
    state.patientmedicine[patientId].push({ name, dose, frequency, type });
  }

  state.loading = false;
}
,

    EditPatientMedicine: (state, action) => {
      const { patientId, name, updatedMedicine } = action.payload;

      if (!Array.isArray(state.patientmedicine[patientId])) return;

      const index = state.patientmedicine[patientId].findIndex(
        (med) => med.name === name
      );

      if (index !== -1) {
        state.patientmedicine[patientId][index] = {
          ...state.patientmedicine[patientId][index],
          ...updatedMedicine,
        };
      }
    },

    DeletePatientMedicine: (state, action) => {
      const { patientId, nameToDelete } = action.payload;

      if (!Array.isArray(state.patientmedicine[patientId])) return;

      state.patientmedicine[patientId] = state.patientmedicine[patientId].filter(
        (med) => med.name !== nameToDelete
      );
    },
    
    // ✅ New Reducer to delete all medicines
    DeleteAllMedicinesForPatient: (state, action) => {
        const patientId = action.payload;
        if (state.patientmedicine[patientId]) {
            delete state.patientmedicine[patientId];
        }
    },
    },
  
});

export const {
  Loading,
  ErrorGet,
  AddPatientMedicine,
  EditPatientMedicine,
  DeletePatientMedicine,
  DeleteAllMedicinesForPatient
} = PatientMedicine.actions;

export default PatientMedicine.reducer;
