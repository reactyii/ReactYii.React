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
import { Utils } from '../../helpers/Utils';
//import { StoreActions } from '../../features/page/StoreActions';
//import StoreActionsWrapped from '../../features/page/StoreActionsWrapped';
import { Link } from 'react-router-dom';
//import { Html } from '../Html';
var FormReset = /** @class */ (function (_super) {
    __extends(FormReset, _super);
    //fieldname: string;
    //refStoreActions: React.RefObject<StoreActions>;
    function FormReset(props) {
        var _a, _b;
        var _this = _super.call(this, props) || this;
        //let error: string[] = Utils.checkContentProps(props, ['formpath']);
        // вызов формы без этих параметров ошибка конфигурации
        _this.settings = props.settings || {};
        _this.site = (_a = props.session) === null || _a === void 0 ? void 0 : _a.site;
        _this.page = (_b = props.pageWraper) === null || _b === void 0 ? void 0 : _b.item;
        _this.formpath = _this.settings.formpath || 'unknown'; // наличие этих настроек проверяется выше (см установку значения let error = ...)
        return _this;
        //this.handleClick = this.handleClick.bind(this);
        //this.refStoreActions = React.createRef<StoreActions>();
    } /* */
    /*handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        Console.log('FormReset handleClick!!!!!!!!!', this.formpath);
        //FormStorage.clearForm(this.formpath);
    }*/
    FormReset.prototype.renderButton = function () {
        var _a;
        //return <button type="submit" onClick={this.handleClick}>reset</button>;
        // todo! добавить сортировку в filterAndSort аргумент
        var _b = Utils.makeFilterUrl(this.page, this.page, this.site, this.formpath, '0', ''), url = _b[1];
        return React.createElement(Link, { to: url }, ((_a = this.props.settings) === null || _a === void 0 ? void 0 : _a.value) || 'Reset');
    };
    FormReset.prototype.renderWraps = function () {
        return [];
        /*return <>
            <StoreActionsWrapped ref={this.refStoreActions} />
        </>;/**/
    };
    FormReset.prototype.render = function () {
        return React.createElement(React.Fragment, null,
            this.renderWraps(),
            this.renderButton()); /**/
    };
    return FormReset;
}(React.Component));
export { FormReset };