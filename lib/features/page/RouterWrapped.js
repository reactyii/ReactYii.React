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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Router_1 = require("./Router");
var react_router_dom_1 = require("react-router-dom");
var withRouterAndRef = function (Wrapped) {
    var WithRouter = react_router_dom_1.withRouter(function (_a) {
        var forwardRef = _a.forwardRef, otherProps = __rest(_a, ["forwardRef"]);
        return React.createElement(Wrapped, __assign({ ref: forwardRef }, otherProps));
    });
    var WithRouterAndRef = React.forwardRef(function (props, ref) { return (React.createElement(WithRouter, __assign({}, props, { forwardRef: ref }))); });
    var name = Wrapped.displayName || Wrapped.name;
    WithRouterAndRef.displayName = "withRouterAndRef(" + name + ")";
    return WithRouterAndRef;
};
exports.default = withRouterAndRef(Router_1.Router);