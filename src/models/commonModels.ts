export interface Hash<T> { [s: string]: T; }
export enum ContentType {
	Text = "TEXT",
	String = "STRING",
	Int = "INT",
	List = "LIST",
	Tree = "TREE",
	Img = "IMG",
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
    code: string | null;
    page: string; // для формирования урла
    host: string | null;
    icon: string | null;
    isDefault: boolean;
}
export interface iSite {
    id: number;
    name: string;
    langs: iLanguage[];
    sections: iSection[];
    menus: Hash<iMenu>;
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
    lang: string; // для формирования урла
    icon: string | null;
    isDefault: boolean;
}
export interface iMenu {
    id: string;
    name: string;
    code: string | null;
    page: string; // для формирования урла
    icon: string | null;
    isSection: boolean;
    isDefault: boolean;
    //childs: iMenu[];
    parents: string[]; // чтобы тип не приводить
}
