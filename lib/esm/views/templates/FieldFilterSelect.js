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
import { jsx as _jsx } from "react/jsx-runtime";
//import { iContent, iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
//import { Console, Hash, iFieldState } from '../../models/commonModels';
import { FieldSelect } from './FieldSelect';
var FieldFilterSelect = /** @class */ (function (_super) {
    __extends(FieldFilterSelect, _super);
    function FieldFilterSelect() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFilterSelect.prototype.renderField = function () {
        var _a, _b, _c;
        var value = Utils.getFieldValue(((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.forms) || {}, this.formpath, this.fieldname);
        var multiple = !!((_c = this.props.settings) === null || _c === void 0 ? void 0 : _c.multiple);
        var selected = multiple && !Array.isArray(value) ? [value] : value;
        //const _val = multiple &&
        return _jsx("select", __assign({ value: selected, multiple: multiple, onChange: this.handleChange }, { children: this.renderOptions(this.getContentByKey()) // 
         }), void 0);
    };
    return FieldFilterSelect;
}(FieldSelect));
export { FieldFilterSelect };
