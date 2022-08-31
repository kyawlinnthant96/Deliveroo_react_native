import {configureStore} from '@reduxjs/toolkit';

// features
import basketReducer from '../features/basketSlice';
import restaurantReducer from '../features/restaurantSlice';

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
