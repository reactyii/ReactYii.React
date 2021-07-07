"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Console = exports.Utils = exports.App = void 0;
var react_dom_1 = require("react-dom");
require("./index.css");
var serviceWorker = __importStar(require("./serviceWorker"));
// https://reacttraining.com/react-router/web/guides/quick-start
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
var commonModels_1 = require("./models/commonModels");
Object.defineProperty(exports, "Console", { enumerable: true, get: function () { return commonModels_1.Console; } });
var Utils_1 = require("./helpers/Utils");
Object.defineProperty(exports, "Utils", { enumerable: true, get: function () { return Utils_1.Utils; } });
var templates_1 = require("./views/templates");
var App_1 = require("./App");
Object.defineProperty(exports, "App", { enumerable: true, get: function () { return App_1.App; } });
commonModels_1.Console.log('-->', process.env.NODE_ENV);
//Console.log('-->', process.env.REACT_APP_HOST);
// пока решим проблему вот так топорно.
Utils_1.Utils.Templates = templates_1.Templates;
var rootElement = document.getElementById("root");
if (rootElement != null) {
    if (rootElement.hasChildNodes()) {
        react_dom_1.hydrate(App_1.App, rootElement);
    }
    else {
        react_dom_1.render(App_1.App, rootElement);
    }
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();