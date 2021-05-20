var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "./app/store", "react-redux", "./features/page/PageLoader", "react-router-dom"], function (require, exports, react_1, store_1, react_redux_1, PageLoader_1, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importDefault(react_1);
    PageLoader_1 = __importDefault(PageLoader_1);
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
});