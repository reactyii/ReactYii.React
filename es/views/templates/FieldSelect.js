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
            var opt = [React.createElement("option", { key: item.id, value: item.path, dangerouslySetInnerHTML: { __html: prefix + item.content } })]; // selected={selected.indexOf(item.path) >= 0}
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
        var label = React.createElement("span", null, this.getSetting('label'));
        //const _val = multiple &&
        var select = React.createElement("select", { value: selected, multiple: multiple, onChange: this.handleChange }, this.renderOptions(this.getContentByKey()) // 
        );
        //return err === null ? select : <div>{select}{err}</div>;
        return React.createElement("div", null,
            label,
            select,
            err);
    };
    return FieldSelect;
}(Field));
export { FieldSelect };