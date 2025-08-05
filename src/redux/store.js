import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
// import { thunk } from "redux-thunk"; // ✅ FIXED
import patientMedicineReducer  from './Pmedicine.js'
const persistConfig = {
  key: "auth",
  storage,
    whitelist: ["auth", "patientmedicine"], // 👈 optionally persist both
};

// const persistConfig = {
//   key: "root",
//   storage,
// };
const rootReducer = combineReducers({
auth: authReducer,
patientmedicine:patientMedicineReducer 
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export const persistor = persistStore(store);
