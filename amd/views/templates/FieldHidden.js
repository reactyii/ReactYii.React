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
define(["require", "exports", "./Field"], function (require, exports, Field_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var FieldHidden = /** @class */ (function (_super) {
        __extends(FieldHidden, _super);
        function FieldHidden() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // для оптимизации чтоб невызывался пререндер
        FieldHidden.prototype.shouldComponentUpdate = function (props, state) {
            return false;
        };
        // тут ничего рендерить не надо
        FieldHidden.prototype.renderField = function () {
            return [];
        };
        return FieldHidden;
    }(Field_1.Field));
    exports.FieldHidden = FieldHidden;
});