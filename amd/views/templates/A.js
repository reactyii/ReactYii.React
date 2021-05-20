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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
define(["require", "exports", "react", "../Content"], function (require, exports, React, Content_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    //import { iPage } from '../../models/pageModels';
    //import { Html } from '../Html';
    var A = /** @class */ (function (_super) {
        __extends(A, _super);
        function A() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        A.prototype.renderA = function (url, content, attrs) {
            if (attrs === void 0) { attrs = {}; }
            return React.createElement("a", __assign({ href: url }, attrs), content);
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
                ? React.createElement(Content_1.Content, { content: childsContent, pageWraper: this.props.pageWraper, session: this.props.session })
                : (settings.content ? settings.content : '');
        };
        A.prototype.render = function () {
            var settings = this.props.settings || {};
            return this.renderA(this.getUrl(settings), this.renderContent(settings), this.getAttrs(settings));
        };
        return A;
    }(React.Component));
    exports.A = A;
});