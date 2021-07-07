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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { Console } from '../models/commonModels';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    // замена пробела на nbsp в строке
    Utils.replaceSpaceToNbsp = function (str) {
        return str.replace(' ', '\u00A0');
    };
    // исключительно для отладки
    Utils.sleep = function (milliseconds) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve();
                        }, milliseconds);
                    })];
            });
        });
    };
    Utils.checkContentProps = function (props, requiredSettings) {
        var _a, _b, _c;
        if (requiredSettings === void 0) { requiredSettings = []; }
        var res = [];
        //let error: string | undefined = undefined;
        if (typeof props.settings === 'undefined')
            res.push('Component settings not defined');
        requiredSettings.forEach(function (item) {
            if (typeof props.settings === 'undefined' || typeof props.settings[item] === 'undefined')
                res.push('Required setting "' + item + '" not exist');
        });
        if (typeof ((_a = props.pageWraper) === null || _a === void 0 ? void 0 : _a.item) === 'undefined' || ((_b = props.pageWraper) === null || _b === void 0 ? void 0 : _b.item) === null)
            res.push('Page data not loaded');
        if (typeof ((_c = props.session) === null || _c === void 0 ? void 0 : _c.site) === 'undefined')
            res.push('Site data not loaded');
        return res;
    };
    Utils.genErrorContent = function (message) {
        var res = [];
        for (var i = 0, l = message.length; i < l; i++) {
            res.push(this.genContent('error-' + i, message[i], 'Error'));
        }
        return res;
    };
    Utils.genContent = function (id, content, template_key, path, parent_id, name, priority, content_keys, type, template) {
        if (id === void 0) { id = ''; }
        if (content === void 0) { content = ''; }
        if (template_key === void 0) { template_key = null; }
        if (path === void 0) { path = ''; }
        if (parent_id === void 0) { parent_id = ''; }
        if (name === void 0) { name = ''; }
        if (priority === void 0) { priority = 50; }
        if (content_keys === void 0) { content_keys = []; }
        if (type === void 0) { type = null; }
        if (template === void 0) { template = null; }
        return { id: id, content: content, path: path, parent_id: parent_id, name: name, priority: priority, content_keys: content_keys, type: type, template: template, template_key: template_key };
    };
    Utils.getFieldValue = function (forms, formkey, fieldName) {
        if (typeof forms[formkey] === 'undefined')
            return '';
        if (typeof forms[formkey][fieldName] === 'undefined')
            return '';
        return forms[formkey][fieldName];
    }; /**/
    Utils.makeFilterUrl = function (currentPage, newPage, site, path, page, filterAndSort) {
        // если нет фильтров и первая страница то не указываем их
        // !я вот что подумал мы будем различать перую страницу списка /admin/contents.html
        // но в пагинаторе первой уже будет стоять /admin/contents/contentslist/0.html
        // что в принципе одно и то же, НО во втором случае мы уже можем не показывать SEO контент
        // и в любом случае если у нас задана страница то мы указываем каноникал на /admin/contents.html
        //if ((page === '0' || page === '') && !filterAndSort) return this.makeUrl(currentPage, newPage, site);
        if (filterAndSort === void 0) { filterAndSort = ''; }
        return this.makeUrl(currentPage, newPage, site, path + (page ? '/' + page : '') + (filterAndSort ? '/' + filterAndSort : ''));
    };
    Utils.makeUrl = function (currentPage, newPage, site, contentArgs, gets) {
        if (contentArgs === void 0) { contentArgs = ''; }
        if (gets === void 0) { gets = {}; }
        // с курент страницы берем язык
        var host = site.main_host;
        var url = '/' + (currentPage.lang && !currentPage.lang.is_default ? currentPage.lang.path + '/' : '');
        // раздел 
        var section = newPage.is_current_section && currentPage.section_id ?
            site.sections_hash['_' + currentPage.section_id] :
            (newPage.section_id ? site.sections_hash[newPage.section_id] : undefined);
        //Console.log('section:', newPage.section_id, section);
        if (typeof section !== 'undefined') {
            if (section.host !== null) { // раздел в поддоменах
                host = section.host;
            }
            else if (section.path) {
                url += section.path + '/';
            }
            else {
                Console.error('В разделе "' + section.name + '" не указан ни path ни host.');
                // по идее мы не сможем корректно сформирвоать урл, но пока продолжим работу
            }
        }
        // адрес страницы
        url += newPage.path; // даже если там index ибо нам надо обработать еще contentArgs
        if (contentArgs !== '') {
            url += '/' + contentArgs; // уже сформированный model/0 или model/itempath или model/0/filter_args
        }
        url += '.html';
        // думаю нужно ли убирать с конца index.html
        //url = (strrpos($path, '.html') === strlen($path) - 5 ? substr($path, 0, strlen($path) - 5) : $path)
        url = (url.indexOf('index.html') === url.length - 10 ? url.substring(0, url.length - 10) : url);
        url = Utils.mergeGets(url, gets);
        return [host, url]; // возвращаем не полный путь так как выше (в вызывающем компоненте) нам понадобится узнать у какой элемент лепить <a> или <Link> в зависимости от того совпадают домены или нет
    }; /**/
    // формат строки с бэкенда пока такой: 2018-03-30T00:00:00+03:00
    // на выход по дизайну 22/12/2017
    // в идеале для показа юзеру надо бы использовать настройки отображения дат из системы (что то типа https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
    // но в таком случае нам надо конвертить строку в дату и потом дату в строку (причем надо учесть не тока локаль системы но и выбранный юзером на сайте язык)
    Utils.formatDate = function (date) {
        if (!date)
            return '';
        var d = date.split('T', 1)[0];
        var _a = d.split('-', 3), y = _a[0], m = _a[1], day = _a[2];
        return day + '/' + m + '/' + y;
    };
    Utils.formatPhone = function (phone, title) {
        if (title === void 0) { title = undefined; }
        if (!phone)
            return null;
        return React.createElement('a', { href: 'tel:' + phone.replace(/[^+0-9]+/g, ''), title: title }, phone); // < a href = "tel:+77777777777" > +7 777 777 - 77 - 77 < /a>;
    };
    Utils.Highlight = function (str, start, end, elName) {
        if (start === void 0) { start = '['; }
        if (end === void 0) { end = ']'; }
        if (elName === void 0) { elName = 'b'; }
        var parts = str.split(start);
        return parts.map(function (i, index) {
            if (index === 0)
                return i;
            var parts1 = i.split(end);
            return [React.createElement(elName, { key: index }, parts1[0]), parts1.length > 1 ? parts1[1] : null];
        });
    };
    // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
    Utils.clone = function (obj) {
        var copy;
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj)
            return obj;
        // Handle Date
        if (obj instanceof Date) {
            var _copy = new Date();
            _copy.setTime(obj.getTime());
            return _copy;
        }
        // Handle Array
        if (obj instanceof Array) {
            var _copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                _copy[i] = Utils.clone(obj[i]);
            }
            return _copy;
        }
        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr))
                    copy[attr] = Utils.clone(obj[attr]);
            }
            return copy;
        }
        throw new Error("Unable to copy obj! Its type isn't supported.");
    };
    Utils.isAuthorized = function (session) {
        if (typeof session === 'undefined')
            return false; // по идее в этот момент мы еще не знаем атворизован юзер или нет
        return (typeof session.user !== 'undefined');
    };
    Utils.formatBytes = function (a, b) {
        if (b === void 0) { b = 2; }
        if (0 === a)
            return "0 Bytes";
        var c = 1024, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(b)) + " " + e[f];
    };
    Utils.getFromLocation = function (location) {
        var l = {};
        var g = location.search; //window.location.search;
        if (g) {
            g = g.substr(1);
            l = Utils.splitUrlParams(g);
        }
        return l;
    };
    ;
    Utils.mergeGets = function (url, gets) {
        var tmp = url.split('?', 2);
        if (tmp.length === 1) {
            var g = Utils.joinUrlParams(gets);
            if (g)
                tmp.push(g);
        }
        else {
            tmp[1] = Utils.joinUrlParams(__assign(__assign({}, Utils.splitUrlParams(tmp[1])), gets));
        }
        return tmp.join('?');
    };
    Utils.splitUrlParams = function (g) {
        //Console.log('//////////////////////////////////');
        var l = {};
        var k = g.split("&");
        for (var h = 0, len = k.length; h < len; h++) {
            if (!k[h] || k[h].indexOf('=') < 0)
                continue; // ?&&& | ?&sdf&qw
            var e = k[h].split("=");
            var f = e[0];
            if (!f)
                continue; // ?..&=
            f = decodeURIComponent(f.replace('+', " "));
            var m = e[1];
            m = decodeURIComponent(m.replace('+', " "));
            if (typeof l[f] !== 'undefined') { // такой элемент уже есть! преобразуем в массив если там была строка и добавим значение
                if (!Array.isArray(l[f]))
                    l[f] = [l[f]];
                l[f].push(m);
            }
            else {
                l[f] = m;
            }
        }
        return l;
    };
    Utils.getFilterContentArgs = function (formkey, forms) {
        if (typeof forms[formkey] === 'undefined')
            return '';
        return this.joinUrlParams(forms[formkey], true, this.encodePercentsSymbol); //.replace('&', encodeURIComponent('&'));
    };
    /**
     * Подготовка аргументов фильтра списка для вставки в path (contentArgs на бэкенде)
     * очень большая проблема передать одиночный символ '%' в пути (в get проблем нет, также нет проблем и в %20 и кодировке русских букв в коды)
     * При пост обработке конечной строки у нас отваливается русское SEO. Значит мы должны заменять '%' до encodeURIComponent и тока в значениях
     * Было великое желание завернуть все в base64, но SEO нам тоже нужно
     *
     * 1. args.push(encodeURIComponent(i) + '=' + encodeURIComponent(encodePercentsSymbol(g[i] as string)))
     * 2. contentArgs = args.join(&)
     *
     * вынесено в encodePercentsSymbol() в первый шаг то есть
     * 3. contentArgs = contentArgs.replace('~', '~7E').replace('%', '~25')
     *
     * @param contentArgs
     */
    Utils.encodePercentsSymbol = function (contentArgs) {
        // ~ код 126 (7E)
        // % код 37 (25)
        var res = contentArgs.split('~').join('~7E');
        return res.split('%').join('~25');
        /**/
        /*return contentArgs
            .replace('~', '~7E') // чтоб была возможность передать сам символ '~'
            .replace('%', '~25');// пока будем кодировать тока символ '%' возможно понадобятся и другие
            */
    };
    /**
     * Собираем из хеша с данными гет строку
     * @param g - хэш с данными (ассоциативный массив)
     * @param clearEmpty - признак удалять ли пустые элементы
     * @param argReplacer - обработчик для значений (добавлен одля решения проблемы с одиночным '%' в path URI)
     */
    Utils.joinUrlParams = function (g, clearEmpty, argReplacer) {
        if (clearEmpty === void 0) { clearEmpty = false; }
        if (argReplacer === void 0) { argReplacer = function (arg) { return arg; }; }
        var l = [];
        var _loop_1 = function (i) {
            //Console.log('...', i, typeof g[i])
            if (typeof g[i] === 'undefined')
                return "continue";
            if (typeof g[i] === 'string') {
                // в теории! в таком случае не надо проверять hasOwnProperty (see sample in https://www.typescriptlang.org/docs/handbook/modules.html)
                //if (g.hasOwnProperty(i)) {
                if (clearEmpty && g[i] === '')
                    return "continue";
                //Console.log('->', i, g[i]);
                l.push(encodeURIComponent(i) + '=' + encodeURIComponent(argReplacer(g[i])));
                //}
            }
            else {
                // массив
                // здесь игнорим clearEmpty так как передается массив и еcли пошлем a[]= то массив будет не пустой (короче для массивов clearEmpty всегда true)
                if (g[i].length === 0)
                    return "continue";
                //console.log('...', i, (g[i] as string[]).map((item) => encodeURIComponent(i) + '[]=' + encodeURIComponent(item)));
                l.push.apply(l, g[i].map(function (item) { return encodeURIComponent(i) + '[]=' + encodeURIComponent(argReplacer(item)); }));
            }
        };
        for (var i in g) {
            _loop_1(i);
        }
        return l.join('&');
    };
    ;
    Utils.Templates = {};
    return Utils;
}());
export { Utils };
