import { configureStore } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';

const store = configureStore({
  reducer: { auth: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
