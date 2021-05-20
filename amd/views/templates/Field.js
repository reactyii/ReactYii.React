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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react", "../Content", "../../helpers/Utils", "../../models/commonModels", "../../features/page/StoreActionsWrapped", "./BaseComponent"], function (require, exports, React, Content_1, Utils_1, commonModels_1, StoreActionsWrapped_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            return typeof settings.error === 'undefined' || !settings.error ? null : React.createElement(Content_1.Content, { content: Utils_1.Utils.genErrorContent([settings.error]), pageWraper: this.props.pageWraper, session: this.props.session });
        };
        Field.prototype.renderField = function () {
            //if (typeof this.props.settings === 'undefined') return;
            var inp = React.createElement("input", { type: this.getSetting('fieldtype'), placeholder: this.getSetting('label', ''), value: this.getValue(), onChange: this.handleChange });
            var err = this.renderErrorMessage();
            var label = React.createElement("span", null, this.getSetting('label'));
            //Console.log('field error', this.formpath, this.fieldname, err);
            //return err === null ? inp : <div>{inp}{err}</div>;
            return React.createElement("div", null,
                label,
                inp,
                err);
        };
        Field.prototype.renderWraps = function () {
            return React.createElement(StoreActionsWrapped_1.default, { ref: this.refStoreActions });
        };
        Field.prototype.render = function () {
            //Console.log('hhhhhhhhhhhh1', this.props.content);
            return React.createElement(React.Fragment, null,
                this.renderWraps(),
                this.renderField());
        };
        return Field;
    }(BaseComponent_1.BaseComponent));
    exports.Field = Field;
});