import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './datasetService';

// Add a new Dataset
export const addDataset = createAsyncThunk(
  'dataset/add_datasets',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await service.addDataset(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a new Dataset
export const fetchDatasets = createAsyncThunk(
  'dataset/get_datasets',
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getDatasets();
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
      // Create a new Dataset
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
      })

      // Fetch all the Datasets this user has access to.
      .addCase(fetchDatasets.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchDatasets.fulfilled, (state, action) => {
        state.datasets = action.payload;
        state.loading = false;
      })
      .addCase(fetchDatasets.rejected, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.error = action.payload.message;
      });
  },
});

export const { clearError, clearMessage } = datasetSlice.actions;
export default datasetSlice.reducer;
