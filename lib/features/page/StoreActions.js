"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreActions = exports.mapDispatchToProps = exports.mapStateToProps = void 0;
var React = __importStar(require("react"));
//import { connect } from 'react-redux';
var redux_1 = require("redux");
var pageSlice_1 = require("../../features/page/pageSlice");
//import { RouteComponentProps } from 'react-router-dom';
//import { Utils } from '../../helpers/Utils';
var mapStateToProps = function (state) { return (state.page); };
exports.mapStateToProps = mapStateToProps;
/*const mapDispatchToProps = {
    setPage: setPage
}*/
// Thunk Action
var mapDispatchToProps = function (dispatch) { return redux_1.bindActionCreators({
    /*load: (path: string, params: Hash<string>) => async (dispatch: AppDispatch): Promise<void> => {
        dispatch(loadPageAsync(path, params))
    },/**/
    clearForm: pageSlice_1.clearForm,
    setFieldValue: pageSlice_1.setFieldValue,
    load: pageSlice_1.loadPageAsync,
    post: pageSlice_1.postFormAsync,
    startLoadPage: pageSlice_1.startLoadPage,
    //startFormSubmit: startFormSubmit,
    test: pageSlice_1.testPage
}, dispatch); }; /* */
exports.mapDispatchToProps = mapDispatchToProps;
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
exports.StoreActions = StoreActions;