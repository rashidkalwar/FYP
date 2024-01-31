import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as service from './chartsService';

// fetch all the unique slugs/ids of visualization
export const fetchChart = createAsyncThunk(
  'charts/get_chart',
  async (id, { rejectWithValue }) => {
    try {
      const response = await service.getChart(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  chart: {},
  loading: false,
  error: null,
  message: null,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Geting Individual chart
      .addCase(fetchChart.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.chart = action.payload;
        state.loading = false;
      })
      .addCase(fetchChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default chartSlice.reducer;
