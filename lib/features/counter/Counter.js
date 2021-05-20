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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Counter = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var counterSlice_1 = require("./counterSlice");
var Counter_module_css_1 = __importDefault(require("./Counter.module.css"));
function Counter() {
    var count = react_redux_1.useSelector(counterSlice_1.selectCount);
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState('2'), incrementAmount = _a[0], setIncrementAmount = _a[1];
    return (jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsxs("div", __assign({ className: Counter_module_css_1.default.row }, { children: [jsx_runtime_1.jsx("button", __assign({ className: Counter_module_css_1.default.button, "aria-label": "Increment value", onClick: function () { return dispatch(counterSlice_1.increment()); } }, { children: "+" }), void 0),
                    jsx_runtime_1.jsx("span", __assign({ className: Counter_module_css_1.default.value }, { children: count }), void 0),
                    jsx_runtime_1.jsx("button", __assign({ className: Counter_module_css_1.default.button, "aria-label": "Decrement value", onClick: function () { return dispatch(counterSlice_1.decrement()); } }, { children: "-" }), void 0)] }), void 0),
            jsx_runtime_1.jsxs("div", __assign({ className: Counter_module_css_1.default.row }, { children: [jsx_runtime_1.jsx("input", { className: Counter_module_css_1.default.textbox, "aria-label": "Set increment amount", value: incrementAmount, onChange: function (e) { return setIncrementAmount(e.target.value); } }, void 0),
                    jsx_runtime_1.jsx("button", __assign({ className: Counter_module_css_1.default.button, onClick: function () {
                            return dispatch(counterSlice_1.incrementByAmount(Number(incrementAmount) || 0));
                        } }, { children: "Add Amount" }), void 0),
                    jsx_runtime_1.jsx("button", __assign({ className: Counter_module_css_1.default.asyncButton, onClick: function () { return dispatch(counterSlice_1.incrementAsync(Number(incrementAmount) || 0)); } }, { children: "Add Async" }), void 0)] }), void 0)] }, void 0));
}
exports.Counter = Counter;