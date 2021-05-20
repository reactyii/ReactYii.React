"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var Content_1 = require("../Content");
//import { iPage } from '../../models/pageModels';
//import { Html } from '../Html';
var A = /** @class */ (function (_super) {
    __extends(A, _super);
    function A() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    A.prototype.renderA = function (url, content, attrs) {
        if (attrs === void 0) { attrs = {}; }
        return jsx_runtime_1.jsx("a", __assign({ href: url }, attrs, { children: content }), void 0);
    };
    A.prototype.getAttrs = function (settings) {
        var attrs = {};
        if (settings.target)
            attrs.target = settings.target;
        if (settings.className)
            attrs.className = settings.className;
        return attrs;
    };
    A.prototype.getUrl = function (settings) {
        return settings.url ? settings.url : ''; // к сожалению урл сюда можно передать тока так, то есть построение урла снаружи
    };
    A.prototype.renderContent = function (settings) {
        var childsContent = this.props.content.filter(function (item) {
            return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
        });
        //Console.log('}}}}}}}}}', settings, childsContent);
        return childsContent.length > 0
            ? jsx_runtime_1.jsx(Content_1.Content, { content: childsContent, pageWraper: this.props.pageWraper, session: this.props.session }, void 0)
            : (settings.content ? settings.content : '');
    };
    A.prototype.render = function () {
        var settings = this.props.settings || {};
        return this.renderA(this.getUrl(settings), this.renderContent(settings), this.getAttrs(settings));
    };
    return A;
}(React.Component));
exports.A = A;