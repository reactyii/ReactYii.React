import { ThunkAction, Action } from '@reduxjs/toolkit';
export declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    counter: import("../features/counter/counterSlice").CounterState;
    page: import("../models/pageModels").iPageStoreState;
}, import("redux").AnyAction, [import("redux-thunk").ThunkMiddleware<{
    counter: import("../features/counter/counterSlice").CounterState;
    page: import("../models/pageModels").iPageStoreState;
}, import("redux").AnyAction, null> | import("redux-thunk").ThunkMiddleware<{
    counter: import("../features/counter/counterSlice").CounterState;
    page: import("../models/pageModels").iPageStoreState;
}, import("redux").AnyAction, undefined>]>;
export declare type RootState = ReturnType<typeof store.getState>;
export declare type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export declare type AppDispatch = typeof store.dispatch;
