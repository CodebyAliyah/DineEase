import {configureStore} from '@reduxjs/toolkit';
import useReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
export const store = configureStore({
  reducer: {
    user: useReducer,
    product: productReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
