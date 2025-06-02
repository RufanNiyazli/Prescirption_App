import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../Service/api";

export const fetchMedicine = createAsyncThunk(
  "fetchMedicine",
  async (keyword) => {
    const response = await api.get(
      `http://localhost:8080/medicine?keyword=${keyword}`
    );
    return response.data;
  }
);

export const medicineSlice = createSlice({
  name: "medicine",
  initialState: {
    searchResults: [],
    selectedMedicines: [],
    loading: false,
    error: null,
  },
  reducers: {
    selectMedicine: (state, action) => {
      const medicine = action.payload;
      if (!state.selectedMedicines.find((m) => m.id === medicine.id)) {
        state.selectedMedicines.push(medicine);
      }
    },
    removeMedicine: (state, action) => {
      const id = action.payload;
      state.selectedMedicines = state.selectedMedicines.filter((m) => m.id !== id);
    },
    clearMedicine: (state) => {
      state.selectedMedicines = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMedicine.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMedicine.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMedicine.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectMedicine, removeMedicine, clearMedicine } = medicineSlice.actions;

export default medicineSlice.reducer;
