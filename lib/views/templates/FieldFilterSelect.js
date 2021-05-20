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
//import { iContent, iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
var Utils_1 = require("../../helpers/Utils");
//import { Console, Hash, iFieldState } from '../../models/commonModels';
var FieldSelect_1 = require("./FieldSelect");
var FieldFilterSelect = /** @class */ (function (_super) {
    __extends(FieldFilterSelect, _super);
    function FieldFilterSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFilterSelect.prototype.renderField = function () {
        var _a, _b, _c;
        var value = Utils_1.Utils.getFieldValue(((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.forms) || {}, this.formpath, this.fieldname);
        var multiple = !!((_c = this.props.settings) === null || _c === void 0 ? void 0 : _c.multiple);
        var selected = multiple && !Array.isArray(value) ? [value] : value;
        //const _val = multiple &&
        return React.createElement("select", { value: selected, multiple: multiple, onChange: this.handleChange }, this.renderOptions(this.getContentByKey()) // 
        );
    };
    return FieldFilterSelect;
}(FieldSelect_1.FieldSelect));
exports.FieldFilterSelect = FieldFilterSelect;