import * as React from 'react';
import { Hash, iSite } from '../../models/commonModels';
import { iContent, iContentProps } from '../../models/contentModels';
import { BaseComponent } from './BaseComponent';
export interface iListState {
    error: string[];
}
export declare class List extends BaseComponent<iContentProps, iListState> {
    path: string;
    site: iSite;
    constructor(props: iContentProps);
    renderHeader(): React.ReactNode;
    renderFilter(): React.ReactNode;
    renderSort(): React.ReactNode;
    renderBefore(): React.ReactNode;
    renderAfter(): React.ReactNode;
    /**
     * Делаем копию единицы контента ссылки на добавление так как нам нужно сформировать корректный урл (бэкенд не сильно разбирается как формировать урлы)
     * просто заменить settings.url не получится так как идет передача по "ссылке" и нельзя изменить объект в сторе редукса (если короче, то content is readonly)
     *
     * @param content
     */
    protected _cloneAddEditLink(content: iContent, id?: string): iContent;
    renderLinkAddEdit(childs: iContent[], action?: string, id?: string): React.ReactNode;
    renderRow(content: iContent): React.ReactNode;
    renderList(): React.ReactNode;
    getSettingsForPages(): Hash<string>;
    renderPages(): React.ReactNode;
    renderFounded(): React.ReactNode;
    renderWraps(): React.ReactNode;
    render(): React.ReactNode;
}
