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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react/jsx-runtime", "react", "../Content", "../../helpers/Utils", "../../models/commonModels", "../../features/page/StoreActionsWrapped", "./BaseComponent"], function (require, exports, jsx_runtime_1, React, Content_1, Utils_1, commonModels_1, StoreActionsWrapped_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Field = void 0;
    React = __importStar(React);
    StoreActionsWrapped_1 = __importDefault(StoreActionsWrapped_1);
    var Field = /** @class */ (function (_super) {
        __extends(Field, _super);
        function Field(props) {
            var _a;
            var _this = _super.call(this, props) || this;
            var error = Utils_1.Utils.checkContentProps(props, ['formpath', 'fieldname']);
            // вызов формы без этих параметров ошибка конфигурации
            _this.settings = props.settings || {};
            _this.site = (_a = props.session) === null || _a === void 0 ? void 0 : _a.site;
            //this.page = props.pageWraper?.item as iPage;
            _this.formpath = _this.settings.formpath || 'unknown'; // наличие этих настроек проверяется выше (см установку значения let error = ...)
            _this.fieldname = _this.settings.fieldname || 'unknown';
            //error = ['test error', '1123'];
            //if (typeof props.settings === 'undefined') return;
            //const val: string | string[] = this.settings['type'] === 'array' ? JSON.parse(this.settings['value']) as string[] : this.settings['value'] as string;
            _this.state = { error: error };
            //FormStorage.setValue(this.formpath, this.fieldname, val);
            _this.handleChange = _this.handleChange.bind(_this);
            _this.refStoreActions = React.createRef();
            return _this;
        } /* */
        Field.prototype.handleChange = function (event) {
            //if (typeof this.props.settings === 'undefined') return;
            var _a;
            commonModels_1.Console.log('field change!', this.formpath, this.fieldname, event.target.value);
            //this.setState({ value: event.target.value });
            //FormStorage.setValue(this.formpath, this.fieldname, event.target.value as string | string[]);
            (_a = this.refStoreActions.current) === null || _a === void 0 ? void 0 : _a.setFieldValue(this.formpath, this.fieldname, event.target.value); // | string[]
        };
        Field.prototype.getValue = function () {
            var _a, _b;
            return Utils_1.Utils.getFieldValue(((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.forms) || {}, this.formpath, this.fieldname);
        };
        Field.prototype.renderErrorMessage = function () {
            var settings = this.props.settings || {}; // здесь нельзя использовать this.settings так как он не меняется после создания компонента
            return typeof settings.error === 'undefined' || !settings.error ? null : jsx_runtime_1.jsx(Content_1.Content, { content: Utils_1.Utils.genErrorContent([settings.error]), pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
        };
        Field.prototype.renderField = function () {
            //if (typeof this.props.settings === 'undefined') return;
            var inp = jsx_runtime_1.jsx("input", { type: this.getSetting('fieldtype'), placeholder: this.getSetting('label', ''), value: this.getValue(), onChange: this.handleChange }, void 0);
            var err = this.renderErrorMessage();
            var label = jsx_runtime_1.jsx("span", { children: this.getSetting('label') }, void 0);
            //Console.log('field error', this.formpath, this.fieldname, err);
            //return err === null ? inp : <div>{inp}{err}</div>;
            return jsx_runtime_1.jsxs("div", { children: [label, inp, err] }, void 0);
        };
        Field.prototype.renderWraps = function () {
            return jsx_runtime_1.jsx(StoreActionsWrapped_1.default, { ref: this.refStoreActions }, void 0);
        };
        Field.prototype.render = function () {
            //Console.log('hhhhhhhhhhhh1', this.props.content);
            return jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [this.renderWraps(), this.renderField()] }, void 0);
        };
        return Field;
    }(BaseComponent_1.BaseComponent));
    exports.Field = Field;
});