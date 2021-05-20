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
exports.FieldFilter = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
//import { iContent, iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { Console, Hash, iFieldState } from '../../models/commonModels';
var Field_1 = require("./Field");
var FieldFilter = /** @class */ (function (_super) {
    __extends(FieldFilter, _super);
    function FieldFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldFilter.prototype.renderField = function () {
        return jsx_runtime_1.jsx("input", { className: this.getSetting('inputclass'), type: this.getSetting('fieldtype'), placeholder: this.getSetting('label', ''), value: this.getValue(), onChange: this.handleChange }, void 0);
    };
    return FieldFilter;
}(Field_1.Field));
exports.FieldFilter = FieldFilter;