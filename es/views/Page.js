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
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
//import { Layouts } from './layouts';
import { Templates } from './templates';
//import { Content } from './Content';
//import { iContent } from '../models/contentModels';
var Page = /** @class */ (function (_super) {
    __extends(Page, _super);
    function Page() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /*constructor(props: iPageProps) {
        super(props);
        this.state = {path: props.newPath};
    }/* */
    // дадим возможность переопределить в шаблонах
    Page.prototype.renderSEO = function () {
        var _a, _b;
        return _jsx(HelmetProvider, { children: _jsx(Helmet, { title: (_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.seo.title }, void 0) }, "seo");
    };
    Page.prototype.renderLayout = function (layout) {
        var _a, _b, _c, _d, _e, _f;
        //Console.log('-->', layout, (typeof Layouts[layout] !== 'undefined' ? Layouts[layout] : Layouts.Layout));
        //Console.log('-->', this.props.session);
        return React.createElement(typeof Templates[layout] !== 'undefined' ? Templates[layout] : Templates.Layout, {
            content: ((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.content) && typeof ((_d = (_c = this.props.pageWraper) === null || _c === void 0 ? void 0 : _c.item) === null || _d === void 0 ? void 0 : _d.content) !== 'undefined' ? (_f = (_e = this.props.pageWraper) === null || _e === void 0 ? void 0 : _e.item) === null || _f === void 0 ? void 0 : _f.content : [],
            settings: null,
            pageWraper: this.props.pageWraper,
            session: this.props.session,
            key: 'layout'
        }, null //<Html key={item.id} html={item.content} />
        );
    };
    Page.prototype.render = function () {
        /*let mainhost = 'reactyii.test:3000'; // взять с process.env.REACT_APP_HOST
        let content = (
            <div>
                {this.renderSEO()}
                <h1>Привет, мир! {this.props.pageWraper?.key}</h1>
                {
                    (this.props.loadingPath !== '' ? <div>loading... {this.props.loadingPath}</div> : '')
                }
                {
                    this.props.pageWraper?.err ? <div>{this.props.pageWraper?.err}</div> : ''
                }
                <Link to="/">Home</Link><br />
                <Link to="/about.html">About</Link><br />
                <Link to="/contacts.html">Contacts</Link><br />
                <Link to="/news.html">News</Link><br />
                <br />
                <Link to={'//subdomain.' + mainhost + '/'}>Home subdomain</Link><br />
                <Link to={'//subdomain.' + mainhost + '/about.html'}>About subdomain</Link><br />
                <br />
                <Link to="/ru/part-of-path/">Home path section</Link><br />
                <Link to="/ru/part-of-path/articles.html">Articles</Link><br />
                <br />
                <Link to="/404.html">404</Link>
            </div>
        );

        let c: iContent[] = [];*/
        var _a, _b, _c, _d;
        return [
            this.renderSEO(),
            this.renderLayout(((_b = (_a = this.props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === null || _b === void 0 ? void 0 : _b.layout) ? (_d = (_c = this.props.pageWraper) === null || _c === void 0 ? void 0 : _c.item) === null || _d === void 0 ? void 0 : _d.layout : 'Layout')
        ];
    };
    return Page;
}(React.Component));
export { Page };