import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import pageReducer from '../features/page/pageSlice';
export var store = configureStore({
    reducer: {
        counter: counterReducer,
        page: pageReducer,
    },
});