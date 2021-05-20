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
define(["require", "exports", "react/jsx-runtime", "react", "react-router-dom", "../Content"], function (require, exports, jsx_runtime_1, React, react_router_dom_1, Content_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Layout = void 0;
    React = __importStar(React);
    var Layout = /** @class */ (function (_super) {
        __extends(Layout, _super);
        function Layout() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Layout.prototype.render = function () {
            //Console.log('...Layout::render()');
            var content = jsx_runtime_1.jsx(Content_1.Content, { content: this.props.content.filter(function (item) {
                    return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
                }), pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
            return jsx_runtime_1.jsxs("div", __assign({ className: "page" }, { children: [jsx_runtime_1.jsx("b", { children: "Layout" }, void 0), " ", jsx_runtime_1.jsx(react_router_dom_1.Link, __assign({ to: "/admin/contents.html" }, { children: "list" }), void 0),
                    jsx_runtime_1.jsx("div", __assign({ className: "page-main" }, { children: jsx_runtime_1.jsx("div", __assign({ className: "my-3 my-md-5" }, { children: jsx_runtime_1.jsx("div", __assign({ className: "container" }, { children: content }), void 0) }), void 0) }), void 0)] }), void 0);
        };
        return Layout;
    }(React.Component));
    exports.Layout = Layout;
});