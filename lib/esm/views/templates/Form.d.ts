import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Hash, iSite } from '../../models/commonModels';
import { StoreActions } from '../../features/page/StoreActions';
import { Router } from '../../features/page/Router';
import { BaseComponent } from './BaseComponent';
interface iFormState {
    error: string[];
}
export declare class Form extends BaseComponent<iContentProps, iFormState> {
    path: string;
    method: string;
    site: iSite;
    settings: Hash<string>;
    refStoreActions: React.RefObject<StoreActions>;
    refRouter: React.RefObject<Router>;
    constructor(props: iContentProps);
    handleSubmit(event: React.ChangeEvent<HTMLFormElement>): false | undefined;
    getActionUrl(filterAndSort: string): string;
    renderWraps(): React.ReactNode;
    renderForm(): React.ReactNode;
    render(): React.ReactNode;
}
export {};
