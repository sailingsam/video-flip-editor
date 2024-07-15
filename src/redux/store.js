import { configureStore } from '@reduxjs/toolkit';
import videoSlice from './videoSlice';

const store = configureStore({
  reducer: {
    video: videoSlice,
  },
});

export default store;
