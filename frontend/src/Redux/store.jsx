import { configureStore } from "@reduxjs/toolkit";
import prescriptionReducer from "./prescriptionSlice";
import medicineReducer from "./medicineSlice";

export default configureStore({
  reducer: {
    prescription: prescriptionReducer,
    medicine: medicineReducer,
  },
});
