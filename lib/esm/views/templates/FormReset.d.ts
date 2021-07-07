import * as React from 'react';
import { iContentProps } from '../../models/contentModels';
import { Hash, iSite } from '../../models/commonModels';
import { iPage } from '../../models/pageModels';
export declare class FormReset extends React.Component<iContentProps, {}> {
    site: iSite;
    page: iPage;
    settings: Hash<string>;
    formpath: string;
    constructor(props: iContentProps);
    renderButton(): React.ReactNode;
    renderWraps(): React.ReactNode;
    render(): JSX.Element;
}
