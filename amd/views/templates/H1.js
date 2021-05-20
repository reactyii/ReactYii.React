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
define(["require", "exports", "react/jsx-runtime", "react", "../Content"], function (require, exports, jsx_runtime_1, React, Content_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.H1 = void 0;
    React = __importStar(React);
    var H1 = /** @class */ (function (_super) {
        __extends(H1, _super);
        function H1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        H1.prototype.render = function () {
            //Console.log('hhhhhhhhhhhh1', this.props.content);
            // не используем this.props.child
            //const content = this.props.children;
            var content = jsx_runtime_1.jsx(Content_1.Content, { content: this.props.content.filter(function (item) {
                    return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
                }), pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
            // протестируем передачу настроек в компоненты
            if (typeof this.props.settings !== 'undefined' && typeof this.props.settings['align'] !== 'undefined') {
                var h1Style = { textAlign: this.props.settings['align'] };
                return jsx_runtime_1.jsx("h1", __assign({ style: h1Style }, { children: content }), void 0);
            }
            return jsx_runtime_1.jsx("h1", { children: content }, void 0);
        };
        return H1;
    }(React.Component));
    exports.H1 = H1;
});