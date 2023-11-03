import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import datasetReducer from './dataset/datasetSlice';

const store = configureStore({
  reducer: { auth: userReducer, dataset: datasetReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
