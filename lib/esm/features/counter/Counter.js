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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync, selectCount, } from './counterSlice';
import styles from './Counter.module.css';
export function Counter() {
    var count = useSelector(selectCount);
    var dispatch = useDispatch();
    var _a = useState('2'), incrementAmount = _a[0], setIncrementAmount = _a[1];
    return (_jsxs("div", { children: [_jsxs("div", __assign({ className: styles.row }, { children: [_jsx("button", __assign({ className: styles.button, "aria-label": "Increment value", onClick: function () { return dispatch(increment()); } }, { children: "+" }), void 0), _jsx("span", __assign({ className: styles.value }, { children: count }), void 0), _jsx("button", __assign({ className: styles.button, "aria-label": "Decrement value", onClick: function () { return dispatch(decrement()); } }, { children: "-" }), void 0)] }), void 0), _jsxs("div", __assign({ className: styles.row }, { children: [_jsx("input", { className: styles.textbox, "aria-label": "Set increment amount", value: incrementAmount, onChange: function (e) { return setIncrementAmount(e.target.value); } }, void 0), _jsx("button", __assign({ className: styles.button, onClick: function () {
                            return dispatch(incrementByAmount(Number(incrementAmount) || 0));
                        } }, { children: "Add Amount" }), void 0), _jsx("button", __assign({ className: styles.asyncButton, onClick: function () { return dispatch(incrementAsync(Number(incrementAmount) || 0)); } }, { children: "Add Async" }), void 0)] }), void 0)] }, void 0));
}
