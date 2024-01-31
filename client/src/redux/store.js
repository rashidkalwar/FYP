import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import datasetReducer from './dataset/datasetSlice';
import visualizationReducer from './visualization/visualizationSlice';
import chartReducer from './charts/chartsSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
    dataset: datasetReducer,
    visualization: visualizationReducer,
    chart: chartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
