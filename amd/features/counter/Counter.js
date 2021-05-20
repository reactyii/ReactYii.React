var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "react-redux", "./counterSlice", "./Counter.module.css"], function (require, exports, react_1, react_redux_1, counterSlice_1, Counter_module_css_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    react_1 = __importStar(react_1);
    Counter_module_css_1 = __importDefault(Counter_module_css_1);
    function Counter() {
        var count = react_redux_1.useSelector(counterSlice_1.selectCount);
        var dispatch = react_redux_1.useDispatch();
        var _a = react_1.useState('2'), incrementAmount = _a[0], setIncrementAmount = _a[1];
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("div", { className: Counter_module_css_1.default.row },
                react_1.default.createElement("button", { className: Counter_module_css_1.default.button, "aria-label": "Increment value", onClick: function () { return dispatch(counterSlice_1.increment()); } }, "+"),
                react_1.default.createElement("span", { className: Counter_module_css_1.default.value }, count),
                react_1.default.createElement("button", { className: Counter_module_css_1.default.button, "aria-label": "Decrement value", onClick: function () { return dispatch(counterSlice_1.decrement()); } }, "-")),
            react_1.default.createElement("div", { className: Counter_module_css_1.default.row },
                react_1.default.createElement("input", { className: Counter_module_css_1.default.textbox, "aria-label": "Set increment amount", value: incrementAmount, onChange: function (e) { return setIncrementAmount(e.target.value); } }),
                react_1.default.createElement("button", { className: Counter_module_css_1.default.button, onClick: function () {
                        return dispatch(counterSlice_1.incrementByAmount(Number(incrementAmount) || 0));
                    } }, "Add Amount"),
                react_1.default.createElement("button", { className: Counter_module_css_1.default.asyncButton, onClick: function () { return dispatch(counterSlice_1.incrementAsync(Number(incrementAmount) || 0)); } }, "Add Async"))));
    }
    exports.Counter = Counter;
});