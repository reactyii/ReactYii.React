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
define(["require", "exports", "react/jsx-runtime", "react", "./app/store", "react-redux", "./features/page/PageLoader", "react-router-dom"], function (require, exports, jsx_runtime_1, react_1, store_1, react_redux_1, PageLoader_1, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    react_1 = __importDefault(react_1);
    PageLoader_1 = __importDefault(PageLoader_1);
    //import { Console } from './models/commonModels';
    //import { Utils } from './helpers/Utils';
    // ���� �� SSR �� ��� https://github.com/stereobooster/react-snap
    // Tell react-snap how to save Redux state
    window.snapSaveState = function () { return ({
        __PRELOADED_STATE__: store_1.store.getState()
    }); }; /**/
    exports.App = jsx_runtime_1.jsx(react_1.default.StrictMode, { children: jsx_runtime_1.jsx(react_redux_1.Provider, __assign({ store: store_1.store }, { children: jsx_runtime_1.jsx(react_router_dom_1.BrowserRouter, { children: jsx_runtime_1.jsx(react_router_dom_1.Switch, { children: jsx_runtime_1.jsx(react_router_dom_1.Route, { path: "/:path*", component: PageLoader_1.default }, void 0) }, void 0) }, void 0) }), void 0) }, void 0);
});