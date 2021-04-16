import * as React from 'react';
import { Console, Hash, iMenu, iSession, iSite } from '../models/commonModels';
import { iPage } from '../models/pageModels';

export class Utils {

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

    // доработать
    static makeUrl(currentPage: iPage, newPage: iPage | iMenu, site: iSite, contentArgs: string = '', gets: Hash<string | string[]> = {}): [string, string] {
        // с курент страницы берем язык
        let host = site.main_host;
        let url = '/' + (currentPage.lang && !currentPage.lang.is_default ? currentPage.lang.path + '/' : '');

        // раздел 
        const section = newPage.is_current_section && currentPage.section_id ?
            site.sections_hash['_' + currentPage.section_id] :
            (newPage.section_id ? site.sections_hash[newPage.section_id] : undefined);

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

        url = Utils.merge_gets(url, gets);

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

    static get_from_location(location: Location): Hash<string> {
        let l: any = {};
        let g = location.search;//window.location.search;
        if (g) {
            g = g.substr(1);
            l = Utils.split_url_params(g);
        }
        return l;
    };

    static merge_gets(url: string, gets: Hash<string | string[]>): string {
        const tmp: string[] = url.split('?', 2);
        if (tmp.length === 1) {
            const g = Utils.join_url_params(gets);
            if (g) tmp.push(g);
        } else {
            tmp[1] = Utils.join_url_params({ ...Utils.split_url_params(tmp[1]), ...gets });
        }

        return tmp.join('?');
    }

    static split_url_params(g: string): Hash<string | string[]> {
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

    static join_url_params(g: Hash<string | string[]>, clearEmpty: boolean = false): string {
        let l: string[] = [];
        for (let i in g) {
            //Console.log('...', i, typeof g[i])

            if (typeof g[i] === 'undefined') continue;
            if (typeof g[i] === 'string') {
                // в теории! в таком случае не надо проверять hasOwnProperty (see sample in https://www.typescriptlang.org/docs/handbook/modules.html)
                //if (g.hasOwnProperty(i)) {
                if (clearEmpty && g[i] === '') continue;

                //Console.log('->', i, g[i]);
                l.push(encodeURIComponent(i) + '=' + encodeURIComponent(g[i] as string));
                //}
            } else {
                // массив

                // здесь игнорим clearEmpty так как передается массив и еcли пошлем a[]= то массив будет не пустой (короче для массивов clearEmpty всегда true)
                if ((g[i] as string[]).length === 0) continue;

                //console.log('...', i, (g[i] as string[]).map((item) => encodeURIComponent(i) + '[]=' + encodeURIComponent(item)));
                l.push.apply(l, (g[i] as string[]).map((item) => encodeURIComponent(i) + '[]=' + encodeURIComponent(item)));
            }
        }
        return l.join('&');
    };


}