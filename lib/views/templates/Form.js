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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Form = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var Content_1 = require("../Content");
var Utils_1 = require("../../helpers/Utils");
//import { FormStorage } from '../../helpers/FormStorage';
var commonModels_1 = require("../../models/commonModels");
var StoreActionsWrapped_1 = __importDefault(require("../../features/page/StoreActionsWrapped"));
var RouterWrapped_1 = __importDefault(require("../../features/page/RouterWrapped"));
var BaseComponent_1 = require("./BaseComponent");
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form(props) {
        var _a;
        var _this = _super.call(this, props) || this;
        var error = Utils_1.Utils.checkContentProps(props, ['path']);
        // вызов формы без этих параметров ошибка конфигурации
        _this.settings = props.settings || {};
        _this.site = (_a = props.session) === null || _a === void 0 ? void 0 : _a.site;
        //this.page = props.pageWraper?.item as iPage;
        // так как фильтр нам нужен и в списке! то юзаем вместе имени формы path
        _this.path = _this.settings.path || 'unknown';
        //this.formname = props.settings?.formname || 'unknown'; // так как инит формы в конструкторе (ошибку мы покажем в рендере)
        _this.method = typeof _this.settings.method !== 'undefined' ? _this.settings['method'] : 'post';
        //error = ['test error', '1123'];
        _this.state = { error: error };
        //Console.log('.....', props.settings);
        //FormStorage.initForm(this.path);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        //const ref = React.createRef<StoreActions>();
        _this.refStoreActions = React.createRef();
        _this.refRouter = React.createRef();
        return _this;
    } /* */
    Form.prototype.handleSubmit = function (event) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.method === 'get') { // делаем редирект
            //const url = this.getActionUrl(this.refStoreActions.current?.getFilterContentArgs(this.path) || '');
            var url = this.getActionUrl(Utils_1.Utils.getFilterContentArgs(this.path, ((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.forms) || {}) || '');
            commonModels_1.Console.log('-+-+  handleSubmit: redirect to:', url);
            //return false;
            //this.setState({ redirectto: url });
            //if (this.refStoreActions?.current !== null) this.refStoreActions.current.loadPage(url);
            if (((_c = this.refRouter) === null || _c === void 0 ? void 0 : _c.current) !== null) {
                this.refRouter.current.historyPush(url);
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            else {
                // маловероятно, но хз
                commonModels_1.Console.error('refRouter is null');
            }
            //Console.log('this.refRouter=', this.refRouter);
            /**/
        }
        else {
            // отправка поста
            //Console.log('redirect to:', url, this.refStoreActions?.current);
            var page = (_d = this.props.pageWraper) === null || _d === void 0 ? void 0 : _d.item;
            var data = ((_f = (_e = this.props.pageWraper) === null || _e === void 0 ? void 0 : _e.item) === null || _f === void 0 ? void 0 : _f.forms[this.path]) || {};
            var id = typeof data.id !== 'undefined' ? data.id : '?';
            var _j = Utils_1.Utils.makeFilterUrl(page, page, this.site, this.path, '', '__edit/' + id), url = _j[1];
            //const url = this.getActionUrl('__edit/0');
            commonModels_1.Console.log('submit form', url, data);
            if (((_g = this.refStoreActions) === null || _g === void 0 ? void 0 : _g.current) !== null)
                (_h = this.refStoreActions) === null || _h === void 0 ? void 0 : _h.current.submitForm(url, {}, data);
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    };
    /*
     * Не переопределять этот метод!!!!
     * так как при построении списка (пагинатор, сортировка) мы используем тот же алгоритм
     */
    Form.prototype.getActionUrl = function (filterAndSort) {
        // напоминание у нас другой host может быть тока на другом разделе и мы пока предполагаем что форма и ее сабмит на одном и том же разделе
        var _a;
        /*const [not_used_host, url] = Utils.makeUrl(this.page, this.page, this.site, settings.path + (filter ? '/0/' + filter : '')); // + '/{{PAGE}}'
        return url;*/
        // см коментарий в Utils.makeFilterUrl (всегда указываем '0' страницу при применении фильтров. даже если фильтр сброшен!)
        var page = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item;
        var _b = Utils_1.Utils.makeFilterUrl(page, page, this.site, this.path, '0', filterAndSort), url = _b[1];
        return url;
    };
    Form.prototype.renderWraps = function () {
        return jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [jsx_runtime_1.jsx(StoreActionsWrapped_1.default, { ref: this.refStoreActions }, void 0),
                jsx_runtime_1.jsx(RouterWrapped_1.default, { ref: this.refRouter }, void 0)] }, void 0);
    };
    Form.prototype.renderForm = function () {
        var _error = this.getContentByKey('ERROR');
        //Console.log('errors:', _error);
        var error = _error.length > 0 ? jsx_runtime_1.jsx(Content_1.Content, { content: _error, pageWraper: this.props.pageWraper, session: this.props.session }, "formerror") : null;
        var _content = this.getContentByKey();
        //Console.log('fields:', _content);
        var content = jsx_runtime_1.jsx(Content_1.Content, { content: _content, pageWraper: this.props.pageWraper, session: this.props.session }, "formcontent");
        var action = this.getActionUrl('');
        return jsx_runtime_1.jsxs("form", __assign({ action: action, method: this.method, onSubmit: this.handleSubmit }, { children: [this.renderWraps(), error, content] }), void 0);
    };
    Form.prototype.render = function () {
        //Console.log('hhhhhhhhhhhh1');
        // ошибки компонента! ошибки самой формы покажутся в форме как обычные единицы контента
        if (this.state.error.length > 0)
            return this.renderError(this.state.error);
        //if (typeof this.state.redirectto !== 'undefined') return <Redirect push to={this.state.redirectto} />;
        // блок с копипиздой проверка всех настроек и загрузок (если у формы нет настроек или страница не загружена, то скипаем форму)
        //if (typeof this.props.settings === 'undefined') return 'Error';
        //if (typeof this.props.pageWraper?.item === 'undefined' || this.props.pageWraper?.item === null) return 'Error';
        //if (typeof this.props.session?.site === 'undefined') return 'Error';
        return this.renderForm();
    };
    return Form;
}(BaseComponent_1.BaseComponent));
exports.Form = Form;