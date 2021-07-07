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
import * as React from 'react';
//import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startLoadPage, loadPageAsync, testPage, clearForm, setFieldValue, postFormAsync } from '../../features/page/pageSlice';
//import { RouteComponentProps } from 'react-router-dom';
//import { Utils } from '../../helpers/Utils';
export var mapStateToProps = function (state) { return (state.page); };
/*const mapDispatchToProps = {
    setPage: setPage
}*/
// Thunk Action
export var mapDispatchToProps = function (dispatch) { return bindActionCreators({
    /*load: (path: string, params: Hash<string>) => async (dispatch: AppDispatch): Promise<void> => {
        dispatch(loadPageAsync(path, params))
    },/**/
    clearForm: clearForm,
    setFieldValue: setFieldValue,
    load: loadPageAsync,
    post: postFormAsync,
    startLoadPage: startLoadPage,
    //startFormSubmit: startFormSubmit,
    test: testPage
}, dispatch); }; /* */
var StoreActions = /** @class */ (function (_super) {
    __extends(StoreActions, _super);
    function StoreActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // для оптимизации чтоб невызывался пререндер
    StoreActions.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        return false;
    };
    StoreActions.prototype.clearForm = function (formkey, fullClear) {
        if (fullClear === void 0) { fullClear = false; }
        this.props.clearForm({ formkey: formkey, fullClear: fullClear });
    };
    StoreActions.prototype.setFieldValue = function (formkey, fieldName, value) {
        this.props.setFieldValue({ formkey: formkey, fieldName: fieldName, value: value });
    };
    /*public getFieldValue(formkey: string, fieldName: string): string | string[] {
        if (typeof this.props.forms[formkey] === 'undefined') return '';
        if (typeof this.props.forms[formkey][fieldName] === 'undefined') return '';
        return this.props.forms[formkey][fieldName];
    }/**/
    /*public getFilterContentArgs(formkey: string): string {
        if (typeof this.props.pageWraper?.item?.forms[formkey] === 'undefined') return '';
        return Utils.joinUrlParams(this.props.pageWraper?.item?.forms[formkey], true, Utils.encodePercentsSymbol);//.replace('&', encodeURIComponent('&'));
    }/**/
    StoreActions.prototype.submitForm = function (url, get, post) {
        //this.props.startFormSubmit(url);
        this.props.post(url, get, post);
    };
    StoreActions.prototype.loadPage = function (path) {
        // может скопировать с PageLoader?
        //Console.log('loadPage', this.props.history);
        this.props.load(path, {});
    };
    StoreActions.prototype.render = function () {
        return null; //'---';
    };
    return StoreActions;
}(React.Component));
export { StoreActions };
