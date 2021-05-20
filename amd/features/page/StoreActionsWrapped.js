define(["require", "exports", "react-redux", "./StoreActions"], function (require, exports, react_redux_1, StoreActions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = react_redux_1.connect(StoreActions_1.mapStateToProps, StoreActions_1.mapDispatchToProps, //dispatchProps
    null, {
        forwardRef: true,
    })(StoreActions_1.StoreActions);
});