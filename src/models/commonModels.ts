export interface Hash<T> { [s: string]: T; }
export enum ContentType {
    // это не используем так как это по умолчанию и в котенте (шаблоне) стоит null
    //Text = "TEXT",
    Link = "link",
    LinkAdd = "linkadd",
    LinkEdit = "linkedit",
    String = "string",
    Html = "html",
    Number = "number",
    List = "list",
    Tree = "tree",
    Img = "img",
    Form = "form",
}
export interface iUser {
    id: number;
    name: string | null;
    email: string;
    // если юзер авторизован он будет прилетать при каждом запросе (данных не фиг. гнать тока id или + имя с емайлом разницы почти нет)
    //lastModified: number; // здесь будем передавать время последнего изменения сайта (языков, меню, разделов и прочего)
}
export interface iSection {
    id: string;
    name: string;
    //code: string | null;
    path: string; // для формирования урла
    host: string | null;
    //icon: string | null;
    //is_default: boolean; // раздела по умолчанию нет - там null
}
export interface iSite {
    id: number;
    name: string;
    langs: iLanguage[];
    sections: iSection[];
    sections_hash: Hash<iSection>; // заполняем строго при получении (нужно для формирования ссылок)
    main_host: string;
    menus: iMenu[];//Hash<iMenu>;
    lastModified: number; // здесь будем передавать время последнего изменения сайта (языков, меню, разделов и прочего)
}
export interface iSession {
    // user
    user?: iUser;
    site?: iSite;
    
    //langs: iLanguage[];
    // token
    //tokenId?: string;
    //authToken?: string;

    //date: Date;
}

export interface iSeo {
    title: string;
    description: string | null;
    keywords: string | null;
}

export interface iLanguage {
    name: string;
    path: string; // для формирования урла
    is_default: boolean;
    icon: string | null;
}
export interface iMenu {
    id: string;
    name: string;
    menu_name: string;
    //code: string | null;
    //content_keys: string[];
    path: string; // для формирования урла
    //icon: string | null;
    is_all_section: boolean;
    is_current_section: boolean;
    section_id: number | null;
    //is_default: boolean;
    childs: iMenu[];
    //parents: string[]; // чтобы тип не приводить
}

export interface iFieldState {
    //value: string | string[];
    error: string[];
}

export class Console {
    public static log = process.env.NODE_ENV === 'development' ? console.log : (arg: any, ...args: any[]) => { /* empty */ };
    public static info = process.env.NODE_ENV === 'development' ? console.info : (arg: any, ...args: any[]) => { /* empty */ };
    public static error = console.error;//process.env.NODE_ENV === 'development' ? console.error : (arg: any, ...args: any[]) => { /* empty */ };
    public static debug = process.env.NODE_ENV === 'development' ? console.debug : (arg: any, ...args: any[]) => { /* empty */ };
    public static warn = process.env.NODE_ENV === 'development' ? console.warn : (arg: any, ...args: any[]) => { /* empty */ };
}
