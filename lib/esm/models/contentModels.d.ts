import { iWrapLoadableItem } from "./baseRepository";
import { ContentType, Hash, iSession } from "./commonModels";
import { iPage } from "./pageModels";
export interface iContent {
    id: string;
    name: string;
    priority: number;
    parent_id: string | null;
    path: string;
    content: string;
    childs?: iContent[];
    content_keys: string[];
    settings?: Hash<string>;
    type: ContentType | null;
    template: string | null;
    template_key: string | null;
}
export interface iContentProps {
    content: iContent[];
    settings?: Hash<string>;
    pageWraper?: iWrapLoadableItem<iPage>;
    session?: iSession;
}
