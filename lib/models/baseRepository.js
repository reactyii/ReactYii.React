"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as request from 'superagent'; // годные доки https://visionmedia.github.io/superagent/
require("isomorphic-fetch"); // https://www.digitalocean.com/community/tutorials/js-fetch-api
var Utils_1 = require("../helpers/Utils");
var commonModels_1 = require("./commonModels");
var prepareHost = function (host) {
    if (typeof host === 'undefined') {
        commonModels_1.Console.error('".env" file required. please, rename ".env.inc" to ".env" and set vars.');
        return '';
    }
    var h = host.trim();
    var l = h.length;
    //Console.log('!!', h.substring(l - 1, l), h.substring(0, l - 1));
    return h.substring(l - 1, l) === '/' ? h.substring(0, l - 1) : h; // || 'http://yii.test';
};
var BaseRepository = /** @class */ (function () {
    function BaseRepository() {
        this.host = prepareHost(process.env.REACT_APP_HOST);
        this.enableCache = true;
        this.abortAll = true; // если true то отменяем все другие запросы
        this.data = {};
        this.abortController = null;
    }
    BaseRepository.prototype.get = function (key, get, end) {
        //Console.log('this.enableCache=', this.enableCache);
        if (this.enableCache && typeof this.data[key] !== 'undefined' && this.data[key].item !== null) {
            commonModels_1.Console.log('get from cache', this.data[key]);
            // также здесь можно проверить срок жизни итема в кеше
            //return this.data[id].item;
            return end(this.prepareItemForStore(key, this.data[key]));
        }
        this.load(key, get, end);
    };
    BaseRepository.prototype.post = function (key, get, post, end) {
        this.load(key, get, end, 'POST', post);
    };
    BaseRepository.prototype.load = function (key, get, end, method, post) {
        var _this = this;
        if (method === void 0) { method = 'GET'; }
        if (post === void 0) { post = {}; }
        var _a, _b;
        if (typeof this.data[key] === 'undefined') {
            this.data[key] = { key: key, item: null, err: null, abortController: null /*, request: null*/ };
        }
        commonModels_1.Console.log('load from ', this.host, this.data[key]);
        this.data[key].err = null; // скинем ошибку если была
        if (method === 'GET') { // глушим только гет запросы!
            try { // тупо давим все ошибки если не вышло отменить и пес с ним
                commonModels_1.Console.log('try cancel ', key);
                (_a = this.abortController) === null || _a === void 0 ? void 0 : _a.abort();
                (_b = this.data[key].abortController) === null || _b === void 0 ? void 0 : _b.abort();
            }
            catch (error) {
                commonModels_1.Console.error('Ошибка при отмене запроса:', error);
            }
        }
        // https://learn.javascript.ru/fetch-abort
        var options = {
            method: method,
            signal: this.abortAll ? (this.abortController = new AbortController()).signal : (this.data[key].abortController = new AbortController()).signal,
            //body: post ? Utils.joinUrlParams(post) : undefined,//JSON.stringify(myPost),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        };
        if (Object.keys(post).length > 0) {
            options['body'] = Utils_1.Utils.joinUrlParams(post);
        }
        fetch(this.getUrl(key, get), options).then(function (res) {
            //Console.log('data loaded1', res);
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        }).then(function (response) {
            //Console.log('data loaded', response);
            /*let status = typeof response !== 'undefined' ? response.status : 500;
            if (status !== 200) {
                this.data[key].err = 'error code: ' + status;
                return end(this.prepareItemForStore(key, this.data[key]));
            }*/
            _this.data[key].loaded = Date.now(); //new Date();
            _this.data[key].item = response; //.body;
            return end(_this.prepareItemForStore(key, _this.data[key]));
        }).catch(function (err) {
            commonModels_1.Console.error('load data error', JSON.stringify(err.name));
            if (err.name === 'AbortError') {
                return; // ничего не делаем. если вызовем end() то скинем loadingPath и мы откинем нужный результат при его получении
            }
            if (err.timeout) {
                _this.data[key].err = 'error timeout';
            }
            else {
                _this.data[key].err = 'other error:' + err.status;
            }
            return end(_this.prepareItemForStore(key, _this.data[key]));
        }).finally(function () {
            //this.data[key].request = null;
            _this.data[key].abortController = null;
            _this.abortController = null;
        });
        // отладка отмены
        //setTimeout(() => this.data[key].abortController?.abort(), 1000);
        // блок тестирования
        /*setTimeout(() => {
            //this.data[key].request = null;
            this.data[key].abortController = null;
            this.data[key].loaded = Date.now(); //new Date();
            this.data[key].item = this.getTestItem(key);

            return end(this.prepareItemForStore(key, this.data[key]));
        }, 1000);/* */
        return null;
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;