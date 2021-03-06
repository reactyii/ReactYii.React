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
import { BaseRepository } from "./baseRepository";
import { Utils } from '../helpers/Utils';
var PageRepository = /** @class */ (function (_super) {
    __extends(PageRepository, _super);
    function PageRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //protected readonly abortAll: boolean = false;
        _this.enableCache = false;
        return _this;
    }
    PageRepository.prototype.getTestItem = function (key) {
        return {
            path: key, layout: '', content: [], seo: { title: 'loading...', description: '', keywords: '' }, lang: null, section: null, is_current_section: false, section_id: null, forms: {}
        };
    };
    PageRepository.prototype.getUrl = function (key, params) {
        var path = this.host + key;
        var p = Utils.joinUrlParams(params);
        if (p !== '') {
            path += (path.indexOf('?') >= 0 ? '&' : '?') + p; //'__siteLM=' + this.props.session.site.lastModified;
        }
        return path;
    };
    PageRepository.prototype.prepareItemForStore = function (key, item) {
        //let page = item.item; 
        //if (page === null) page = {key: key, layout: '', template: '', contents: []};
        //page.key = key;
        return {
            key: item.key,
            item: item.item,
            err: item.err,
            //request: null, // NB! очень важно тут null так как клонированный объект уходит в стор, а request мутирует!
            abortController: null,
            loaded: item.loaded
        };
    };
    return PageRepository;
}(BaseRepository));
export var pageRepository = new PageRepository();
