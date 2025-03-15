import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authReducer from './slices/authSlice';
import reviewReducer from './slices/reviewSlice';
import categoryReducer from './slices/categorySlice';
import uiReducer from './slices/uiSlice';
import { combineReducers } from 'redux';

// Create a root reducer with special handling for HYDRATE action
const combinedReducer = combineReducers({
  auth: authReducer,
  reviews: reviewReducer,
  categories: categoryReducer,
  ui: uiReducer,
});

// Handle HYDRATE action from next-redux-wrapper
const rootReducer = (state: any, action: any) => {
  if (action.type === HYDRATE) {
    // Special handling for reviews to ensure null values are properly handled
    const reviewItems = action.payload.reviews.items === undefined 
      ? null 
      : action.payload.reviews.items;

    const nextState = {
      ...state,
      ...action.payload,
      // Preserve the state from client-side
      reviews: {
        ...state?.reviews,
        ...action.payload.reviews,
        // Make sure undefined values are converted to null for serialization
        items: reviewItems,
      },
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

const makeStore = () => 
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types for serialization checks
          ignoredActions: [HYDRATE],
          // Ignore these paths in the state for serialization checks
          ignoredPaths: ['reviews.items.undefined'],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
});
