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
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
//import ReactDOM from 'react-dom';
//import { hydrate, render } from "react-dom";
//import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
//import {Page} from './views/Page';
import PageLoader from './features/page/PageLoader';
// https://reacttraining.com/react-router/web/guides/quick-start
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { Console } from './models/commonModels';
//import { Utils } from './helpers/Utils';
// ���� �� SSR �� ��� https://github.com/stereobooster/react-snap
// Tell react-snap how to save Redux state
window.snapSaveState = function () { return ({
    __PRELOADED_STATE__: store.getState()
}); }; /**/
export var App = _jsx(React.StrictMode, { children: _jsx(Provider, __assign({ store: store }, { children: _jsx(Router, { children: _jsx(Switch, { children: _jsx(Route, { path: "/:path*", component: PageLoader }, void 0) }, void 0) }, void 0) }), void 0) }, void 0);
