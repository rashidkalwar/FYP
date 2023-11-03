import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './datasetService';

// Add a new Dataset
export const addDataset = createAsyncThunk(
  'api/dataset',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await service.addDataset(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  dataset: {},
  datasets: [],
  loading: false,
  error: null,
  message: null,
};

const datasetSlice = createSlice({
  name: 'dataset',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addDataset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addDataset.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(addDataset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : { message: 'Network Error!' };
      });
  },
});

export const { clearError, clearMessage } = datasetSlice.actions;
export default datasetSlice.reducer;
