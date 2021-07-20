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
import * as React from 'react';
import { Link } from 'react-router-dom';
//import { NavMenu } from '@template/views/NavMenu';
//import { Header, Footer } from '@template/views';
//import { iPageProps } from '../../models/pageModels';
import { Content } from '../Content';
import { DropdownTest } from '../DropdownTest';
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        //Console.log('...Layout::render()');
        var content = _jsx(Content, { content: this.props.content.filter(function (item) {
                return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
            }), pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
        return _jsxs("div", __assign({ className: "page" }, { children: [_jsx("b", { children: "Layout" }, void 0), " ", _jsx(Link, __assign({ to: "/admin/contents.html" }, { children: "list" }), void 0), _jsx("div", __assign({ className: "page-main" }, { children: _jsx("div", __assign({ className: "my-3 my-md-5" }, { children: _jsx("div", __assign({ className: "container" }, { children: content }), void 0) }), void 0) }), void 0), "Test zone", _jsxs("div", { children: [_jsx(DropdownTest, { isopen: true, title: "dropdown1", body: _jsx("div", { children: "\u0442\u0435\u043B\u043E \u0434\u0440\u043E\u043F\u0434\u0430\u0443\u043D\u0430 1" }, void 0) }, void 0), _jsx(DropdownTest, { title: "dropdown2", body: _jsx("div", { children: "\u0442\u0435\u043B\u043E \u0434\u0440\u043E\u043F\u0434\u0430\u0443\u043D\u0430 2" }, void 0) }, void 0), _jsx(DropdownTest, { title: "dropdown3", body: _jsx("div", { children: "\u0442\u0435\u043B\u043E \u0434\u0440\u043E\u043F\u0434\u0430\u0443\u043D\u0430 3" }, void 0) }, void 0)] }, void 0)] }), void 0);
    };
    return Layout;
}(React.Component));
export { Layout };
