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
exports.FormReset = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
//import { Content } from '../Content';
var Utils_1 = require("../../helpers/Utils");
//import { StoreActions } from '../../features/page/StoreActions';
//import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
var react_router_dom_1 = require("react-router-dom");
//import { Html } from '../Html';
var FormReset = /** @class */ (function (_super) {
    __extends(FormReset, _super);
    //fieldname: string;
    //refStoreActions: React.RefObject<StoreActions>;
    function FormReset(props) {
        var _a, _b;
        var _this = _super.call(this, props) || this;
        //let error: string[] = Utils.checkContentProps(props, ['formpath']);
        // вызов формы без этих параметров ошибка конфигурации
        _this.settings = props.settings || {};
        _this.site = (_a = props.session) === null || _a === void 0 ? void 0 : _a.site;
        _this.page = (_b = props.pageWraper) === null || _b === void 0 ? void 0 : _b.item;
        _this.formpath = _this.settings.formpath || 'unknown'; // наличие этих настроек проверяется выше (см установку значения let error = ...)
        return _this;
        //this.handleClick = this.handleClick.bind(this);
        //this.refStoreActions = React.createRef<StoreActions>();
    } /* */
    /*handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        Console.log('FormReset handleClick!!!!!!!!!', this.formpath);
        //FormStorage.clearForm(this.formpath);
    }*/
    FormReset.prototype.renderButton = function () {
        var _a;
        //return <button type="submit" onClick={this.handleClick}>reset</button>;
        // todo! добавить сортировку в filterAndSort аргумент
        var _b = Utils_1.Utils.makeFilterUrl(this.page, this.page, this.site, this.formpath, '0', ''), url = _b[1];
        return jsx_runtime_1.jsx(react_router_dom_1.Link, __assign({ to: url }, { children: ((_a = this.props.settings) === null || _a === void 0 ? void 0 : _a.value) || 'Reset' }), void 0);
    };
    FormReset.prototype.renderWraps = function () {
        return [];
        /*return <>
            <StoreActionsWrapped ref={this.refStoreActions} />
        </>;/**/
    };
    FormReset.prototype.render = function () {
        return jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [this.renderWraps(), this.renderButton()] }, void 0); /**/
    };
    return FormReset;
}(React.Component));
exports.FormReset = FormReset;