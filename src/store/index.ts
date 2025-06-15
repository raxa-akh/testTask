import { configureStore } from '@reduxjs/toolkit';
import pdfReducer from './pdfSlice';
import selectionReducer from './selectionSlice';

const store = configureStore({
  reducer: {
    pdf: pdfReducer,
    selection: selectionReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
