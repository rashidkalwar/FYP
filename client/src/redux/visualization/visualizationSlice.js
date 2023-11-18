import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './visualizationService';

// Fetch all Visualizations for current user
export const fetchVisualizations = createAsyncThunk(
  'visualization/get_visualizations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await service.getVisualizations();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Add a Visualization
export const addVisualization = createAsyncThunk(
  'visualization/add_visualization',
  async ({ formData }, { rejectWithValue, dispatch }) => {
    try {
      const response = await service.addVisualization(formData);
      dispatch(fetchVisualizations());
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
      // Fetch all the Visualizations this user has access to.
      .addCase(fetchVisualizations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchVisualizations.fulfilled, (state, action) => {
        state.visualizations = action.payload;
        state.loading = false;
      })
      .addCase(fetchVisualizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // Create a new Visualization
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

export default visualizationSlice.reducer;
