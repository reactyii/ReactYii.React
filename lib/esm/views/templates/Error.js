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
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
//import { Content } from '../Content';
//import { Html } from '../Html';
var Error = /** @class */ (function (_super) {
    __extends(Error, _super);
    function Error() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Error.prototype.render = function () {
        //Console.log('hhhhhhhhhhhh1', this.props.content);
        var style = { color: '#e10000' };
        return this.props.content.map(function (item) {
            return _jsx("div", { style: style, dangerouslySetInnerHTML: { __html: item.content } }, item.id); // ����� ���� �������� ���� &quot;
        });
    };
    return Error;
}(React.Component));
export { Error };
