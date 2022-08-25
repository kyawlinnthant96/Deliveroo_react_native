import {configureStore} from '@reduxjs/toolkit';

// features
import basketReducer from '../features/basketSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
