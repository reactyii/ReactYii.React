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
export var App = React.createElement(React.StrictMode, null,
    React.createElement(Provider, { store: store },
        React.createElement(Router, null,
            React.createElement(Switch, null,
                React.createElement(Route, { path: "/:path*", component: PageLoader })))));