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
define(["require", "exports", "react/jsx-runtime", "react", "./List"], function (require, exports, jsx_runtime_1, React, List_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ListContent = void 0;
    React = __importStar(React);
    var ListContent = /** @class */ (function (_super) {
        __extends(ListContent, _super);
        function ListContent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ListContent.prototype.renderRow = function (content) {
            var linkEdit = this.renderLinkAddEdit((content === null || content === void 0 ? void 0 : content.childs) || [], 'EDIT', content.id);
            return jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", __assign({ style: { float: 'right' } }, { children: linkEdit }), void 0),
                    jsx_runtime_1.jsx("b", { children: content.id }, void 0), " ", content.name] }, content.id);
        }; /**/
        return ListContent;
    }(List_1.List));
    exports.ListContent = ListContent;
});