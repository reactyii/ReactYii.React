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
define(["require", "exports", "react/jsx-runtime", "react", "../../helpers/Utils", "../../models/commonModels", "../Content"], function (require, exports, jsx_runtime_1, React, Utils_1, commonModels_1, Content_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseComponent = void 0;
    React = __importStar(React);
    var BaseComponent = /** @class */ (function (_super) {
        __extends(BaseComponent, _super);
        function BaseComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BaseComponent.prototype.getSetting = function (name, defValue) {
            if (defValue === void 0) { defValue = undefined; }
            if (typeof this.props.settings === 'undefined' || typeof this.props.settings[name] === 'undefined')
                return defValue;
            return this.props.settings[name];
        };
        BaseComponent.prototype.getContentByKey = function (key) {
            if (key === void 0) { key = 'CONTENT'; }
            return key === 'CONTENT'
                ? this.props.content.filter(function (item) { var _a; return typeof item.content_keys === 'undefined' || item.content_keys.length === 0 || ((_a = item.content_keys) === null || _a === void 0 ? void 0 : _a.indexOf(key)) >= 0; })
                : this.props.content.filter(function (item) { var _a; return ((_a = item.content_keys) === null || _a === void 0 ? void 0 : _a.indexOf(key)) >= 0; });
        };
        BaseComponent.prototype.renderContentByKey = function (key) {
            var content = this.getContentByKey(key); //this.props.content.filter(item => item.content_keys?.indexOf(key) >= 0);
            if (content.length === 0)
                return null;
            return jsx_runtime_1.jsx(Content_1.Content, { content: content, pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
        };
        BaseComponent.prototype.renderError = function (message) {
            commonModels_1.Console.log('form error!');
            //return <Error content={[Utils.genContent('1', message)]} />;
            return jsx_runtime_1.jsx(Content_1.Content, { content: Utils_1.Utils.genErrorContent(message), pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
        };
        return BaseComponent;
    }(React.Component));
    exports.BaseComponent = BaseComponent;
});