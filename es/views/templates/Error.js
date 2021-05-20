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
            return React.createElement("div", { key: item.id, style: style, dangerouslySetInnerHTML: { __html: item.content } }); // ����� ���� �������� ���� &quot;
        });
    };
    return Error;
}(React.Component));
export { Error };