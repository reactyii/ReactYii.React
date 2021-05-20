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
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Utils } from '../../helpers/Utils';
import { Console } from '../../models/commonModels';
import { Content } from '../Content';
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
        return _jsx(Content, { content: content, pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
    };
    BaseComponent.prototype.renderError = function (message) {
        Console.log('form error!');
        //return <Error content={[Utils.genContent('1', message)]} />;
        return _jsx(Content, { content: Utils.genErrorContent(message), pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
    };
    return BaseComponent;
}(React.Component));
export { BaseComponent };