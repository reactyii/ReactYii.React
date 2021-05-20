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
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Message.prototype.render = function () {
        //Console.log('hhhhhhhhhhhh1', this.props.content);
        var style = { color: '#00e100' };
        return this.props.content.map(function (item) {
            return React.createElement("div", { key: item.id, style: style, dangerouslySetInnerHTML: { __html: item.content } }); // могут быть сущности типа &quot;
        });
    };
    return Message;
}(React.Component));
export { Message };