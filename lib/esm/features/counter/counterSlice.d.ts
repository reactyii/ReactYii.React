import { PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
export interface CounterState {
    value: number;
}
export declare const counterSlice: import("@reduxjs/toolkit").Slice<CounterState, {
    increment: (state: import("immer/dist/internal").WritableDraft<CounterState>) => void;
    decrement: (state: import("immer/dist/internal").WritableDraft<CounterState>) => void;
    incrementByAmount: (state: import("immer/dist/internal").WritableDraft<CounterState>, action: PayloadAction<number>) => void;
}, "counter">;
export declare const increment: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>, decrement: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<string>, incrementByAmount: import("@reduxjs/toolkit").ActionCreatorWithPayload<number, string>;
export declare const incrementAsync: (amount: number) => AppThunk;
export declare const selectCount: (state: RootState) => number;
declare const _default: import("redux").Reducer<CounterState, import("redux").AnyAction>;
export default _default;
