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
//import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
//import { iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { Hash } from '../../models/commonModels';
//import { Html } from '../Html';
import { Form } from './Form';
var FormFilter = /** @class */ (function (_super) {
    __extends(FormFilter, _super);
    function FormFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FormFilter;
}(Form));
export { FormFilter };
