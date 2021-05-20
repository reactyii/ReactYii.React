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
define(["require", "exports", "react", "redux", "../../features/page/pageSlice"], function (require, exports, React, redux_1, pageSlice_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    React = __importStar(React);
    //import { RouteComponentProps } from 'react-router-dom';
    //import { Utils } from '../../helpers/Utils';
    exports.mapStateToProps = function (state) { return (state.page); };
    /*const mapDispatchToProps = {
        setPage: setPage
    }*/
    // Thunk Action
    exports.mapDispatchToProps = function (dispatch) { return redux_1.bindActionCreators({
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
});