import * as H from 'history';
import { match } from "react-router";
import { iContent } from './contentModels';
import { iLoadableItem, iWrapLoadableItem } from './baseRepository';
import { Hash, iLanguage, iSection, iSeo, iSession } from './commonModels';
export interface iPageProps {
    pageWraper?: iWrapLoadableItem<iPage>;
    session?: iSession;
    loadingPath: string;
}
export interface iPageLoaderProps {
    readonly match: match<{}>;
    readonly location: H.Location;
    readonly history: H.History;
}
export interface iPageStoreState {
    readonly loadingPath: string;
    readonly pageWraper?: iWrapLoadableItem<iPage>;
    readonly session?: iSession;
}
export interface iPage extends iLoadableItem {
    readonly path: string;
    lang: iLanguage | null;
    section: iSection | null;
    section_id: number | null;
    layout: string | null;
    content: iContent[];
    is_current_section: boolean;
    seo: iSeo;
    session?: iSession;
    forms: Hash<Hash<string | string[]>>;
}
