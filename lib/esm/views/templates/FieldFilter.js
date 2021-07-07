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
//import { iContent, iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { Console, Hash, iFieldState } from '../../models/commonModels';
import { Field } from './Field';
var FieldFilter = /** @class */ (function (_super) {
    __extends(FieldFilter, _super);
    function FieldFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFilter.prototype.renderField = function () {
        return _jsx("input", { className: this.getSetting('inputclass'), type: this.getSetting('fieldtype'), placeholder: this.getSetting('label', ''), value: this.getValue(), onChange: this.handleChange }, void 0);
    };
    return FieldFilter;
}(Field));
export { FieldFilter };
