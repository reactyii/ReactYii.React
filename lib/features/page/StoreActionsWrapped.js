"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var StoreActions_1 = require("./StoreActions");
exports.default = react_redux_1.connect(StoreActions_1.mapStateToProps, StoreActions_1.mapDispatchToProps, //dispatchProps
null, {
    forwardRef: true,
})(StoreActions_1.StoreActions);