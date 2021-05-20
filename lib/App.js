"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.App = react_1.default.createElement(react_1.default.StrictMode, null,
    react_1.default.createElement(react_redux_1.Provider, { store: store_1.store },
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Switch, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/:path*", component: PageLoader_1.default })))));