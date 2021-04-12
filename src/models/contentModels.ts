import { iWrapLoadableItem } from "./baseRepository";
import { ContentType, Hash, iSession } from "./commonModels";
import { iPage } from "./pageModels";

export interface iContent {
    id: string;
    name: string;
    priority: number;
    parent_id: number | null;
    path: string;
    content: string;
    //type: string;
    childs?: iContent[];
    content_keys: string[];
    settings?: Hash<string>;
    
    //template: iTemplate;
    type: ContentType | null;
    template: string | null;
    template_key: string | null;
}

export interface iContentProps {
    content: iContent[];
    settings?: Hash<string>;
    pageWraper?: iWrapLoadableItem<iPage>; // чтоб знать сам момент загрузки
    session?: iSession;
}