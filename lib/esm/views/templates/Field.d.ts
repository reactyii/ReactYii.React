import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Hash, iFieldState, iSite } from '../../models/commonModels';
import { StoreActions } from '../../features/page/StoreActions';
import { BaseComponent } from './BaseComponent';
export declare class Field extends BaseComponent<iContentProps, iFieldState> {
    site: iSite;
    settings: Hash<string>;
    formpath: string;
    fieldname: string;
    refStoreActions: React.RefObject<StoreActions>;
    constructor(props: iContentProps);
    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>): void;
    getValue(): string | string[];
    renderErrorMessage(): React.ReactNode;
    renderField(): React.ReactNode;
    renderWraps(): React.ReactNode;
    render(): JSX.Element;
}
