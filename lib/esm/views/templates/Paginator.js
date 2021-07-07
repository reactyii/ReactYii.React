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
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { Link } from 'react-router-dom';
var Paginator = /** @class */ (function (_super) {
    __extends(Paginator, _super);
    function Paginator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paginator.prototype.renderFirstLink = function (url) {
        return _jsx(Link, __assign({ to: url }, { children: "First" }), "first");
    };
    Paginator.prototype.renderLastLink = function (url, ind) {
        return _jsx(Link, __assign({ to: url }, { children: "Last" }), "last");
    };
    Paginator.prototype.renderPrevLink = function (url, ind) {
        return _jsx(Link, __assign({ to: url }, { children: "Prev" }), "prev");
    };
    Paginator.prototype.renderPage = function (url, ind) {
        return _jsx(Link, __assign({ to: url }, { children: ind }), ind);
    };
    Paginator.prototype.renderCurrent = function (ind) {
        return _jsx("span", { children: ind }, "current");
    };
    Paginator.prototype.renderNextLink = function (url, ind) {
        return _jsx(Link, __assign({ to: url }, { children: "Next" }), "next");
    };
    Paginator.prototype.url = function (settings, page) {
        if (page === 0) {
            return typeof settings['first_url'] !== 'undefined' ? settings['first_url'] : settings['base_url'].replace('{{PAGE}}', '0');
        }
        return settings['base_url'].replace('{{PAGE}}', '' + page);
    };
    Paginator.prototype.renderPages = function (pages) {
        // для тестового примера мы просто рендерим всем линки как есть, но в переопределенных вариантах может понадодобится что-то вставить между ними
        return _jsx("div", { children: Object.values(pages) }, void 0);
    };
    Paginator.prototype.preparePages = function () {
        //Console.log('pages settings:', this.props.settings);
        if (typeof this.props.settings === 'undefined')
            return {};
        var s = this.props.settings;
        var per_page = +s['per_page']; // Max number of items you want shown per page
        var total_rows = +s['total_rows']; // Total number of items (database results)
        if (per_page === 0 || total_rows === 0)
            return {}; // If our item count or per-page total is zero there is no need to continue.
        var cur_page = +s['cur_page']; // The current page being viewed
        var num_links = typeof s['num_links'] !== 'undefined' ? +s['num_links'] : 2; // Number of "digit" links to show before/after the currently viewed page
        var num_pages = Math.ceil(total_rows / per_page);
        if (num_pages === 1)
            return {}; // Is there only one page? Hm... nothing more to do here then.
        //Console.log('==num_pages=', num_pages);
        // Calculate the start and end numbers. These determine
        // which number to start and end the digit links with
        var start = ((cur_page + 1 - num_links) > 0) ? cur_page + 1 - (num_links) : 0;
        var end = (((cur_page + num_links) < num_pages) ? cur_page + num_links : num_pages);
        //const base_url = s['base_url'];  // The page we are linking to
        var res = { 'first': this.renderFirstLink(this.url(s, 0)) };
        //Console.log('hhhhhhhhhhhh1', cur_page, num_links);
        if (cur_page !== 0) {
            res['prev'] = this.renderPrevLink(this.url(s, cur_page - 1), cur_page);
        }
        var pages = [];
        for (var loop = start; loop < end; loop++) {
            if (cur_page === loop) {
                pages.push(this.renderCurrent(loop + 1));
            }
            else {
                pages.push(this.renderPage(this.url(s, loop), loop + 1));
            }
        }
        res['pages'] = pages;
        if (cur_page < num_pages - 1) {
            res['next'] = this.renderNextLink(this.url(s, cur_page + 1), cur_page + 2);
        }
        res['last'] = this.renderLastLink(this.url(s, num_pages - 1), num_pages);
        return res;
    };
    Paginator.prototype.render = function () {
        return this.renderPages(this.preparePages());
    };
    return Paginator;
}(React.Component));
export { Paginator };
