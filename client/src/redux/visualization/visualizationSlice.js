import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './visualizationService';

// Add a Visualization
export const addVisualization = createAsyncThunk(
  'visualization/add_visualization',
  async ({ formData }, { rejectWithValue, dispatch }) => {
    try {
      //   const response = await service.addVisualization(formData);
      //   dispatch(fetchDatasets());
      console.log(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  visualization: {},
  visualizations: [],
  loading: false,
  error: null,
  message: null,
};

const visualizationSlice = createSlice({
  name: 'visualization',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create a new visualization
      .addCase(addVisualization.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(addVisualization.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = null;
      })
      .addCase(addVisualization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? action.payload.error
          : { message: 'Network Error!' };
      });
  },
});
