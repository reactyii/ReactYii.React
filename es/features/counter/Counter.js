import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment, incrementByAmount, incrementAsync, selectCount, } from './counterSlice';
import styles from './Counter.module.css';
export function Counter() {
    var count = useSelector(selectCount);
    var dispatch = useDispatch();
    var _a = useState('2'), incrementAmount = _a[0], setIncrementAmount = _a[1];
    return (React.createElement("div", null,
        React.createElement("div", { className: styles.row },
            React.createElement("button", { className: styles.button, "aria-label": "Increment value", onClick: function () { return dispatch(increment()); } }, "+"),
            React.createElement("span", { className: styles.value }, count),
            React.createElement("button", { className: styles.button, "aria-label": "Decrement value", onClick: function () { return dispatch(decrement()); } }, "-")),
        React.createElement("div", { className: styles.row },
            React.createElement("input", { className: styles.textbox, "aria-label": "Set increment amount", value: incrementAmount, onChange: function (e) { return setIncrementAmount(e.target.value); } }),
            React.createElement("button", { className: styles.button, onClick: function () {
                    return dispatch(incrementByAmount(Number(incrementAmount) || 0));
                } }, "Add Amount"),
            React.createElement("button", { className: styles.asyncButton, onClick: function () { return dispatch(incrementAsync(Number(incrementAmount) || 0)); } }, "Add Async"))));
}