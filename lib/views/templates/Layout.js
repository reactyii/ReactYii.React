"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
//import { NavMenu } from '@template/views/NavMenu';
//import { Header, Footer } from '@template/views';
//import { iPageProps } from '../../models/pageModels';
var Content_1 = require("../Content");
var Layout = /** @class */ (function (_super) {
    __extends(Layout, _super);
    function Layout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layout.prototype.render = function () {
        //Console.log('...Layout::render()');
        var content = React.createElement(Content_1.Content, { content: this.props.content.filter(function (item) {
                return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
            }), pageWraper: this.props.pageWraper, session: this.props.session });
        return React.createElement("div", { className: "page" },
            React.createElement("b", null, "Layout"),
            " ",
            React.createElement(react_router_dom_1.Link, { to: "/admin/contents.html" }, "list"),
            React.createElement("div", { className: "page-main" },
                React.createElement("div", { className: "my-3 my-md-5" },
                    React.createElement("div", { className: "container" }, content))));
    };
    return Layout;
}(React.Component));
exports.Layout = Layout;