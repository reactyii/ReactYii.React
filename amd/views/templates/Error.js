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
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
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
    exports.Error = Error;
});