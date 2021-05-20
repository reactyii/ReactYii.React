"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Utils_1 = require("../helpers/Utils");
var commonModels_1 = require("../models/commonModels");
var Html_1 = require("./Html");
//import { Templates } from './templates';
var Content = /** @class */ (function (_super) {
    __extends(Content, _super);
    function Content() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // если у ноды есть childs то возвращаем их, если нет, то создаем ноду из item.content
    // короче childs переопределяет item.content
    Content.prototype._prepareChilds = function (item) {
        //const _content = typeof item.childs !== 'undefined' && item.childs.length > 0 ? item.childs?.filter(item => typeof item.content_keys === 'undefined' || item.content_keys?.indexOf('CONTENT') >= 0) : [];
        // здесь передаем всех child! на надо выбирать только 'CONTENT'
        return typeof item.childs !== 'undefined' && item.childs.length > 0
            ? item.childs
            : [{ id: item.id, name: '', content: item.content, priority: 100, content_keys: ['CONTENT'], parent_id: null, path: '', type: null, template: null, template_key: null }];
    };
    Content.prototype.render = function () {
        var _this = this;
        return this.props.content.map(function (item) {
            //Console.log('-->', item.type, item.template_key, item.template, item);
            // контент с шаблоном из БД
            if (item.template) {
                //Console.log('==>', item);
                // для простоты (чтобы не делать еще один уровень в дереве) если у ноды нет потомков и есть и шаблон и контент то контент перенесем в потомки
                return React.createElement(Html_1.Html, { key: item.id, html: item.template, data: _this._prepareChilds(item), pageWraper: _this.props.pageWraper, session: _this.props.session });
            }
            // контент с шаблоном - компонентом реакта
            if (item.template_key) {
                //Console.log('::>', item.template, item.template_key);
                var tkeys = item.template_key.indexOf(',') >= 0 ? item.template_key.split(',') : [item.template_key];
                for (var i = 0, l = tkeys.length; i < l; i++) {
                    var template_key = tkeys[i];
                    if (typeof Utils_1.Utils.Templates[template_key] !== 'undefined') {
                        // в качестве вложения (this.props.children) передаем сгенеренный item.content, а потомков элемента передаем в пропсах
                        // !!!! а может не стоит предавать this.props.children (см ниже "контент потомки") чтобы например переопределить язык
                        // не будем предавать ничего через this.props.children
                        return React.createElement(Utils_1.Utils.Templates[template_key], 
                        // в пропсах прокидываем чилдсов и настройки
                        {
                            content: _this._prepareChilds(item), settings: item.settings, key: item.id,
                            pageWraper: _this.props.pageWraper, session: _this.props.session
                        }, null //<Html key={item.id} html={item.content} />
                        );
                    }
                }
                // не нашли ни одного шаблона с таким именем
                commonModels_1.Console.error('Template component "' + item.template_key + '" not founded!');
                return null;
            }
            // контент потомки
            if (typeof item.childs !== 'undefined') {
                // есть внутренние узлы, НО шаблона нет! значит показываем строго 'CONTENT' узлы
                var _childs = item.childs.filter(function (item) { var _a; return typeof item.content_keys === 'undefined' || ((_a = item.content_keys) === null || _a === void 0 ? void 0 : _a.indexOf('CONTENT')) >= 0; });
                if (_childs.length > 0) {
                    // вот думаю если есть item.content, то надо его передать или нет?
                    // НЕ НАДО! так как у нас идет преопределение, например, языка или инфы для раздела
                    return React.createElement(Content, { key: item.id, content: _childs, pageWraper: _this.props.pageWraper, session: _this.props.session });
                }
            }
            // примитивы 
            // здесь контент как html
            // но https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml мы тут заюзать не сможем, так как вот так не прокатывает < dangerouslySetInnerHTML={{ __html: item.content}}></>
            if (item.type === null)
                return React.createElement(Html_1.Html, { key: item.id, html: item.content }); // <span key={item.id} dangerouslySetInnerHTML={{ __html: item.content}}></span>;
            // хм а вот такого наверное не будет так как list у нас всегда с шаблоном (причем сложным) идет (фильтры, пагинатор, сами элементы списка)
            if (item.type === commonModels_1.ContentType.List) {
            }
            // допилить другие примитивы ...
            // ...
            if (item.type === commonModels_1.ContentType.Html) {
                // вот не знаю. пока data передам пустое, но думаю что можно и this._prepareChilds(item)
                return React.createElement(Html_1.Html, { key: item.id, html: item.content, data: [], pageWraper: _this.props.pageWraper, session: _this.props.session });
            }
            return item.content; //if (item.type === ContentType.String)
        });
    };
    return Content;
}(React.Component));
exports.Content = Content;