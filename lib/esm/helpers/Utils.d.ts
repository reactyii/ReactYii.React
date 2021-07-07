import * as React from 'react';
import { ContentType, Hash, iMenu, iSession, iSite } from '../models/commonModels';
import { iContent, iContentProps } from '../models/contentModels';
import { iPage } from '../models/pageModels';
export declare class Utils {
    static Templates: Hash<any>;
    static replaceSpaceToNbsp(str: string): string;
    static sleep(milliseconds: number): Promise<void>;
    static checkContentProps(props: iContentProps, requiredSettings?: string[]): string[];
    static genErrorContent(message: string[]): iContent[];
    static genContent(id?: string, content?: string, template_key?: string | null, path?: string, parent_id?: string, name?: string, priority?: number, content_keys?: string[], type?: ContentType | null, template?: string | null): iContent;
    static getFieldValue(forms: Hash<Hash<string | string[]>>, formkey: string, fieldName: string): string | string[];
    static makeFilterUrl(currentPage: iPage, newPage: iPage | iMenu, site: iSite, path: string, page: string, filterAndSort?: string): [string, string];
    static makeUrl(currentPage: iPage, newPage: iPage | iMenu, site: iSite, contentArgs?: string, gets?: Hash<string | string[]>): [string, string];
    static formatDate(date: string): string;
    static formatPhone(phone: string, title?: string | undefined): React.ReactNode;
    static Highlight(str: string, start?: string, end?: string, elName?: string): React.ReactNode;
    static clone<T>(obj: T): T;
    static isAuthorized(session: iSession | undefined): boolean;
    static formatBytes(a: number, b?: number): string;
    static getFromLocation(location: Location): Hash<string>;
    static mergeGets(url: string, gets: Hash<string | string[]>): string;
    static splitUrlParams(g: string): Hash<string | string[]>;
    static getFilterContentArgs(formkey: string, forms: Hash<Hash<string | string[]>>): string;
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
    static encodePercentsSymbol(contentArgs: string): string;
    /**
     * Собираем из хеша с данными гет строку
     * @param g - хэш с данными (ассоциативный массив)
     * @param clearEmpty - признак удалять ли пустые элементы
     * @param argReplacer - обработчик для значений (добавлен одля решения проблемы с одиночным '%' в path URI)
     */
    static joinUrlParams(g: Hash<string | string[]>, clearEmpty?: boolean, argReplacer?: (s: string) => string): string;
}
