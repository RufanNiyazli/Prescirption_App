import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Service/api";

export const createPrescription = createAsyncThunk(
  "createPrescription",
  async ({userId, medicineIds, notes},{rejectWithValue}) => {
    try {
      const response = api.post("/save/medicine", {
        userId,
        medicineIds,
        notes,
        createdAt: new Date(),
      });
      return (await response).data
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
   loading: false,
    error: null,
    success: false,
  },
  reducers: {},
   extraReducers: (builder) => {
    builder
      .addCase(createPrescription.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createPrescription.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const {} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;
