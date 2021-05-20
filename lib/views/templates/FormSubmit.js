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
        return React.createElement("button", { name: ((_a = this.props.settings) === null || _a === void 0 ? void 0 : _a.ignore) ? '' : (_b = this.props.settings) === null || _b === void 0 ? void 0 : _b.fieldname, type: "submit" }, ((_c = this.props.settings) === null || _c === void 0 ? void 0 : _c.value) || 'Submit');
    };
    return FormSubmit;
}(React.Component));
exports.FormSubmit = FormSubmit;