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
// A simple component that shows the pathname of the current location
var Router = /** @class */ (function (_super) {
    __extends(Router, _super);
    function Router() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // для оптимизации чтоб невызывался пререндер
    Router.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return false;
    };
    Router.prototype.historyPush = function (url) {
        this.props.history.push(url);
    };
    Router.prototype.render = function () {
        return null;
    };
    return Router;
}(React.Component));
export { Router };