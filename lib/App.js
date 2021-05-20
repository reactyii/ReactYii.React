"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
//import ReactDOM from 'react-dom';
//import { hydrate, render } from "react-dom";
//import './index.css';
var store_1 = require("./app/store");
var react_redux_1 = require("react-redux");
//import {Page} from './views/Page';
var PageLoader_1 = __importDefault(require("./features/page/PageLoader"));
// https://reacttraining.com/react-router/web/guides/quick-start
var react_router_dom_1 = require("react-router-dom");
//import { Console } from './models/commonModels';
//import { Utils } from './helpers/Utils';
// ���� �� SSR �� ��� https://github.com/stereobooster/react-snap
// Tell react-snap how to save Redux state
window.snapSaveState = function () { return ({
    __PRELOADED_STATE__: store_1.store.getState()
}); }; /**/
exports.App = jsx_runtime_1.jsx(react_1.default.StrictMode, { children: jsx_runtime_1.jsx(react_redux_1.Provider, __assign({ store: store_1.store }, { children: jsx_runtime_1.jsx(react_router_dom_1.BrowserRouter, { children: jsx_runtime_1.jsx(react_router_dom_1.Switch, { children: jsx_runtime_1.jsx(react_router_dom_1.Route, { path: "/:path*", component: PageLoader_1.default }, void 0) }, void 0) }, void 0) }), void 0) }, void 0);