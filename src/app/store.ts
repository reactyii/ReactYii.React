import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pageReducer from '../features/page/pageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    page: pageReducer,
  },
});

// https://github.com/stereobooster/react-snap
// Tell react-snap how to save Redux state
(window as any).snapSaveState = () => ({
    __PRELOADED_STATE__: store.getState()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;/**/

export type AppDispatch = typeof store.dispatch