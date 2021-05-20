"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var toolkit_1 = require("@reduxjs/toolkit");
var counterSlice_1 = __importDefault(require("../features/counter/counterSlice"));
var pageSlice_1 = __importDefault(require("../features/page/pageSlice"));
exports.store = toolkit_1.configureStore({
    reducer: {
        counter: counterSlice_1.default,
        page: pageSlice_1.default,
    },
});