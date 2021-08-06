import * as React from 'react';
import { Console, ContentType, Hash, iMenu, iSession, iSite } from '../models/commonModels';
import { iContent, iContentProps } from '../models/contentModels';
import { iPage } from '../models/pageModels';

export class Utils {
    static Templates: Hash<any> = {};

     // замена пробела на nbsp в строке
    static replaceSpaceToNbsp(str: string) {
        return str.replace(' ', '\u00A0');
    }

    // исключительно для отладки
    static async sleep(milliseconds: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }

    static checkContentProps(props: iContentProps, requiredSettings: string[] = []): string[] {
        const res = [];
        //let error: string | undefined = undefined;
        if (typeof props.settings === 'undefined') res.push('Component settings not defined');

        requiredSettings.forEach(item => {
            if (typeof props.settings === 'undefined' || typeof props.settings[item] === 'undefined') res.push('Required setting "' + item + '" not exist');
        });

        if (typeof props.pageWraper?.item === 'undefined' || props.pageWraper?.item === null) res.push('Page data not loaded');
        if (typeof props.session?.site === 'undefined') res.push('Site data not loaded');
        return res;
    }

    static genErrorContent(message: string[]): iContent[] {
        const res = [];
        for (let i = 0, l = message.length; i < l; i++) {
            res.push(this.genContent('error-' + i, message[i], 'Error'));
        }
        return res;
    }

    static genContent(id = '', content = '', template_key: string | null = null, path = '', parent_id = '', name = '', priority = 50, content_keys: string[] = [], type: ContentType | null = null, template: string | null = null): iContent {
        return { id, content, path, parent_id, name, priority, content_keys, type, template, template_key }
    }
    static getFieldValue(forms: Hash<Hash<string | string[]>>, formkey: string, fieldName: string): string | string[] {
        if (typeof forms[formkey] === 'undefined') return '';
        if (typeof forms[formkey][fieldName] === 'undefined') return '';
        return forms[formkey][fieldName];
    }/**/
    static makeFilterUrl(currentPage: iPage, newPage: iPage | iMenu, site: iSite, path: string, page: string, filterAndSort: string = ''): [string, string] {
        // если нет фильтров и первая страница то не указываем их
        // !я вот что подумал мы будем различать перую страницу списка /admin/contents.html
        // но в пагинаторе первой уже будет стоять /admin/contents/contentslist/0.html
        // что в принципе одно и то же, НО во втором случае мы уже можем не показывать SEO контент
        // и в любом случае если у нас задана страница то мы указываем каноникал на /admin/contents.html
        //if ((page === '0' || page === '') && !filterAndSort) return this.makeUrl(currentPage, newPage, site);

        return this.makeUrl(currentPage, newPage, site, path + (page ? '/' + page : '') + (filterAndSort ? '/' + filterAndSort : ''));
    }

    static makeUrl(currentPage: iPage, newPage: iPage | iMenu, site: iSite, contentArgs: string = '', gets: Hash<string | string[]> = {}): [string, string] {
        // с курент страницы берем язык
        let host = site.main_host;
        let url = '/' + (currentPage.lang && !currentPage.lang.is_default ? currentPage.lang.path + '/' : '');

        // раздел 
        const section = newPage.is_current_section && currentPage.section_id ?
            site.sections_hash['_' + currentPage.section_id] :
            (newPage.section_id ? site.sections_hash['_' + newPage.section_id] : undefined);

        //Console.log('section:', newPage.section_id, section);

        if (typeof section !== 'undefined') {
            if (section.host !== null) { // раздел в поддоменах
                host = section.host;
            } else if (section.path) {
                url += section.path + '/';
            } else  {
                Console.error('В разделе "' + section.name + '" не указан ни path ни host.');
                // по идее мы не сможем корректно сформирвоать урл, но пока продолжим работу
            }
        }

        // адрес страницы
        url += newPage.path;// даже если там index ибо нам надо обработать еще contentArgs

        if (contentArgs !== '') {
            url += '/' + contentArgs; // уже сформированный model/0 или model/itempath или model/0/filter_args
        }

        url += '.html';

        // думаю нужно ли убирать с конца index.html
        //url = (strrpos($path, '.html') === strlen($path) - 5 ? substr($path, 0, strlen($path) - 5) : $path)
        url = (url.indexOf('index.html') === url.length - 10 ? url.substring(0, url.length - 10) : url);

        url = Utils.mergeGets(url, gets);

        return [host, url]; // возвращаем не полный путь так как выше (в вызывающем компоненте) нам понадобится узнать у какой элемент лепить <a> или <Link> в зависимости от того совпадают домены или нет
    }/**/

    // формат строки с бэкенда пока такой: 2018-03-30T00:00:00+03:00
    // на выход по дизайну 22/12/2017
    // в идеале для показа юзеру надо бы использовать настройки отображения дат из системы (что то типа https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString)
    // но в таком случае нам надо конвертить строку в дату и потом дату в строку (причем надо учесть не тока локаль системы но и выбранный юзером на сайте язык)
    static formatDate(date: string): string {
        if (!date) return '';
        const [d] = date.split('T', 1);
        const [y, m, day] = d.split('-', 3);

        return day + '/' + m + '/' + y;
    }

    static formatPhone(phone: string, title: string | undefined = undefined): React.ReactNode {
        if (!phone) return null;
        return React.createElement('a', { href: 'tel:' + phone.replace(/[^+0-9]+/g, ''), title: title }, phone);// < a href = "tel:+77777777777" > +7 777 777 - 77 - 77 < /a>;
    }

