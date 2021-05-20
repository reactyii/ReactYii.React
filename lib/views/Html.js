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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
//import { connect } from 'react-redux';
// https://www.npmjs.com/package/html-react-parser
var html_react_parser_1 = __importDefault(require("html-react-parser"));
var Content_1 = require("./Content");
var Html = /** @class */ (function (_super) {
    __extends(Html, _super);
    function Html() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Html.prototype.render = function () {
        var _this = this;
        var html = this.props.html;
        //let html = this.props.content.widget.template as string; // на null проверено снаружи
        //if (html.indexOf('<custom ') >= 0) throw new Error(Lang.get('CustomTemplateError') as string);
        var data = typeof this.props.data !== 'undefined' ? this.props.data : [];
        // ---------------------------------------------------------------------------------------------------------------------------
        // NB!!! использовать произвольный элемент типа <custom /> идея плохая так как если мы вставляем его в <table> то парсер вытащит его наружу таблицы!
        // и мы получим <custom /><table></table> вместо <table><custom /></table> (ну или если кастом это <tr> то <tr></tr><table></table> вместо <table><tr></tr></table>)
        // ---------------------------------------------------------------------------------------------------------------------------
        var htmls = {};
        if (typeof data !== 'undefined') {
            //const keys = Object.keys(data);
            for (var i = 0, l = data.length; i < l; i++) {
                if (!data[i].content_keys || data[i].content_keys === null)
                    continue;
                // 1 единица контента может быть использована несколько раз
                for (var j = 0, ll = data[i].content_keys.length; j < ll; j++) {
                    html = html.replace('{{' + data[i].content_keys[j] + '}}', '<custom name="' + data[i].content_keys[j] + '" />');
                    if (typeof htmls[data[i].content_keys[j]] === 'undefined')
                        htmls[data[i].content_keys[j]] = [];
                    htmls[data[i].content_keys[j]].push(data[i]);
                }
            }
        }
        html = html.replace(/{{[^}]+}}/g, '');
        //Console.log('..', html, htmls);
        /**/
        return html_react_parser_1.default(html, // this.props.html
        {
            replace: function (domNode) {
                if (typeof _this.props.data === 'undefined')
                    return;
                //Console.log('...', domNode.name);
                if (domNode.name === 'custom') { // протестировано. domNode.name всегда в нижнем регистре
                    var content = htmls[domNode.attribs.name]; // всегда должно существовать! см выше мы делаем замены
                    //Console.log('...', domNode.name, domNode.attribs.name);
                    return React.createElement(Content_1.Content, { content: content, pageWraper: _this.props.pageWraper, session: _this.props.session });
                    //return <tbody><tr><td>{domNode.attribs.name}</td></tr></tbody>;
                }
            }
        });
    };
    return Html;
}(React.Component));
exports.Html = Html;