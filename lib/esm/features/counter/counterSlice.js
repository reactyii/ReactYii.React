var _a;
import { createSlice } from '@reduxjs/toolkit';
var initialState = {
    value: 0,
};
export var counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment: function (state) {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1;
        },
        decrement: function (state) {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: function (state, action) {
            state.value += action.payload;
        },
    },
});
export var increment = (_a = counterSlice.actions, _a.increment), decrement = _a.decrement, incrementByAmount = _a.incrementByAmount;
// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export var incrementAsync = function (amount) { return function (dispatch) {
    setTimeout(function () {
        dispatch(incrementByAmount(amount));
    }, 1000);
}; };
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export var selectCount = function (state) { return state.counter.value; };
export default counterSlice.reducer;
