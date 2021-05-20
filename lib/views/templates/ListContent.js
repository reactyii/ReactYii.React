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
var List_1 = require("./List");
var ListContent = /** @class */ (function (_super) {
    __extends(ListContent, _super);
    function ListContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListContent.prototype.renderRow = function (content) {
        var linkEdit = this.renderLinkAddEdit((content === null || content === void 0 ? void 0 : content.childs) || [], 'EDIT', content.id);
        return React.createElement("div", { key: content.id },
            React.createElement("div", { style: { float: 'right' } }, linkEdit),
            React.createElement("b", null, content.id),
            " ",
            content.name);
    }; /**/
    return ListContent;
}(List_1.List));
exports.ListContent = ListContent;