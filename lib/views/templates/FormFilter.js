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
Object.defineProperty(exports, "__esModule", { value: true });
//import * as React from 'react';
//import { Console, ContentType } from '../../models/commonModels';
//import { iContentProps } from '../../models/contentModels';
//import { Content } from '../Content';
//import { Utils } from '../../helpers/Utils';
//import { Hash } from '../../models/commonModels';
//import { Html } from '../Html';
var Form_1 = require("./Form");
var FormFilter = /** @class */ (function (_super) {
    __extends(FormFilter, _super);
    function FormFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FormFilter;
}(Form_1.Form));
exports.FormFilter = FormFilter;