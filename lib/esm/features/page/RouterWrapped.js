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
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Router } from './Router';
import { withRouter } from "react-router-dom";
var withRouterAndRef = function (Wrapped) {
    var WithRouter = withRouter(function (_a) {
        var forwardRef = _a.forwardRef, otherProps = __rest(_a, ["forwardRef"]);
        return _jsx(Wrapped, __assign({ ref: forwardRef }, otherProps), void 0);
    });
    var WithRouterAndRef = React.forwardRef(function (props, ref) { return (_jsx(WithRouter, __assign({}, props, { forwardRef: ref }), void 0)); });
    var name = Wrapped.displayName || Wrapped.name;
    WithRouterAndRef.displayName = "withRouterAndRef(" + name + ")";
    return WithRouterAndRef;
};
export default withRouterAndRef(Router);
