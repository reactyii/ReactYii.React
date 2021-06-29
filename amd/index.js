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
define(["require", "exports", "react-dom", "./serviceWorker", "./models/commonModels", "./helpers/Utils", "./views/templates", "./App", "./index.css"], function (require, exports, react_dom_1, serviceWorker, commonModels_1, Utils_1, templates_1, App_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    serviceWorker = __importStar(serviceWorker);
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
});