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
define(["require", "exports", "./Form"], function (require, exports, Form_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FormFilter = /** @class */ (function (_super) {
        __extends(FormFilter, _super);
        function FormFilter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return FormFilter;
    }(Form_1.Form));
    exports.FormFilter = FormFilter;
});