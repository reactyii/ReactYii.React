var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { Dropdown } from './Dropdown';
var DropdownTest = /** @class */ (function (_super) {
    __extends(DropdownTest, _super);
    function DropdownTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropdownTest.prototype.getStateFromProps = function (props) {
        return { isopen: props.isopen || false };
    };
    DropdownTest.prototype.render = function () {
        return _jsxs("div", __assign({ className: "", style: { display: 'block', float: 'left' } }, { children: [_jsx("a", __assign({ href: "#", onClick: this.toggle }, { children: this.props.title }), void 0), _jsx("div", __assign({ style: { display: this.state.isopen ? 'block' : 'none', position: 'absolute' } }, { children: this.props.body }), void 0)] }), void 0);
    };
    return DropdownTest;
}(Dropdown));
export { DropdownTest };
