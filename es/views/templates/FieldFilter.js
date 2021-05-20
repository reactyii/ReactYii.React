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
import * as React from 'react';
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
        return React.createElement("input", { className: this.getSetting('inputclass'), type: this.getSetting('fieldtype'), placeholder: this.getSetting('label', ''), value: this.getValue(), onChange: this.handleChange });
    };
    return FieldFilter;
}(Field));
export { FieldFilter };