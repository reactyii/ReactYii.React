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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "react/jsx-runtime", "react", "html-react-parser", "./Content"], function (require, exports, jsx_runtime_1, React, html_react_parser_1, Content_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Html = void 0;
    React = __importStar(React);
    html_react_parser_1 = __importDefault(html_react_parser_1);
    var Html = /** @class */ (function (_super) {
        __extends(Html, _super);
        function Html() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Html.prototype.render = function () {
            var _this = this;
            var html = this.props.html;
            //Console.log('Html render', html);
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
                        return jsx_runtime_1.jsx(Content_1.Content, { content: content, pageWraper: _this.props.pageWraper, session: _this.props.session }, void 0);
                        //return <tbody><tr><td>{domNode.attribs.name}</td></tr></tbody>;
                    }
                }
            });
        };
        return Html;
    }(React.Component));
    exports.Html = Html;
});