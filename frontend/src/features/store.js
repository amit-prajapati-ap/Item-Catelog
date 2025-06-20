import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './itemSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['items/addItem/fulfilled'],
        ignoredActionsPaths: ['payload.coverImage', 'payload.additionalImages'],
        ignoredPaths: ['items.items.coverImage', 'items.items.additionalImages'],
      },
    }),
});

export default store;