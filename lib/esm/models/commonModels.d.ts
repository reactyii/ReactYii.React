export interface Hash<T> {
    [s: string]: T;
}
export declare enum ContentType {
    Link = "link",
    LinkAdd = "linkadd",
    LinkEdit = "linkedit",
    String = "string",
    Html = "html",
    Number = "number",
    List = "list",
    Tree = "tree",
    Img = "img",
    Form = "form"
}
export interface iUser {
    id: number;
    name: string | null;
    email: string;
}
export interface iSection {
    id: string;
    name: string;
    path: string;
    host: string | null;
}
export interface iSite {
    id: number;
    name: string;
    langs: iLanguage[];
    sections: iSection[];
    sections_hash: Hash<iSection>;
    main_host: string;
    menus: iMenu[];
    lastModified: number;
}
export interface iSession {
    user?: iUser;
    site?: iSite;
}
export interface iSeo {
    title: string;
    description: string | null;
    keywords: string | null;
}
export interface iLanguage {
    name: string;
    path: string;
    is_default: boolean;
    icon: string | null;
}
export interface iMenu {
    id: string;
    name: string;
    menu_name: string;
    path: string;
    is_all_section: boolean;
    is_current_section: boolean;
    section_id: number | null;
    childs: iMenu[];
}
export interface iFieldState {
    error: string[];
}
export declare class Console {
    static log: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static info: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static error: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static debug: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    static warn: {
        (...data: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
}
