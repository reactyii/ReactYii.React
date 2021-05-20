var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "@reduxjs/toolkit", "../features/counter/counterSlice", "../features/page/pageSlice"], function (require, exports, toolkit_1, counterSlice_1, pageSlice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.store = void 0;
    counterSlice_1 = __importDefault(counterSlice_1);
    pageSlice_1 = __importDefault(pageSlice_1);
    exports.store = toolkit_1.configureStore({
        reducer: {
            counter: counterSlice_1.default,
            page: pageSlice_1.default,
        },
    });
});