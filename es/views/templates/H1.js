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
import { Content } from '../Content';
var H1 = /** @class */ (function (_super) {
    __extends(H1, _super);
    function H1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    H1.prototype.render = function () {
        //Console.log('hhhhhhhhhhhh1', this.props.content);
        // не используем this.props.child
        //const content = this.props.children;
        var content = React.createElement(Content, { content: this.props.content.filter(function (item) {
                return typeof item.content_keys === 'undefined' || item.content_keys.indexOf('CONTENT') >= 0;
            }), pageWraper: this.props.pageWraper, session: this.props.session });
        // протестируем передачу настроек в компоненты
        if (typeof this.props.settings !== 'undefined' && typeof this.props.settings['align'] !== 'undefined') {
            var h1Style = { textAlign: this.props.settings['align'] };
            return React.createElement("h1", { style: h1Style }, content);
        }
        return React.createElement("h1", null, content);
    };
    return H1;
}(React.Component));
export { H1 };