    static Highlight(str: string, start: string = '[', end: string = ']', elName: string = 'b'): React.ReactNode {

        let parts = str.split(start);
        return parts.map((i, index) => {
            if (index === 0) return i;
            let parts1 = i.split(end);

            return [React.createElement(elName, { key: index }, parts1[0]), parts1.length > 1 ? parts1[1] : null];
        })
    }

    // https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object
    static clone<T>(obj: T): T {
        let copy: T;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            const _copy = new Date();
            _copy.setTime(obj.getTime());
            return _copy as any;
        }

        // Handle Array
        if (obj instanceof Array) {
            const _copy = [];
            for (let i = 0, len = obj.length; i < len; i++) {
                _copy[i] = Utils.clone(obj[i]);
            }
            return _copy as any;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {} as any;
            for (let attr in obj) {
                if ((obj as Object).hasOwnProperty(attr)) copy[attr] = Utils.clone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    static isAuthorized(session: iSession | undefined): boolean {
        if (typeof session === 'undefined') return false; // по идее в этот момент мы еще не знаем атворизован юзер или нет
        return (typeof session.user !== 'undefined');
    }

    static formatBytes(a: number, b: number = 2): string {
        if (0 === a) return "0 Bytes";
        let c = 1024, e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], f = Math.floor(Math.log(a) / Math.log(c));
        return parseFloat((a / Math.pow(c, f)).toFixed(b)) + " " + e[f];
    }

    static getFromLocation(location: Location): Hash<string> {
        let l: any = {};
        let g = location.search;//window.location.search;
        if (g) {
            g = g.substr(1);
            l = Utils.splitUrlParams(g);
        }
        return l;
    };

    static mergeGets(url: string, gets: Hash<string | string[]>): string {
        const tmp: string[] = url.split('?', 2);
        if (tmp.length === 1) {
            const g = Utils.joinUrlParams(gets);
            if (g) tmp.push(g);
        } else {
            tmp[1] = Utils.joinUrlParams({ ...Utils.splitUrlParams(tmp[1]), ...gets });
        }

        return tmp.join('?');
    }

    static splitUrlParams(g: string): Hash<string | string[]> {
        //Console.log('//////////////////////////////////');
        let l: Hash<string | string[]> = {};
        let k = g.split("&");
        for (let h = 0, len = k.length; h < len; h++) {
            if (!k[h] || k[h].indexOf('=') < 0) continue; // ?&&& | ?&sdf&qw

            let e = k[h].split("=");
            let f = e[0];
            if (!f) continue; // ?..&=

            f = decodeURIComponent(f.replace('+', " "));
            let m = e[1];
            m = decodeURIComponent(m.replace('+', " "));
            if (typeof l[f] !== 'undefined') { // такой элемент уже есть! преобразуем в массив если там была строка и добавим значение
                if (!Array.isArray(l[f])) l[f] = [l[f] as string];
                (l[f] as string[]).push(m);
            } else {
                l[f] = m;
            }
        }
        return l;
    }

    static getFilterContentArgs(formkey: string, forms: Hash<Hash<string | string[]>>): string {
        if (typeof forms[formkey] === 'undefined') return '';
        return this.joinUrlParams(forms[formkey], true, this.encodePercentsSymbol);//.replace('&', encodeURIComponent('&'));
    }

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
    static encodePercentsSymbol(contentArgs: string): string{
        // ~ код 126 (7E)
        // % код 37 (25)
        let res = contentArgs.split('~').join('~7E');
        return res.split('%').join('~25');
        /**/
        /*return contentArgs
            .replace('~', '~7E') // чтоб была возможность передать сам символ '~'
            .replace('%', '~25');// пока будем кодировать тока символ '%' возможно понадобятся и другие
            */
    }
    /**
     * Собираем из хеша с данными гет строку
     * @param g - хэш с данными (ассоциативный массив)
     * @param clearEmpty - признак удалять ли пустые элементы
     * @param argReplacer - обработчик для значений (добавлен одля решения проблемы с одиночным '%' в path URI)
     */
    static joinUrlParams(g: Hash<string | string[]>, clearEmpty: boolean = false, argReplacer: (s: string) => string = (arg) => arg): string {
        let l: string[] = [];
        for (let i in g) {
            //Console.log('...', i, typeof g[i])

            if (typeof g[i] === 'undefined') continue;
            if (typeof g[i] === 'string') {
                // в теории! в таком случае не надо проверять hasOwnProperty (see sample in https://www.typescriptlang.org/docs/handbook/modules.html)
                //if (g.hasOwnProperty(i)) {
                if (clearEmpty && g[i] === '') continue;

                //Console.log('->', i, g[i]);
                l.push(encodeURIComponent(i) + '=' + encodeURIComponent(argReplacer(g[i] as string)));
                //}
            } else {
                // массив

                // здесь игнорим clearEmpty так как передается массив и еcли пошлем a[]= то массив будет не пустой (короче для массивов clearEmpty всегда true)
                if ((g[i] as string[]).length === 0) continue;

                //console.log('...', i, (g[i] as string[]).map((item) => encodeURIComponent(i) + '[]=' + encodeURIComponent(item)));
                l.push.apply(l, (g[i] as string[]).map((item) => encodeURIComponent(i) + '[]=' + encodeURIComponent(argReplacer(item))));
            }
        }
        return l.join('&');
    };


}