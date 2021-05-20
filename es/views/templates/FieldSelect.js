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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
//import { Content } from '../Content';
import { Utils } from '../../helpers/Utils';
import { Console } from '../../models/commonModels';
import { Field } from './Field';
var FieldSelect = /** @class */ (function (_super) {
    __extends(FieldSelect, _super);
    function FieldSelect(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    FieldSelect.prototype.handleChange = function (event) {
        //if (typeof this.props.settings === 'undefined') return;
        var _a, _b;
        Console.log('select change!', this.formpath, this.fieldname, event.target.selectedOptions);
        //Console.log('multiple=', this.props.settings?.multiple);
        var vals = Array.from(event.target.selectedOptions, function (item) { return item.value; });
        var multiple = !!((_a = this.props.settings) === null || _a === void 0 ? void 0 : _a.multiple);
        //this.setState({ value: event.target.value });
        //FormStorage.setValue(this.formpath, this.fieldname, event.target.value as string | string[]);
        (_b = this.refStoreActions.current) === null || _b === void 0 ? void 0 : _b.setFieldValue(this.formpath, this.fieldname, multiple ? vals : (vals.length > 0 ? vals[0] : ''));
    };
    FieldSelect.prototype.renderOptions = function (options, selected, singlePrefix, prefix) {
        var _this = this;
        if (selected === void 0) { selected = []; }
        if (singlePrefix === void 0) { singlePrefix = '&raquo;'; }
        if (prefix === void 0) { prefix = ""; }
        //const singlePrefix = 
        return options.map(function (item) {
            // так как у нас может быть html в частности в префиксе &raquo;
            var opt = [_jsx("option", { value: item.path, dangerouslySetInnerHTML: { __html: prefix + item.content } }, item.id)]; // selected={selected.indexOf(item.path) >= 0}
            var opts = typeof item.childs !== 'undefined' && item.childs.length > 0 ? _this.renderOptions(item.childs, selected, singlePrefix, prefix + singlePrefix) : [];
            return opt.concat(opts);
        });
    };
    FieldSelect.prototype.renderField = function () {
        var _a, _b, _c;
        //if (typeof this.props.settings === 'undefined') return;
        var value = Utils.getFieldValue(((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.forms) || {}, this.formpath, this.fieldname);
        var multiple = !!((_c = this.props.settings) === null || _c === void 0 ? void 0 : _c.multiple);
        var selected = multiple && !Array.isArray(value) ? [value] : value;
        var err = this.renderErrorMessage();
        var label = _jsx("span", { children: this.getSetting('label') }, void 0);
        //const _val = multiple &&
        var select = _jsx("select", __assign({ value: selected, multiple: multiple, onChange: this.handleChange }, { children: this.renderOptions(this.getContentByKey()) // 
         }), void 0);
        //return err === null ? select : <div>{select}{err}</div>;
        return _jsxs("div", { children: [label, select, err] }, void 0);
    };
    return FieldSelect;
}(Field));
export { FieldSelect };