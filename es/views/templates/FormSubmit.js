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
import * as React from 'react';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { FormStorage } from '../../helpers/FormStorage';
//import { Hash, iSite } from '../../models/commonModels';
//import { iPage } from '../../models/pageModels';
//import { Html } from '../Html';
var FormSubmit = /** @class */ (function (_super) {
    __extends(FormSubmit, _super);
    function FormSubmit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormSubmit.prototype.render = function () {
        var _a, _b, _c;
        return _jsx("button", __assign({ name: ((_a = this.props.settings) === null || _a === void 0 ? void 0 : _a.ignore) ? '' : (_b = this.props.settings) === null || _b === void 0 ? void 0 : _b.fieldname, type: "submit" }, { children: ((_c = this.props.settings) === null || _c === void 0 ? void 0 : _c.value) || 'Submit' }), void 0);
    };
    return FormSubmit;
}(React.Component));
export { FormSubmit };