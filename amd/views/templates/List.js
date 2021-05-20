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
define(["require", "exports", "react/jsx-runtime", "react", "../../helpers/Utils", "../../models/commonModels", "../Content", "./BaseComponent"], function (require, exports, jsx_runtime_1, React, Utils_1, commonModels_1, Content_1, BaseComponent_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.List = void 0;
    React = __importStar(React);
    var List = /** @class */ (function (_super) {
        __extends(List, _super);
        // не будем странциу засовывать в свойства компонента, страница меняется в течении жизни компонента
        //page: iPage;
        // не будем использовать! так как настройки (в частности пагинатора) будут меняться
        //settings: Hash<string>; // NB!!! использваоть тока для фиксированных свойств, например "path"! 
        //refStoreActions: React.RefObject<StoreActions>;
        function List(props) {
            var _a, _b;
            var _this = _super.call(this, props) || this;
            var error = Utils_1.Utils.checkContentProps(props, ['path']);
            // вызов формы без этих параметров ошибка конфигурации
            //this.settings = props.settings || {};
            _this.site = (_a = props.session) === null || _a === void 0 ? void 0 : _a.site;
            //this.page = props.pageWraper?.item as iPage;
            // так как фильтр нам нужен и в списке! то юзаем вместе имени формы path
            _this.path = ((_b = _this.props.settings) === null || _b === void 0 ? void 0 : _b.path) || 'unknown'; // path у списка не меняется
            //error = ['test error', '1123'];
            _this.state = { error: error };
            return _this;
            //Console.log('.....', props.settings);
            //this.refStoreActions = React.createRef<StoreActions>();
        } /* */
        List.prototype.renderHeader = function () {
            return this.renderContentByKey('HEADER');
        };
        List.prototype.renderFilter = function () {
            //Console.log(':::', this.props.content.filter(item => item.content_keys?.indexOf('FILTER') >= 0));
            return this.renderContentByKey('FILTER');
        };
        List.prototype.renderSort = function () {
            return this.renderContentByKey('SORT');
        };
        List.prototype.renderBefore = function () {
            return this.renderContentByKey('BEFORE');
        };
        List.prototype.renderAfter = function () {
            return this.renderContentByKey('AFTER');
        };
        /**
         * Делаем копию единицы контента ссылки на добавление так как нам нужно сформировать корректный урл (бэкенд не сильно разбирается как формировать урлы)
         * просто заменить settings.url не получится так как идет передача по "ссылке" и нельзя изменить объект в сторе редукса (если короче, то content is readonly)
         *
         * @param content
         */
        List.prototype._cloneAddEditLink = function (content, id) {
            var _a;
            if (id === void 0) { id = '0'; }
            if (content.type !== commonModels_1.ContentType.LinkAdd && content.type !== commonModels_1.ContentType.LinkEdit)
                return content;
            var page = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item;
            var _b = Utils_1.Utils.makeFilterUrl(page, page, this.site, this.path, '', '__edit/' + id), url = _b[1];
            var _content = Utils_1.Utils.clone(content);
            if (typeof _content.settings === 'undefined') {
                _content.settings = { url: url };
            }
            else {
                _content.settings.url = url;
            }
            return _content;
        };
        List.prototype.renderLinkAddEdit = function (childs, action, id) {
            if (action === void 0) { action = 'ADD'; }
            if (id === void 0) { id = '0'; }
            // надо сформирвоать url
            var content = childs.filter(function (item) { var _a; return ((_a = item.content_keys) === null || _a === void 0 ? void 0 : _a.indexOf('LINK' + action)) >= 0; });
            //Console.log('renderLinkAddEdit() content=', content, action);
            //Console.log('renderLinkAddEdit() childs=', this.props.content, action);
            if (content.length === 0)
                return null;
            var newContent = [];
            for (var i = 0, l = content.length; i < l; i++) {
                newContent.push(this._cloneAddEditLink(content[i], id));
                //Console.log('>>>', newContent[i].settings);
            }
            return jsx_runtime_1.jsx(Content_1.Content, { content: newContent, pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
            //return this.renderContent('LINKADD');
        };
        List.prototype.renderRow = function (content) {
            var linkEdit = this.renderLinkAddEdit((content === null || content === void 0 ? void 0 : content.childs) || [], 'EDIT', content.id);
            /*const _content = typeof content.childs !== 'undefined' && content.childs.length > 0
                ? content.childs?.filter(item => typeof item.content_keys === 'undefined' || item.content_keys?.indexOf('CONTENT') >= 0)
                : [{ id: content.id, name: '', content: content.content, priority: 100, content_keys: ['CONTENT'], parent_id: null, path: '', type: null, template: null, template_key: null }];
            /**/
            //Console.log('renderRow content=', content);
            var c = jsx_runtime_1.jsx(Content_1.Content, { content: [content], pageWraper: this.props.pageWraper, session: this.props.session }, content.id);
            // по умолчанию если есть линк на редактирование, то сунем его вправо и обернем все div-ами. в реальных преопределениях все равно переопределим эту функцию
            //Console.log('linkEdit=', linkEdit);
            return linkEdit !== null ? jsx_runtime_1.jsxs("div", { children: [jsx_runtime_1.jsx("div", __assign({ style: { float: 'right' } }, { children: linkEdit }), void 0), c] }, content.id) : c;
            //return '???';
        };
        List.prototype.renderList = function () {
            var _this = this;
            //Console.log('-=-=-=-=  renderList()');
            return this.getContentByKey().map(function (item) { return _this.renderRow(item); });
        };
        List.prototype.getSettingsForPages = function () {
            var _a;
            var settings = Utils_1.Utils.clone(this.props.settings || {}); // NB!!! здесь именно this.props.settings так как настрйоки пагинатора будут менятся в завимсимости от фильтра и текущей страницы
            // в урл надо добавить параметры фильтра и сортировку списка
            var page = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item;
            var _b = Utils_1.Utils.makeFilterUrl(page, page, this.site, this.path, '{{PAGE}}', Utils_1.Utils.getFilterContentArgs(this.path, page.forms || {}) || ''), url = _b[1];
            settings.base_url = url;
            var url1 = url.replace('{{PAGE}}', '0');
            settings.first_url = url1;
            return settings;
        };
        List.prototype.renderPages = function () {
            var settings = this.getSettingsForPages();
            // НЕ ДЕЛАТЬ ТАК! так как таким макаром мы не сможем поменять отрисовку пагинатора у потомка
            //return <Paginator content={[]} pageWraper={this.props.pageWraper} session={this.props.session} settings={settings} />;
            // вот так  мы и вставим Paginator именно из шаблона
            var pc = Utils_1.Utils.genContent('Paginator', '', 'Paginator');
            pc.settings = settings;
            return jsx_runtime_1.jsx(Content_1.Content, { content: [pc], pageWraper: this.props.pageWraper, session: this.props.session }, void 0);
        };
        List.prototype.renderFounded = function () {
            var _a, _b, _c;
            var countAll = ((_a = this.props.settings) === null || _a === void 0 ? void 0 : _a.total_rows) || '0';
            var max_on_page = ((_b = this.props.settings) === null || _b === void 0 ? void 0 : _b.per_page) || '0';
            var offset = ((_c = this.props.settings) === null || _c === void 0 ? void 0 : _c.cur_page) || '0';
            var count = this.getContentByKey().length;
            return 'Найдено ' + countAll + '.' + (+count > 0 ? ' Показано ' + (+offset * +max_on_page) + ' - ' + (+offset * +max_on_page + +count) : '');
        };
        List.prototype.renderWraps = function () {
            return [];
            /*return <>
                <StoreActionsWrapped ref={this.refStoreActions} />
            </>;/**/
        };
        List.prototype.render = function () {
            //Console.log('.....', this.props.settings);
            // ошибки компонента! ошибки самой формы покажутся в форме как обычные единицы контента
            if (this.state.error.length > 0)
                return this.renderError(this.state.error);
            return jsx_runtime_1.jsxs(jsx_runtime_1.Fragment, { children: [this.renderWraps(), this.renderHeader(), this.renderBefore(), this.renderFilter(), this.renderFounded(), this.renderSort(), this.renderList(), this.renderPages(), this.renderLinkAddEdit(this.props.content), this.renderAfter()] }, void 0);
        };
        return List;
    }(BaseComponent_1.BaseComponent));
    exports.List = List;
});